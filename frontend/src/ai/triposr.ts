const REPLICATE_API_KEY = import.meta.env.VITE_REPLICATE_API_KEY;

export async function imageToGLB(imageUrl: string): Promise<string> {
  console.log('🔨 Converting image to 3D...');
  
  const imageBlob = await fetch(imageUrl).then(r => r.blob());
  const base64Image = await blobToBase64(imageBlob);
  
  // 프록시를 통해 호출
  const response = await fetch('/api/replicate/v1/predictions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${REPLICATE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      version: "230348929547de288f73b0a1358e91196f067eb58e33592ce5b5722c2c2e4ec5",
      input: {
        image: base64Image,
        foreground_ratio: 0.85,
        mc_resolution: 256,
      }
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`TripoSR API error: ${error}`);
  }

  const prediction = await response.json();
  const glbUrl = await pollPrediction(prediction.id);
  
  console.log('✅ 3D model generated successfully');
  return glbUrl;
}

async function pollPrediction(id: string): Promise<string> {
  const maxAttempts = 60;
  
  for (let i = 0; i < maxAttempts; i++) {
    await sleep(1000);
    
    // 프록시를 통해 호출
    const response = await fetch(`/api/replicate/v1/predictions/${id}`, {
      headers: {
        'Authorization': `Bearer ${REPLICATE_API_KEY}`,
      },
    });
    
    const prediction = await response.json();
    
    if (prediction.status === 'succeeded') {
      return prediction.output;
    }
    
    if (prediction.status === 'failed') {
      throw new Error('3D generation failed');
    }
    
    console.log(`⏳ Generating... (${i + 1}s)`);
  }
  
  throw new Error('3D generation timeout');
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}