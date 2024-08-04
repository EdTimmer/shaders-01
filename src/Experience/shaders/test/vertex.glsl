uniform vec3 u_Color;

void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}