import type { ChatMessage } from '../stores/chatStore';

export const chatService = {
  reply(text: string): ChatMessage {
    return {
      id: `bot-${Date.now()}`,
      role: 'bot',
      text,
    };
  },
};
