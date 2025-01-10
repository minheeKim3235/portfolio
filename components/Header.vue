<template>
  <header>
    <nav :style="`--navColor: ${navColor}`">
      <ul>
        <li class="logo"><button type="button" @click="gotoSection" data-section-color="light">Home</button>
          <svg
            id="Layer_1"
            viewBox="0 0 95.9 95.9">
            <path
              class="cls-1"
              d="m47.95,0C21.47,0,0,21.47,0,47.95s21.47,47.95,47.95,47.95,47.95-21.47,47.95-47.95S74.43,0,47.95,0Zm-22.81,59.14c0,1.36-1.11,2.46-2.49,2.46s-2.49-1.1-2.49-2.46v-21.67c0-1.36,1.11-2.46,2.49-2.46s2.49,1.1,2.49,2.46v21.67Zm17.95-6.89c.97.96.97,2.52,0,3.48-.97.96-2.55.96-3.52,0l-3.98-3.94-3.98,3.94c-.97.96-2.55.96-3.52,0-.97-.96-.97-2.52,0-3.48l3.98-3.94-4-3.96c-.97-.96-.97-2.52,0-3.48.97-.96,2.55-.96,3.52,0l4,3.96,4-3.96c.97-.96,2.55-.96,3.52,0,.97.96.97,2.52,0,3.48l-4,3.96,3.98,3.94Zm7.91,6.89c0,1.36-1.11,2.46-2.49,2.46s-2.49-1.1-2.49-2.46v-21.67c0-1.36,1.11-2.46,2.49-2.46s2.49,1.1,2.49,2.46v21.67Zm16.41-8.05h-11.94c-1.37,0-2.49-1.1-2.49-2.46s1.11-2.46,2.49-2.46h11.94c1.37,0,2.49,1.1,2.49,2.46s-1.11,2.46-2.49,2.46Zm9.45,8.05c0,1.36-1.11,2.46-2.49,2.46s-2.49-1.1-2.49-2.46v-21.67c0-1.36,1.11-2.46,2.49-2.46s2.49,1.1,2.49,2.46v21.67Z"/>
          </svg></li>
        <li><button type="button" @click="gotoSection" data-section-color="light">profile</button></li>
        <li><button type="button" @click="gotoSection" data-section-color="dark">skills</button></li>
        <li><button type="button" @click="gotoSection" data-section-color="light">works</button></li>
        <li><button type="button" @click="gotoSection" data-section-color="dark">contact</button></li>
      </ul>
    </nav>
  </header>
</template>
<script setup>
import { ref, onMounted, nextTick } from 'vue'

const navColor = ref('#112d4e')

const changeNavColor = (val) => {
  if ( val === 'light') {
    navColor.value = '#112d4e'
  } else {
    navColor.value = '#f9f7f7'
  }
}

const gotoSection = (e) => {
  const sectionId = e.target.innerText.toLowerCase();
  if ( sectionId === 'home') {
    window.scrollTo({top: 0, behavior: 'smooth'});
  } else {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({behavior: 'smooth'});
  }
}

onMounted(() => {
  if (typeof IntersectionObserver !== 'undefined') {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const sectionId = entry.target.id;
        if (entry.isIntersecting) {
          const navBtns = document.querySelectorAll('nav ul li button');
          document.querySelectorAll('nav ul li').forEach((li) => {
            li.classList.remove('on');
          })
          navBtns.forEach(btn => {
            if (btn.innerText.toLowerCase() === sectionId.toLowerCase()) {
              const sectionColor = btn.dataset.sectionColor;
              if (sectionColor) {
                btn.parentNode.classList.add('on');
                changeNavColor(sectionColor);
              }
            }
          })
        }
      })
    }, { threshold: 0.5 })
    nextTick(() => {
      const sections = document.querySelectorAll('section');
      sections.forEach((section) => {
          observer.observe(section);
      })
    })
  }
})
</script>
<style lang="scss" scoped>
.cls-1 {
  fill-rule: evenodd;
  stroke-width: 0px;
}
</style>