const HF_API_KEY = import.meta.env.VITE_HF_API_KEY;
const SD_MODEL = "stabilityai/stable-diffusion-xl-base-1.0";

export async function generateFashionImage(prompt: string): Promise<string> {
  const optimizedPrompt = optimizePrompt(prompt);
  
  console.log('🎨 Generating image with prompt:', optimizedPrompt);
  
  const response = await fetch(
    `https://api-inference.huggingface.co/models/${SD_MODEL}`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: optimizedPrompt,
        parameters: {
          negative_prompt: "deformed, blurry, bad quality, watermark, text, low resolution",
          num_inference_steps: 30,
          guidance_scale: 7.5,
        }
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Stable Diffusion API error: ${error}`);
  }

  const blob = await response.blob();
  const imageUrl = URL.createObjectURL(blob);
  
  console.log('✅ Image generated successfully');
  return imageUrl;
}

function optimizePrompt(userPrompt: string): string {
  return `${userPrompt}, professional fashion photography, product photo, 
          white background, studio lighting, high quality, detailed, 8k, 
          front view, centered composition`;
}