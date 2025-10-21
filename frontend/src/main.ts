import './style.css';
import { Renderer } from './webgl/Renderer';
import { generateFashion3D } from './ai/pipeline';

// HTML 구조 생성
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="w-full h-screen flex flex-col">
    <header class="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 shadow-lg">
      <h1 class="text-3xl font-bold">Nanjang</h1>
      <p class="text-sm text-purple-100 mt-1">AI Fashion 3D Fitting System</p>
    </header>
    
    <main class="flex-1 flex gap-4 p-4 bg-gray-50">
      <!-- 왼쪽: 입력 패널 -->
      <aside class="w-80 bg-white rounded-lg shadow-md p-6 flex flex-col gap-4">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            의상 설명
          </label>
          <input 
            type="text" 
            id="prompt-input"
            placeholder="예: black leather jacket"
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
          />
        </div>
        
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            카테고리
          </label>
          <select 
            id="category-select"
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
          >
            <option value="jacket">재킷</option>
            <option value="shirt">셔츠</option>
            <option value="tshirt">티셔츠</option>
            <option value="dress">드레스</option>
            <option value="pants">바지</option>
          </select>
        </div>
        
        <button 
          id="generate-btn"
          class="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          생성하기
        </button>
        
        <div id="status" class="text-sm text-gray-600 text-center hidden">
          <div class="animate-pulse">⏳ 생성 중...</div>
        </div>
        
        <div id="error" class="text-sm text-red-600 text-center hidden"></div>
        
        <div class="mt-4 p-4 bg-blue-50 rounded-lg text-sm text-gray-700">
          <p class="font-semibold mb-2">💡 사용 방법</p>
          <ul class="space-y-1 text-xs">
            <li>• 원하는 의상을 영어로 입력</li>
            <li>• 생성 버튼 클릭 (15초 소요)</li>
            <li>• 마우스로 3D 모델 조작</li>
          </ul>
        </div>
      </aside>
      
      <!-- 오른쪽: 3D 뷰어 -->
      <div class="flex-1 flex flex-col items-center justify-center bg-white rounded-lg shadow-md">
        <canvas id="webgl-canvas" class="border-2 border-gray-200 rounded-lg"></canvas>
        <p class="text-sm text-gray-500 mt-4">
          마우스 드래그: 회전 | 휠: 줌
        </p>
      </div>
    </main>
  </div>
`;

// Canvas & Renderer 초기화
const canvas = document.getElementById('webgl-canvas') as HTMLCanvasElement;
const renderer = new Renderer(canvas);
const camera = renderer.getCamera();

// Canvas 크기 설정
function resizeCanvas() {
  const container = canvas.parentElement!;
  const size = Math.min(container.clientWidth - 40, container.clientHeight - 60, 600);
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

// AI 생성 기능
const promptInput = document.getElementById('prompt-input') as HTMLInputElement;
const categorySelect = document.getElementById('category-select') as HTMLSelectElement;
const generateBtn = document.getElementById('generate-btn') as HTMLButtonElement;
const statusDiv = document.getElementById('status') as HTMLDivElement;
const errorDiv = document.getElementById('error') as HTMLDivElement;

generateBtn.addEventListener('click', async () => {
  const prompt = promptInput.value.trim();
  
  if (!prompt) {
    showError('의상 설명을 입력해주세요!');
    return;
  }
  
  try {
    // UI 상태 변경
    generateBtn.disabled = true;
    statusDiv.classList.remove('hidden');
    errorDiv.classList.add('hidden');
    
    // AI 생성
    const result = await generateFashion3D(`${prompt} ${categorySelect.value}`);
    
    console.log('✨ 생성 완료!', result);
    
    // TODO: 3D 모델을 렌더러에 로드
    // renderer.loadGLB(result.glbUrl);
    
    showError(''); // 에러 메시지 초기화
    alert('생성 완료! (3D 로딩 기능은 다음 단계에서 구현)');
    
  } catch (error) {
    console.error('생성 실패:', error);
    showError(error instanceof Error ? error.message : '생성 중 오류가 발생했습니다.');
  } finally {
    generateBtn.disabled = false;
    statusDiv.classList.add('hidden');
  }
});

function showError(message: string) {
  if (message) {
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
  } else {
    errorDiv.classList.add('hidden');
  }
}

console.log('✨ 난장 시작!');