uniform vec2 u_resolution;
uniform float u_time;
uniform sampler2D u_texture;
uniform vec3 u_light;
uniform sampler2D norm;

void main() {
  vec2 uv = gl_FragCoord.xy/u_resolution.xy;
  vec4 color = texture2D(u_texture,uv);
  // vec4 color = vec4(1.);

  float dist = distance(gl_FragCoord.xy, u_light.xy);

  // vec3 NormalVector = texture2D(norm,uv).xyz;
  // vec3 LightVector = vec3(u_light.x - gl_FragCoord.x,u_light.y - gl_FragCoord.y,500.);
  // NormalVector.x -= 0.5;
  // NormalVector.y -= 0.5;
  // NormalVector = normalize(NormalVector);
  // LightVector = normalize(LightVector);

  if(u_light.z * u_resolution.x > dist) { //Check if this pixel is without the range
    // float diffuse = max(dot(NormalVector, LightVector),0.0);
    float distanceFactor = (1.0 - dist/(u_light.z * u_resolution.x));

    // gl_FragColor = color * distanceFactor * diffuse;
    gl_FragColor = color * distanceFactor;
  } else {
    gl_FragColor = vec4(0.0);
  }

}
