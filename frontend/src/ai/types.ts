export interface GenerationResult {
  imageUrl: string;
  glbUrl?: string;
  prompt: string;
  timestamp: Date;
}

export interface SDResponse {
  image: Blob;
}

export interface TripoSRResponse {
  output: string; // GLB 파일 URL
}