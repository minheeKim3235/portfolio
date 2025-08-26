<template>
  <div class="home_wrap" :class="currentClass">
    <Header />
    <Intro />
    <Profile />
    <Skills />
    <Works />
    <Contact />
  </div>
</template>
<script setup>
import { useBreakpoint } from '../composables/useBreakpoint';

const { currentBreakpoint, currentClass } = useBreakpoint()
</script>
<style lang="scss" scoped></style>
