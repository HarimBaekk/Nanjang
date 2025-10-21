import { generateFashionImage } from './stableDiffusion';
import { imageToGLB } from './triposr';
import type { GenerationResult } from './types';

export async function generateFashion3D(prompt: string): Promise<GenerationResult> {
  console.log('🚀 Starting AI pipeline...');
  
  // Step 1: 텍스트 → 2D 이미지
  const imageUrl = await generateFashionImage(prompt);
  
  // Step 2: 2D 이미지 → 3D 모델
  const glbUrl = await imageToGLB(imageUrl);
  
  return {
    imageUrl,
    glbUrl,
    prompt,
    timestamp: new Date(),
  };
}