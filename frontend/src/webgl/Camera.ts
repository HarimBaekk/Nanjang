import { mat4, vec3 } from 'gl-matrix';

export class Camera {
  public position: vec3;
  public target: vec3;
  public up: vec3;

  private distance: number = 5;
  private azimuth: number = 0;
  private elevation: number = 0;

  constructor() {
    this.position = vec3.fromValues(0, 0, 5);
    this.target = vec3.fromValues(0, 0, 0);
    this.up = vec3.fromValues(0, 1, 0);
  }

  public rotate(deltaX: number, deltaY: number): void {
    this.azimuth += deltaX * 0.01;
    this.elevation += deltaY * 0.01;

    // Clamp elevation
    this.elevation = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, this.elevation));

    this.updatePosition();
  }

  public zoom(delta: number): void {
    this.distance *= delta > 0 ? 0.9 : 1.1;
    this.distance = Math.max(2, Math.min(20, this.distance));
    this.updatePosition();
  }

  private updatePosition(): void {
    const x = this.distance * Math.cos(this.elevation) * Math.sin(this.azimuth);
    const y = this.distance * Math.sin(this.elevation);
    const z = this.distance * Math.cos(this.elevation) * Math.cos(this.azimuth);

    vec3.set(this.position, x, y, z);
  }

  public getViewMatrix(): mat4 {
    const view = mat4.create();
    mat4.lookAt(view, this.position, this.target, this.up);
    return view;
  }
}