export type OpenRouterModel = 'openrouter/auto';
export type Model = OpenRouterModel;
export type Provider = 'openrouter';

export interface TranslateBody {
  inputLanguage: string;
  outputLanguage: string;
  inputCode: string;
  model: Model;
  apiKey: string;
  provider: Provider;
}

export interface TranslateResponse {
  code: string;
}
