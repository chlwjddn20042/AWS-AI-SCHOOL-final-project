<template>
  <div class="page">
    <h2>로그인</h2>
    <form class="section" @submit.prevent="onSubmit">
      <InputField label="이메일" type="email" v-model="form.email" />
      <InputField label="비밀번호" type="password" v-model="form.password" />
      <PrimaryButton type="submit">입장</PrimaryButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
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
