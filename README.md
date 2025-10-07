# AI Fashion 3D Generator - MVP

> 텍스트 입력 5초 만에 3D 의상 모델 생성

## 프로젝트 목적

패션 디자이너가 **텍스트만으로 즉시 3D 의상을 생성**할 수 있는 초경량 웹 플랫폼

### 핵심 가치
- **진입장벽 제거**: 쉬운 사용성
- **즉각성**: 5초 만에 3D 모델
- **비용 효율**: 월 $20 이하

---

## 해결하는 문제

| 문제 | 기존 솔루션 | 우리 |
|------|------------|------|
| 학습곡선 | 3-6개월 | **5분** |
| 생성 속도 | 30분+ | **5초** |
| 초기 비용 | $50~수백만원 | **무료** |

---

## 타겟 유저 (MVP)

1. **프리랜서 디자이너** - 클라이언트 프레젠테이션용
2. **패션 학생** - 포트폴리오 제작
3. **소규모 브랜드** - 샘플 전 아이디어 검증

---

## MVP 스코프

### 지원 카테고리
- ✅ **재킷/코트**만 (MVP)
- ❌ 셔츠, 팬츠 등은 Phase 2

### 핵심 기능 (최소)
1. 텍스트 입력 → 3D 생성
2. 360도 회전 뷰어
3. 색상 변경 (5가지)
4. GLB 다운로드

---

## 기술 스택 (단순화)

### ⚡ AI 파이프라인

```
텍스트 입력
   ↓
Gemini 2.5 Flash Image (정면 이미지 1장)
   ↓ 2초
InstantMesh (Image → 3D)
   ↓ 3초
GLB 파일
   ↓
Three.js 뷰어
```

### Frontend
- Next.js 14
- Three.js (3D 뷰어)
- Tailwind CSS

### Backend
- FastAPI (Python)
- Redis Queue (비동기 처리)

### AI Models
```python
# 1. 이미지 생성
import google.generativeai as genai
model = genai.GenerativeModel('gemini-2.5-flash-image-preview')
image = model.generate_content([
    "오버사이즈 데님 재킷, 정면, 흰배경, 제품사진"
])

# 2. 3D 변환
from instant_mesh import InstantMesh
mesh = InstantMesh.generate(image, quality='standard')
mesh.export('output.glb')
```

### Hosting
- Frontend: Vercel
- Backend: AWS Lambda
- Storage: Cloudflare R2

---

## MVP 기능 명세

### ✅ Must Have

```markdown
1. 홈페이지
   - 프롬프트 입력창
   - "생성하기" 버튼
   - 로딩 애니메이션 (5초)

2. 3D 뷰어
   - 360도 회전
   - 줌 인/아웃
   - 배경색 변경 (흰색/회색)

3. 색상 변경
   - 5가지 프리셋 (블랙/화이트/네이비/베이지/그레이)
   - 클릭 1번으로 즉시 적용

4. 다운로드
   - GLB 파일 (Blender 호환)
```

**Last Updated**: 2025-10-07  
**Version**: 0.1.0-mvp  
**Status**: 🚧 Planning Complete → Development Starting
