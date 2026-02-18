import { Provider } from '@/types/types';
import { FC } from 'react';

interface Props {
  provider: Provider;
  onChange: (provider: Provider) => void;
}

export const ProviderSelect: FC<Props> = ({ provider, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as Provider);
  };

  return (
    <select
      className="h-[40px] w-[140px] rounded-md bg-[#1F2937] px-4 py-2 text-neutral-200"
      value={provider}
      onChange={handleChange}
    >
      <option value="openai">OpenAI</option>
      <option value="gemini">Gemini</option>
      <option value="huggingface">Hugging Face</option>
      <option value="openrouter">OpenRouter</option>
    </select>
  );
};
