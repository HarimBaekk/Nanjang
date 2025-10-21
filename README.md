# AI Fashion 3D Fitting System

> AI로 의상을 생성하고 3D 마네킹에 실시간으로 입혀보는 WebGL 기반 시스템

##  프로젝트 목표

패션 디자이너가 아이디어를 텍스트로 입력하면 즉시 3D로 시각화하여 디자인 검증 시간을 단축

##  핵심 기능

- **AI 생성 파이프라인**: 텍스트 → 2D 이미지 (Stable Diffusion) → 3D 모델 (TripoSR)
- **3D 피팅 시스템**: 생성된 의상을 마네킹에 자동 착용
- **실시간 3D 뷰어**: WebGL 2.0 기반 360도 회전, 재질 변경
- **GLB 파일 파싱**: C++로 자체 구현 후 WebAssembly로 브라우저 실행

##  기술 스택

### Graphics Engine
- **WebGL 2.0** (Raw API, 라이브러리 미사용)
- **GLSL** 커스텀 셰이더 (PBR 재질 표현)
- **C++ GLB Parser** (TinyGLTF)
- **WebAssembly** (네이티브 성능)

### AI Pipeline
- Stable Diffusion XL (텍스트→이미지)
- TripoSR (이미지→3D)

### Frontend
- TypeScript (순수, 프레임워크 미사용)
- Vite (빌드 도구)

##  성능 지표

- **생성 속도**: 텍스트 입력 후 15초 내 3D 모델 생성
- **렌더링**: 100k 폴리곤 @ 60fps
- **파싱 속도**: 10MB GLB 파일 0.3초 내 처리
- **메모리**: 평균 200MB 사용

##  기술적 하이라이트

### 1. 3D 파일 포맷 파싱
- C++로 GLB 바이너리 구조 직접 파싱
- Vertex, Normal, TexCoord, Index 데이터 추출
- Emscripten으로 WASM 컴파일하여 브라우저에서 실행

### 2. Cloth Fitting 알고리즘
- Vertex Snapping: 의상 정점을 마네킹 표면에 자동 정렬
- Collision Detection: 메쉬 간 충돌 방지
- Normal 기반 오프셋으로 자연스러운 착용감 구현

### 3. PBR 셰이더
- Metallic/Roughness 워크플로우
- 의상별 재질 프리셋 (Cotton, Silk, Leather, Denim)
- HDR 환경맵 기반 라이팅

### 4. GPU 최적화
- Frustum Culling (뷰포트 밖 제거)
- LOD (거리별 디테일 조절)
- Instanced Rendering (다중 의상 동시 렌더링)

##  프로젝트 구조
```
project/
├── frontend/          # TypeScript + WebGL
│   └── src/
│       ├── webgl/    # 렌더러, 셰이더
│       ├── ai/       # API 호출
│       └── wasm/     # WASM 로더
│
└── parser/           # C++ GLB 파서
    └── src/
        └── glb_parser.cpp
```

##  실행 방법
```bash
# 프론트엔드
cd frontend
npm install
npm run dev

# C++ 파서 빌드 (최초 1회)
cd parser
./build.sh
```

## 데모


##  개발 기간

2주 (2025.10.21 - 2025.11.03)

##  개발자

harim
