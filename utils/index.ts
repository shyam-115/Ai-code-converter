import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from 'eventsource-parser';

const createPrompt = (
  inputLanguage: string,
  outputLanguage: string,
  inputCode: string,
) => {
  if (inputLanguage === 'Natural Language') {
    return `You are an expert programmer. Translate the following natural language to ${outputLanguage} code. Do not include triple backticks.\n\nNatural language:\n${inputCode}\n\n${outputLanguage} code:`;
  } else if (outputLanguage === 'Natural Language') {
    return `You are an expert programmer. Explain the following ${inputLanguage} code in simple English as bullet points:\n\n${inputLanguage} code:\n${inputCode}\n\nExplanation:`;
  } else {
    return `You are an expert programmer. Translate the following ${inputLanguage} code to ${outputLanguage} code. Do not include triple backticks.\n\n${inputLanguage} code:\n${inputCode}\n\n${outputLanguage} code:`;
  }
};

export const OpenRouterStream = async (
  inputLanguage: string,
  outputLanguage: string,
  inputCode: string,
  model: string,
  key: string,
) => {
  const prompt = createPrompt(inputLanguage, outputLanguage, inputCode);

  const res = await fetch(`https://openrouter.ai/api/v1/chat/completions`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key || process.env.OPENROUTER_API_KEY}`,
    },
    method: 'POST',
    body: JSON.stringify({
      model: 'openrouter/auto',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      stream: true,
    }),
  });

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  if (res.status !== 200) {
    const statusText = res.statusText;
    const result = await res.body?.getReader().read();
    throw new Error(
      `OpenRouter API returned an error: ${
        decoder.decode(result?.value) || statusText
      }`,
    );
  }

  const stream = new ReadableStream({
    async start(controller) {
      const onParse = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === 'event') {
          const data = event.data;

          if (data === '[DONE]') {
            controller.close();
            return;
          }

          try {
            const json = JSON.parse(data);
            const text = json.choices[0].delta.content;
            if (text) {
              const queue = encoder.encode(text);
              controller.enqueue(queue);
            }
          } catch (e) {
            // Skip invalid JSON lines
          }
        }
      };

      const parser = createParser(onParse);

      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  return stream;
};
