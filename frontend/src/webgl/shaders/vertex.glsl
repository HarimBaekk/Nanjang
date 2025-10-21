#version 300 es

in vec3 aPosition;
in vec3 aNormal;

uniform mat4 uModelViewProjection;
uniform mat4 uModel;

out vec3 vNormal;
out vec3 vFragPos;

void main() {
    vFragPos = vec3(uModel * vec4(aPosition, 1.0));
    vNormal = mat3(transpose(inverse(uModel))) * aNormal;
    
    gl_Position = uModelViewProjection * vec4(aPosition, 1.0);
}