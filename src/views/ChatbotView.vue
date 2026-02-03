<template>
  <AppLayout title="챗봇" :showTabs="true" contentWidth="narrow">
    <div class="chat">
      <div class="messages">
        <div
          v-for="message in messages"
          :key="message.id"
          class="bubble"
          :class="message.role"
        >
          {{ message.text }}
        </div>
      </div>
      <form class="input-row" @submit.prevent="send">
        <input v-model="text" class="input" type="text" placeholder="메시지 입력" />
        <button class="send" type="submit">전송</button>
      </form>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import AppLayout from '../layouts/AppLayout.vue';
import { useChatStore } from '../stores/chatStore';

const chatStore = useChatStore();
const text = ref('');

const messages = computed(() => chatStore.messages);

const send = () => {
  if (!text.value.trim()) {
    return;
  }
  chatStore.sendMessage(text.value.trim());
  text.value = '';
};
</script>

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: calc(100vh - 160px);
}

.messages {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-right: 4px;
}

.bubble {
  max-width: 75%;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--surface);
}

.bubble.user {
  align-self: flex-end;
  background: var(--primary);
  color: #fff;
  border-color: var(--primary);
}

.bubble.bot {
  align-self: flex-start;
}

.input-row {
  display: flex;
  gap: 8px;
}

.input {
  flex: 1;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid var(--border);
}

.send {
  padding: 10px 16px;
  border-radius: 12px;
  border: none;
  background: var(--primary);
  color: #fff;
  font-weight: 600;
}
</style>
