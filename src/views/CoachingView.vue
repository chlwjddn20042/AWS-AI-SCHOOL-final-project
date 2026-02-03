<template>
  <AppLayout :showTabs="true">
    <template #header>
      <AppHeader title="행동 코칭" :showBack="true" />
    </template>

    <BaseCard>
      <h3>오늘의 코칭</h3>
      <p class="muted">작은 루틴으로 안정감을 만들어보세요.</p>
    </BaseCard>
    <ListItem>1분 심호흡</ListItem>
    <ListItem>물 1컵</ListItem>
    <ListItem>긍정 문장</ListItem>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '../layouts/AppLayout.vue';
import AppHeader from '../components/AppHeader.vue';
import BaseCard from '../components/BaseCard.vue';
import ListItem from '../components/ListItem.vue';
</script>
