precision mediump float;

varying float v_Random;
uniform vec2 u_Mouse;

void main() {
    // vec2 mouseUV = u_Mouse;
    vec3 color = vec3(0.0, v_Random, 1.0);
    
    gl_FragColor = vec4(color, 1.0);
}
