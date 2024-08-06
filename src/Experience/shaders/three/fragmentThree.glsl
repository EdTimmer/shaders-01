precision mediump float;

varying float v_PositionZ;

void main() {
    vec3 color = vec3(v_PositionZ * 0.5, 0.2, 0.8);
    
    gl_FragColor = vec4(color, 1.0);
}
