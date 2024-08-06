precision mediump float;

varying float v_Random;

void main() {
    vec3 color = vec3(1.0, v_Random, 1.0);
    
    gl_FragColor = vec4(color, 1.0);
}
