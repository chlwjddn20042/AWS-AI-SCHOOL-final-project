<template>
  <AppLayout title="로그인" :showTabs="false" contentWidth="narrow">
    <form class="section" @submit.prevent="onSubmit">
      <InputField label="이메일" type="email" v-model="form.email" />
      <InputField label="비밀번호" type="password" v-model="form.password" />
      <PrimaryButton type="submit">로그인</PrimaryButton>
    </form>
  </AppLayout>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import AppLayout from '../layouts/AppLayout.vue';
import InputField from '../components/InputField.vue';
import PrimaryButton from '../components/PrimaryButton.vue';

const router = useRouter();
const authStore = useAuthStore();

const form = reactive({
  email: '',
  password: '',
});

const onSubmit = () => {
  authStore.login(form.email, form.password);
  router.push('/home');
};
</script>
