uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


void main() {

  vec3 newpos = position;

  // to get position of geometry + camera coordinates
  // gl_Position = projectionMatrix * modelViewMatrix * vec4( newpos, 1.0 );
  gl_Position = vec4( newpos, 1.0 );
}
