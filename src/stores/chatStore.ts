import { defineStore } from 'pinia';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { chatService } from '../services/chatService';

export type ChatMessage = {
  id: string;
  role: 'user' | 'bot';
  text: string;
};

type ChatState = {
  messages: ChatMessage[];
};

export const useChatStore = defineStore('chat', {
  state: (): ChatState => ({
    messages: loadFromStorage('chat.messages', []),
  }),
  actions: {
    sendMessage(text: string) {
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        text,
      };
      this.messages = [...this.messages, userMessage];
      const botMessage = chatService.reply(text);
      this.messages = [...this.messages, botMessage];
      saveToStorage('chat.messages', this.messages);
    },
  },
});
