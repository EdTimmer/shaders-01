uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform vec2 u_Frequency;
uniform float u_Time;

attribute vec3 position;
varying float v_PositionZ;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.z += sin(modelPosition.x * u_Frequency.x * 0.05 - (u_Time * 0.001)) * 2.2;
    modelPosition.z += sin(modelPosition.y * u_Frequency.y * 0.05 - (u_Time * 0.001)) * 2.2;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    v_PositionZ = modelPosition.z / 3.0;
}