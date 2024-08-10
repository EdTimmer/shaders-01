uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform float u_Time;
uniform vec2 u_Mouse;

attribute vec3 position;
attribute float a_Random;

varying float v_Random;

void main() {
    // Transform the vertex position to world space
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    
    // Calculate the distance from the mouse position in screen space
    vec4 viewPosition = viewMatrix * worldPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    
    // Convert to normalized device coordinates (NDC)
    vec3 ndcPosition = projectedPosition.xyz / projectedPosition.w;
    
    // Convert NDC to screen space
    vec2 screenPosition = ndcPosition.xy * 0.5 + 0.5;
    
    // Calculate the distance from the mouse position
    float distance = distance(u_Mouse, screenPosition);

    // Adjust the z position based on the distance to the mouse
    if (distance <= 0.1) { // Adjust the threshold as needed
        worldPosition.z -= 4.0;
    }
    
    // Apply the random offset to z position
    worldPosition.z += a_Random * 7.0;

    // Transform the position back to clip space
    viewPosition = viewMatrix * worldPosition;
    projectedPosition = projectionMatrix * viewPosition;

    // Set the final position
    gl_Position = projectedPosition;

    v_Random = a_Random;
}