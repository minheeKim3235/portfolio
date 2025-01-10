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
const breakpoints = {
  mobile: '(max-width: 480px)',
  tablet: '(min-width: 481px) and (max-width: 768px)',
  desktop: '(min-width: 769px) and (max-width: 1024px)',
  largetDesktop: '(min-width: 1025px)'
}

const currentBreakpoint = ref('');

const updateBreakpoint = () => {
  if (window.matchMedia(breakpoints.mobile).matches) {
    currentBreakpoint.value = 'mobile';
  } else if (window.matchMedia(breakpoints.tablet).matches) {
    currentBreakpoint.value = 'tablet';
  } else if (window.matchMedia(breakpoints.desktop).matches) {
    currentBreakpoint.value = 'desktop';
  } else {
    currentBreakpoint.value = 'largetDesktop';
  }
}

const currentClass = computed(() => {
  return {
    'class-mobile': currentBreakpoint.value === 'mobile',
    'class-tablet': currentBreakpoint.value === 'tablet',
    'class-desktop': currentBreakpoint.value === 'desktop',
    'class-large-desktop': currentBreakpoint.value === 'largetDesktop',
  }
})

onMounted(() => {
  updateBreakpoint();
  window.addEventListener('resize', updateBreakpoint);

  const script = document.createElement('script');
  script.setAttribute('data-cfasync', 'false');
  script.setAttribute('type', 'text/javascript');
  script.src = 'form-submission-handler.js';
  document.body.appendChild(script); // body 태그 하단에 추가
})
onUnmounted(() => {
  window.removeEventListener('resize', updateBreakpoint);
})
</script>
<style lang="scss" scoped></style>
