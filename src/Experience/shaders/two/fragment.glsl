precision mediump float;

uniform vec2 u_Mouse;
uniform float u_Time;

varying vec2 vUv;

void main() {
    
    vec2 mouseUV = u_Mouse;
    // vec2 mouseUV = (u_Mouse + 1.0) * 0.5; // Convert mouse coordinates from -1 to 1 to 0 to 1
    // vec2 mouseUV.x = mouseUV.x / 100.0;
    // vec2 mouseUV.y = mouseUV.y / 100.0;

    // vec3 color = vec3(vUv.x, vUv.y, mouseUV.y);
    // vec3 color = vec3(mouseUV.x, mouseUV.y, 1.0);
    // vec3 color = vec3(abs(sin(u_Time * 0.0001)), abs(sin(u_Time * 0.0003)), abs(sin(u_Time * 0.0005)));
    vec3 color = vec3(mouseUV.x, mouseUV.y, vUv.y);
    gl_FragColor = vec4(color, 1.0);
}