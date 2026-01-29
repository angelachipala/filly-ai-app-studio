
export enum AppView {
  DASHBOARD = 'dashboard',
  IMAGE_STUDIO = 'image_studio',
  VIDEO_STUDIO = 'video_studio',
  UPLOAD_CENTER = 'upload_center',
  DIRECTOR = 'director',
  SOCIAL = 'social',
  PROFILE = 'profile',
  SECTOR_DETAIL = 'sector_detail',
  PROMPT_EXPLORER = 'prompt_explorer'
}

// Added VideoType enum to resolve the import error in geminiService.ts
export enum VideoType {
  CINEMATIC = 'Cinematic',
  SOCIAL_MEDIA = 'Social Media',
  CORPORATE = 'Corporate',
  EDUCATIONAL = 'Educational',
  PRODUCT_DEMO = 'Product Demo',
  FAST_ACTION = 'Fast Action',
  SMOOTH_ANIMATION = 'Smooth Animation',
  VIRAL_LOOP = 'Viral Loop'
}

export enum ImageStyle {
  // General Styles
  REALISTIC = 'Realistic',
  CINEMATIC = 'Cinematic',
  ANIME = 'Anime',
  ARCHITECTURE = 'Architecture',
  CARTOON = 'Cartoon',
  THREE_D_RENDER = '3D Render',
  VECTOR = 'Vector',
  WATERCOLOR = 'Watercolor',
  SKETCH = 'Sketch / Line Art',
  OIL_PAINTING = 'Oil Painting',
  ABSTRACT = 'Abstract',
  SURREAL = 'Surreal',
  FASHION = 'Fashion',
  PHOTOGRAPHY = 'Photography',
  PORTRAIT = 'Portrait',
  AFRO_ANGOLA = 'Afro/Angola',
  AFROFUTURIST = 'Afrofuturist',

  // Corporate & Professional
  CORPORATE = 'Corporate',
  BUSINESS = 'Business',
  MINIMALIST = 'Minimalist',
  MODERN = 'Modern',
  PRODUCT_POSTER = 'Product / Poster',
  LOGO = 'Logo',
  INFOGRAPHIC = 'Infographic',
  CONCEPT_ART = 'Concept art',

  // Genre & Themes
  FANTASY = 'Fantasy',
  SCI_FI = 'Sci-Fi',
  CYBERPUNK = 'Cyberpunk',
  RETRO_VINTAGE = 'Retro / Vintage',
  GRUNGE = 'Grunge',

  // Mood & Tone
  VIBRANT = 'Vibrant / Colorful',
  DARK_MOODY = 'Dark / Moody',
  ELEGANT = 'Elegant',

  // Language
  ARABIC = 'Arabic',
  FRENCH = 'French',
  ENGLISH = 'English',
  SPANISH = 'Spanish',
  PORTUGUESE = 'Portuguese',

  // Optional add-ons
  GLITCH = 'Glitch',
  NEON = 'Neon',
  FLAT_DESIGN = 'Flat Design'
}

export interface PromptLibraryItem {
  id: string;
  category: string;
  title: string;
  prompt: string;
  previewUrl: string;
}

export interface SectorData {
  id: string;
  title: string;
  subtitle: string;
  isPremium: boolean;
  options: {
    name: string;
    icon: string;
    preview: string;
  }[];
  ctaLabel: string;
  targetView: AppView;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  plan: 'Free' | 'Premium';
  credits: {
    total: number;
    used: number;
  };
  preferences: {
    defaultStyle: ImageStyle;
    aiLanguage: string;
    captionTone: 'Professional' | 'Informal' | 'Sales';
    preferredPlatform: 'Instagram' | 'TikTok' | 'YouTube' | 'Facebook';
  };
}

export interface FileAnalysis {
  fileType: 'image' | 'video' | 'document';
  summary: string;
  suggestions: string[];
}

export interface Scene {
  id: string;
  sceneDescription: string;
  visualPrompt: string;
  duration: string;
  cameraAngle: string;
  previewUrl?: string;
}

export interface StoryboardData {
  title: string;
  script: string;
  scenes: Scene[];
}

export interface DirectorAdvice {
  suggestion: string;
  marketingTips: string[];
  idealFormat: string;
}
