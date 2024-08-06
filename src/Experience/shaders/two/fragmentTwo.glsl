precision mediump float;

uniform vec2 u_Mouse;
uniform float u_Time;

varying vec2 vUv;

void main() {
    vec2 mouseUV = u_Mouse;
    vec3 color = vec3(mouseUV.x, mouseUV.y, vUv.y);
    
    gl_FragColor = vec4(color, 1.0);
}
