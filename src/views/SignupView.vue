<template>
  <AppLayout title="회원가입" :showTabs="false" contentWidth="narrow">
    <form class="section" @submit.prevent="onSubmit">
      <InputField label="이름" v-model="form.name" />
      <InputField label="이메일" type="email" v-model="form.email" />
      <InputField label="비밀번호" type="password" v-model="form.password" />
      <InputField label="비밀번호 확인" type="password" v-model="form.confirmPassword" />
      <PrimaryButton type="submit">가입 완료</PrimaryButton>
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
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const onSubmit = () => {
  if (!form.name || !form.email || !form.password) {
    return;
  }
  if (form.password !== form.confirmPassword) {
    return;
  }
  authStore.register({
    name: form.name,
    email: form.email,
    password: form.password,
  });
  router.push('/login');
};
</script>
