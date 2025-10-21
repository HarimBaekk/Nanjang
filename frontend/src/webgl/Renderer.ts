import { mat4, vec3 } from 'gl-matrix';
import { Camera } from './Camera';
import { loadShaderProgram } from './utils/shader';
import vertexShaderSource from './shaders/vertex.glsl?raw';
import fragmentShaderSource from './shaders/fragment.glsl?raw';

export class Renderer {
  private gl: WebGL2RenderingContext;
  private program: WebGLProgram | null = null;
  private camera: Camera;
  
  private vao: WebGLVertexArrayObject | null = null;
  private vertexBuffer: WebGLBuffer | null = null;
  private normalBuffer: WebGLBuffer | null = null;
  private indexBuffer: WebGLBuffer | null = null;
  
  private indexCount: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    const gl = canvas.getContext('webgl2');
    if (!gl) {
      throw new Error('WebGL2 not supported');
    }
    this.gl = gl;
    this.camera = new Camera();
    
    this.init();
  }

  private init(): void {
    const gl = this.gl;
    
    // 셰이더 프로그램 생성
    this.program = loadShaderProgram(gl, vertexShaderSource, fragmentShaderSource);
    if (!this.program) {
      throw new Error('Failed to create shader program');
    }

    // 큐브 데이터 생성
    this.createCube();
    
    // WebGL 설정
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.1, 0.1, 0.1, 1.0);
  }

  private createCube(): void {
    const gl = this.gl;

    // 큐브 정점 (위치)
    const vertices = new Float32Array([
      // Front
      -1, -1,  1,   1, -1,  1,   1,  1,  1,  -1,  1,  1,
      // Back
      -1, -1, -1,  -1,  1, -1,   1,  1, -1,   1, -1, -1,
      // Top
      -1,  1, -1,  -1,  1,  1,   1,  1,  1,   1,  1, -1,
      // Bottom
      -1, -1, -1,   1, -1, -1,   1, -1,  1,  -1, -1,  1,
      // Right
       1, -1, -1,   1,  1, -1,   1,  1,  1,   1, -1,  1,
      // Left
      -1, -1, -1,  -1, -1,  1,  -1,  1,  1,  -1,  1, -1,
    ]);

    // 큐브 법선 (각 면의 방향)
    const normals = new Float32Array([
      // Front
      0, 0, 1,   0, 0, 1,   0, 0, 1,   0, 0, 1,
      // Back
      0, 0, -1,  0, 0, -1,  0, 0, -1,  0, 0, -1,
      // Top
      0, 1, 0,   0, 1, 0,   0, 1, 0,   0, 1, 0,
      // Bottom
      0, -1, 0,  0, -1, 0,  0, -1, 0,  0, -1, 0,
      // Right
      1, 0, 0,   1, 0, 0,   1, 0, 0,   1, 0, 0,
      // Left
      -1, 0, 0,  -1, 0, 0,  -1, 0, 0,  -1, 0, 0,
    ]);

    // 인덱스 (삼각형 구성)
    const indices = new Uint16Array([
      0, 1, 2,   0, 2, 3,    // Front
      4, 5, 6,   4, 6, 7,    // Back
      8, 9, 10,  8, 10, 11,  // Top
      12, 13, 14, 12, 14, 15, // Bottom
      16, 17, 18, 16, 18, 19, // Right
      20, 21, 22, 20, 22, 23  // Left
    ]);

    this.indexCount = indices.length;

    // VAO 생성
    this.vao = gl.createVertexArray();
    gl.bindVertexArray(this.vao);

    // 정점 버퍼
    this.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    
    const positionLoc = gl.getAttribLocation(this.program!, 'aPosition');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);

    // 법선 버퍼
    this.normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);
    
    const normalLoc = gl.getAttribLocation(this.program!, 'aNormal');
    gl.enableVertexAttribArray(normalLoc);
    gl.vertexAttribPointer(normalLoc, 3, gl.FLOAT, false, 0, 0);

    // 인덱스 버퍼
    this.indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    gl.bindVertexArray(null);
  }

  public render(): void {
    const gl = this.gl;
    
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    if (!this.program || !this.vao) return;

    gl.useProgram(this.program);
    gl.bindVertexArray(this.vao);

    // 행렬 계산
    const model = mat4.create();
    mat4.rotateY(model, model, Date.now() * 0.001); // 자동 회전
    
    const view = this.camera.getViewMatrix();
    
    const projection = mat4.create();
    mat4.perspective(projection, Math.PI / 4, gl.canvas.width / gl.canvas.height, 0.1, 100);
    
    const mvp = mat4.create();
    mat4.multiply(mvp, projection, view);
    mat4.multiply(mvp, mvp, model);

    // 유니폼 설정
    const mvpLoc = gl.getUniformLocation(this.program, 'uModelViewProjection');
    gl.uniformMatrix4fv(mvpLoc, false, mvp);
    
    const modelLoc = gl.getUniformLocation(this.program, 'uModel');
    gl.uniformMatrix4fv(modelLoc, false, model);

    const lightPosLoc = gl.getUniformLocation(this.program, 'uLightPos');
    gl.uniform3f(lightPosLoc, 5, 5, 5);
    
    const lightColorLoc = gl.getUniformLocation(this.program, 'uLightColor');
    gl.uniform3f(lightColorLoc, 1, 1, 1);
    
    const objectColorLoc = gl.getUniformLocation(this.program, 'uObjectColor');
    gl.uniform3f(objectColorLoc, 0.5, 0.7, 1.0);
    
    const viewPosLoc = gl.getUniformLocation(this.program, 'uViewPos');
    gl.uniform3fv(viewPosLoc, this.camera.position);

    // 그리기
    gl.drawElements(gl.TRIANGLES, this.indexCount, gl.UNSIGNED_SHORT, 0);
  }

  public getCamera(): Camera {
    return this.camera;
  }

  public resize(width: number, height: number): void {
    this.gl.canvas.width = width;
    this.gl.canvas.height = height;
    this.gl.viewport(0, 0, width, height);
  }
}