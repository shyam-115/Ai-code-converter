import { Model, Provider } from '@/types/types';
import { FC } from 'react';

interface Props {
  model: Model;
  provider: Provider;
  onChange: (model: Model) => void;
}

export const ModelSelect: FC<Props> = ({ model, provider, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as Model);
  };

  const openaiModels = [
    { value: 'gpt-3.5-turbo', label: 'GPT-3.5' },
    { value: 'gpt-4', label: 'GPT-4' },
    { value: 'gpt-5', label: 'GPT-5' },
    { value: 'gpt-5.2', label: 'GPT-5.2' },
  ];

  const geminiModels = [
    { value: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash' },
    { value: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro' },
    { value: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash' },
  ];

  const huggingfaceModels = [
    { value: 'mistralai/Mistral-7B-Instruct-v0.1', label: 'Mistral 7B Instruct' },
    { value: 'meta-llama/Llama-2-70b-chat-hf', label: 'Llama 2 70B Chat' },
    { value: 'Intel/neural-chat-7b-v3-2', label: 'Neural Chat 7B' },
    { value: 'codellama/CodeLlama-34b-Instruct-hf', label: 'CodeLlama 34B Instruct' },
  ];

  const openrouterModels = [
    { value: 'openai/gpt-4', label: 'GPT-4' },
    { value: 'openai/gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
    { value: 'anthropic/claude-3-opus', label: 'Claude 3 Opus' },
    { value: 'anthropic/claude-3-sonnet', label: 'Claude 3 Sonnet' },
    { value: 'anthropic/claude-3-haiku', label: 'Claude 3 Haiku' },
  ];

  const models = provider === 'openai' ? openaiModels : provider === 'gemini' ? geminiModels : provider === 'openrouter' ? openrouterModels : huggingfaceModels;

  return (
    <select
      className="h-[40px] w-[140px] rounded-md bg-[#1F2937] px-4 py-2 text-neutral-200"
      value={model}
      onChange={handleChange}
    >
      {models.map((m) => (
        <option key={m.value} value={m.value}>
          {m.label}
        </option>
      ))}
    </select>
  );
};
