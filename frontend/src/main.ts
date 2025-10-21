import './style.css';
import { Renderer } from './webgl/Renderer';

// HTML 구조 생성
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="w-full h-screen flex flex-col">
    <header class="bg-gray-900 text-white p-4">
      <h1 class="text-2xl font-bold">Nanjang</h1>
      <p class="text-sm text-gray-400">AI Fashion 3D Fitting System</p>
    </header>
    
    <main class="flex-1 flex items-center justify-center bg-gray-100">
      <canvas id="webgl-canvas" class="border-4 border-gray-300 shadow-lg"></canvas>
    </main>
    
    <footer class="bg-gray-900 text-white p-2 text-center text-sm">
      <p>마우스 드래그: 회전 | 휠: 줌</p>
    </footer>
  </div>
`;

// Canvas 초기화
const canvas = document.getElementById('webgl-canvas') as HTMLCanvasElement;
const renderer = new Renderer(canvas);
const camera = renderer.getCamera();

// Canvas 크기 설정
function resizeCanvas() {
  const container = canvas.parentElement!;
  const size = Math.min(container.clientWidth, container.clientHeight) * 0.8;
  renderer.resize(size, size);
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// 마우스 컨트롤
let isDragging = false;

canvas.addEventListener('mousedown', () => {
  isDragging = true;
});

canvas.addEventListener('mouseup', () => {
  isDragging = false;
});

canvas.addEventListener('mouseleave', () => {
  isDragging = false;
});

canvas.addEventListener('mousemove', (e) => {
  if (isDragging) {
    camera.rotate(e.movementX, e.movementY);
  }
});

canvas.addEventListener('wheel', (e) => {
  e.preventDefault();
  camera.zoom(e.deltaY);
});

// 렌더링 루프
function animate() {
  renderer.render();
  requestAnimationFrame(animate);
}
animate();

console.log('✨ 난장 WebGL 렌더러 시작!');