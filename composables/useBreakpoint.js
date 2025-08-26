import { ref, computed, onMounted, onUnmounted } from "vue";

export function useBreakpoint() {
  const breakpoints = {
    mobile: '(max-width: 480px)',
    tablet: '(min-width: 481px) and (max-width: 768px)',
    desktop: '(min-width: 769px) and (max-width: 1024px)',
    largeDesktop: '(min-width: 1025px)'
  }

  const currentBreakpoint = ref('')

  const updateBreakpoint = () => {
    if (window.matchMedia(breakpoints.mobile).matches) {
      currentBreakpoint.value = 'mobile'
    } else if (window.matchMedia(breakpoints.tablet).matches) {
      currentBreakpoint.value = 'tablet'
    } else if (window.matchMedia(breakpoints.desktop).matches) {
      currentBreakpoint.value = 'desktop'
    } else {
      currentBreakpoint.value = 'largeDesktop'
    }
  }
  const currentClass = computed(() => {
    return {
      'class-mobile': currentBreakpoint.value === 'mobile',
      'class-tablet': currentBreakpoint.value === 'tablet',
      'class-desktop': currentBreakpoint.value === 'desktop',
      'class-large-desktop': currentBreakpoint.value === 'largeDesktop',
    }
  })
  
  onMounted(() => {
    updateBreakpoint()
    window.addEventListener('resize', updateBreakpoint)
  })
  
  onUnmounted(() => {
    window.removeEventListener('resize', updateBreakpoint)
  })
  
  return {
    currentBreakpoint,
    currentClass
  }
}
