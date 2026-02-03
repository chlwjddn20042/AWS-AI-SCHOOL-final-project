<template>
  <div class="page">
    <h2>회원가입</h2>
    <form class="section" @submit.prevent="onSubmit">
      <InputField label="이름" v-model="form.name" />
      <InputField label="생년월일" type="date" v-model="form.birthDate" />
      <InputField label="이메일" type="email" v-model="form.email" />
      <InputField label="비밀번호" type="password" v-model="form.password" />
      <div class="section">
        <span class="muted">성별</span>
        <SegmentedControl v-model="form.gender" :options="['남', '여']" />
      </div>
      <PrimaryButton type="submit">가입 완료</PrimaryButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import InputField from '../components/InputField.vue';
import PrimaryButton from '../components/PrimaryButton.vue';
import SegmentedControl from '../components/SegmentedControl.vue';

const router = useRouter();
const authStore = useAuthStore();

const form = reactive({
  name: '',
  birthDate: '',
  email: '',
  password: '',
  gender: '남',
});

const onSubmit = () => {
  authStore.register({
    name: form.name,
    birthDate: form.birthDate,
    email: form.email,
    password: form.password,
    gender: form.gender as '남' | '여',
  });
  router.push('/login');
};
</script>
