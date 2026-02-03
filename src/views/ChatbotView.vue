<template>
  <AppLayout title="챗봇" :showTabs="true">
    <BaseCard class="chat">
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
        <input v-model="text" class="input" placeholder="메시지" />
        <button type="submit" class="send">전송</button>
      </form>
    </BaseCard>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import AppLayout from '../layouts/AppLayout.vue';
import BaseCard from '../components/BaseCard.vue';
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
}

.messages {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 360px;
  overflow-y: auto;
}

.bubble {
  max-width: 70%;
  padding: 8px 12px;
  border-radius: 14px;
  background: #fff;
  border: 1px solid var(--line);
}

.bubble.user {
  align-self: flex-end;
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}

.input-row {
  display: flex;
  gap: 8px;
}

.input {
  flex: 1;
  border-radius: 999px;
  border: 1px solid var(--line);
  padding: 8px 12px;
}

.send {
  border: none;
  background: var(--line);
  color: #fff;
  border-radius: 999px;
  padding: 8px 12px;
}
</style>
