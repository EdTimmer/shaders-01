precision mediump float;

uniform vec2 u_Mouse;
uniform float u_Time;

varying vec2 vUv;

void main() {
    vec2 mouseUV = u_Mouse;   
    vec3 color = vec3(abs(sin(u_Time * 0.0001)), abs(sin(u_Time * 0.0003)), abs(sin(u_Time * 0.0005)));
    
    gl_FragColor = vec4(color, 1.0);
}