precision mediump float;

varying float v_PositionZ;

void main() {
    vec3 color = vec3(0.7, v_PositionZ, 0.7);
    
    gl_FragColor = vec4(color, 1.0);
}
