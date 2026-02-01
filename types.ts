
export enum Tone {
  Professional = 'Professional',
  Funny = 'Funny',
  Minimalist = 'Minimalist',
  Inspirational = 'Inspirational',
  Quirky = 'Quirky',
  Bold = 'Bold',
  Flirty = 'Flirty',
  Sarcastic = 'Sarcastic',
  GenZ = 'Gen Z / Brainrot',
  OldMoney = 'Old Money'
}

export interface BioFormData {
  name: string;
  description: string;
  region: string;
  tone: Tone;
  keywords: string;
  cta: string;
  includeEmojis: boolean;
}

export interface GeneratedBio {
  content: string;
  style: string;
}

export interface GenerationResult {
  bios: GeneratedBio[];
  error?: string;
}

export interface AnalyzerFormData {
  name: string;
  age: string;
  occupation: string;
  traits: string;
  hobbies: string;
  socialMediaStyle: string;
  worstHabit: string;
}

// Configuration for Generic Tools
export interface ToolField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select';
  placeholder?: string;
  options?: string[];
  required?: boolean;
}

export interface ToolConfig {
  id: string;
  title: string;
  description: string;
  icon: any; // Lucide icon component
  fields: ToolField[];
  promptTemplate: (data: any) => string;
  buttonText: string;
  useSearch?: boolean; // Enable Google Search grounding
  outputFormat?: 'text' | 'list'; // 'text' is default, 'list' expects JSON array string
}
