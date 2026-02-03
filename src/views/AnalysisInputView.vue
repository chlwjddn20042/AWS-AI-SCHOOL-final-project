<template>
  <AppLayout title="성향 입력" :showTabs="true">
    <form class="section" @submit.prevent="goSurvey">
      <h3>기본 정보</h3>
      <InputField label="이름" v-model="form.name" :disabled="true" />
      <InputField label="나이" v-model="form.age" :disabled="true" />
      <div class="section">
        <span class="muted">성별</span>
        <SegmentedControl v-model="form.gender" :options="['남', '여']" />
      </div>
      <InputField label="취미" v-model="form.hobby" />
      <div class="grid two">
        <InputField label="수면 시작" type="time" v-model="form.sleepStart" />
        <InputField label="수면 끝" type="time" v-model="form.sleepEnd" />
      </div>
      <div class="section">
        <span class="muted">운동 여부</span>
        <SegmentedControl v-model="form.exercise" :options="['예', '아니오']" />
      </div>

      <h3>생활 습관</h3>
      <InputField label="반려동물" v-model="form.pet" />
      <InputField label="MBTI" v-model="form.mbti" />
      <InputField label="일주일 외출 횟수" v-model="form.outingCount" />
      <div class="section">
        <span class="muted">만족</span>
        <SegmentedControl v-model="form.satisfaction" :options="['맞음', '틀림']" />
      </div>
      <div class="section">
        <span class="muted">표현 앱</span>
        <div class="tag-list">
          <label v-for="app in apps" :key="app" class="tag">
            <input
              type="checkbox"
              :value="app"
              v-model="form.expressionApps"
            />
            {{ app }}
          </label>
        </div>
      </div>
      <PrimaryButton type="submit">다음</PrimaryButton>
    </form>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed, reactive, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import InputField from '../components/InputField.vue';
import PrimaryButton from '../components/PrimaryButton.vue';
import SegmentedControl from '../components/SegmentedControl.vue';
import { useAnalysisStore } from '../stores/analysisStore';
import { useAuthStore } from '../stores/authStore';

const router = useRouter();
const analysisStore = useAnalysisStore();
const authStore = useAuthStore();

const apps = ['메모', '사진', '음악', '영상'];

const form = reactive({ ...analysisStore.inputForm });

const age = computed(() => {
  if (!authStore.user.birthDate) {
    return '';
  }
  const birthYear = Number(authStore.user.birthDate.split('-')[0]);
  if (!birthYear) {
    return '';
  }
  return String(new Date().getFullYear() - birthYear + 1);
});

watchEffect(() => {
  form.name = authStore.user.name;
  form.age = age.value;
  analysisStore.updateForm(form);
});

const goSurvey = () => {
  analysisStore.updateForm(form);
  router.push('/analysis/survey');
};
</script>
