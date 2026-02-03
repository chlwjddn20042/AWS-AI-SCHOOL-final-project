<template>
  <AppLayout title="기본 정보" :showTabs="false" contentWidth="narrow">
    <form class="section" @submit.prevent="goNext">
      <InputField label="이름" v-model="form.name" />
      <InputField label="나이" v-model="form.age" />
      <InputField label="직업" v-model="form.occupation" />
      <PrimaryButton type="submit">다음</PrimaryButton>
    </form>
  </AppLayout>
</template>

<script setup lang="ts">
import { reactive, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import InputField from '../components/InputField.vue';
import PrimaryButton from '../components/PrimaryButton.vue';
import { useAnalysisStore } from '../stores/analysisStore';
import { useAuthStore } from '../stores/authStore';

const router = useRouter();
const analysisStore = useAnalysisStore();
const authStore = useAuthStore();

const form = reactive({ ...analysisStore.input });

watchEffect(() => {
  if (!form.name) {
    form.name = authStore.user.name;
  }
});

const goNext = () => {
  analysisStore.updateInput(form);
  router.push('/analysis/youtube');
};
</script>
