<template>
    <section id="skills" class="bg-dark">
        <!-- 배경 영상 -->
        <object>
            <video src="../assets/bg.mp4" autoplay loop playsinline="true" />
        </object>
        <h2>SKILLS</h2>
        <ul @mouseleave="changeSkill('default')">
            <li v-for="item in data.skills" :key="item.name" @mouseover="changeSkill(item)" :class="`icon_${item.icon}`">
                <span><img :src="`./images/icon_${item.icon}.svg`" :alt="item.name" class="icon"></span>
            </li>
        </ul>
        <!-- ajax 설명 불러오기 -->
        <div class="text_area motion" ref="textArea">
            <div class="text">
                <h3>{{ skill.title }}</h3>
                <p v-html="skill.desc"></p>
            </div>
        </div>

    </section>
</template>

<script setup>
import { ref, watch } from 'vue'
import data from '@/assets/js/data.json'

const textArea = ref(null);
const skill = ref({
    title: '제가 무엇을 할 수 있는지 궁금하신가요?',
    desc: '웹 화면 구현을 위해 제가 보유하고 있는 기술들을 둘러보세요.<br />새로운 기술들이 계속 업데이트 되고 있습니다.🤗'
})

const changeSkill = (val) => {
    textArea.value.classList.add('hide');
    setTimeout(() => {
        textArea.value.classList.remove('motion');
        
        if (val === 'default') {
            skill.value.title = '제가 무엇을 할 수 있는지 궁금하신가요?'
            skill.value.desc = '웹 화면 구현을 위해 보유하고 있는 기술들을 둘러보세요.<br />새로운 기술들이 계속 업데이트 되고 있습니다.🤗'
        } else {
            skill.value.title = val.name
            skill.value.desc = val.description
        }
    }, 300)
    setTimeout(() => {
        textArea.value.classList.remove('hide');
        textArea.value.classList.add('motion');
    }, 600)
}

// watch(skill, (newVal) => {
//     setTimeout(() => {
//         textArea.value.classList.add('motion');
//     }, 300)
// }, { deep: true });
</script>

<style lang="scss" scoped>
#skills {
    --secBg: #1d3045;
    background: var(--secBg);
    min-height: 100vh;
    padding-top: 100px;
    z-index: 0;
    object {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: .5;
        z-index: -1;
        video {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    h2 {
        color: var(--color-light);
    }
    ul {
        position: relative;
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        align-content: center;
        align-items: center;
        gap: 5vw;
        margin: 18vh auto 0;
        width: 100%;
        height: 70px;
        perspective: 1500px;
        li {
            position: relative;
            height: 100%;
            aspect-ratio: 1;
            transition: 1s all;
            span {
                position: relative;
                display: flex;
                flex-flow: row wrap;
                justify-content: center;
                align-content: center;
                height: 100%;
                transition: 1s all;
                z-index: 3;
                &:before {
                    position: absolute;
                    display: block;
                    content: '';
                    left: 50%;
                    top: 50%;
                    width: 100%;
                    height: 4px;
                    background: #1d3045;
                    transform: translate(-50%, -2px);
                    z-index: 2;
                }
                img {
                    position: relative;
                    z-index: 4; 
                    max-width:100%;
                }
            }
            &.icon_html span::before,
            &.icon_css span::before {
                width: 78%;
            }
            &.icon_react span::before {
                width: 70%;
            }
            &.icon_vue span::before {
                width: 48%;
            }
        }
        &:hover li {
            transform: scale(.8);
            img {
                opacity: .3;
            }
            &:hover {
                span {
                    transform: scale(1.5) rotate3d(0, 1, 0, 360deg);
                    cursor: pointer;
                }
                img {
                    opacity: 1 !important;
                }
            }
        }
        &:before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            width: 100%;
            height: 1px;
            background: rgba(255, 255, 255, .2);
        }
    }
    .text_area {
        margin-top: -43px;
        padding: 130px 10% 0;
        width: 100%;
        height: 230px;
        text-align: center;
        color: #fff;
        h3 {
            margin-bottom: 20px;
            line-height: 1.5rem;
            word-break: keep-all;
        }
        p {
            word-break: keep-all;
            line-height:140%;
        }
        .text {
            transform: translateY(50px);
            transition: opacity 0.3s, transform 0.6s;
            opacity: 0;
        }
        &.hide {
            .text {
                opacity: 0 !important;
            }
        }
        &.motion {
            .text {
                transform: translateY(0px);
                opacity: 1;
            }
        }
    }
}
:deep(.text_area) {
    span {
        display: inline-block;
        margin: 2px;
        padding: 5px 8px;
        color: #fff;
        background-color: rgba(63, 114, 175, .5);
        border-radius: 15px;
    }
}
</style>