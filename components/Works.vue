<template>
    <section id="works" class="bg-light">
        <!-- <div class="guide"><span>좌우로 스와이프 하세요</span></div> -->
        <h2>WORKS</h2>
        <ul class="work_lists" ref="listWrap">
            <li v-for="(item, i) in data.works" :key="item.title">
                <div class="text_wrap">
                    <p class="year">{{ item.year }}</p>
                    <p class="title" v-html="item.title"></p>
                    <p class="desc" v-html="item.desc"></p>
                    <p class="tags" v-for="(tag, i) in item.tags" :key="`tag-${i}`">
                        <span>{{ tag }}</span>
                    </p>
                    <figure :style="`background-color: #${makeRandomColor[i]};`" @click="detailView(i)">
                        <template v-if="Array.isArray(item.image)">
                            <img :src="`_nuxt/assets/images/works/${item.image[0]}`" alt="" class="image haveGif" />
                            <!-- <img :src="getImageUrl(item.image[0])" alt="" class="image haveGif" /> -->
                        </template>
                        <img :src="`_nuxt/assets/images/works/${item.image}`" alt="" class="image" v-else />
                        <!-- <img :src="getImageUrl(item.image)" alt="" class="image" v-else /> -->
                    </figure>
                </div>
            </li>
        </ul>
        <WorksDetail :initialItemIndex="detailIndex" ref="test" @closed="closingDetail" />
    </section>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import data from '@/assets/js/data.json'

// const getImageUrl = (name) => {
//     return new URL(`../assets/images/works/${name}`, import.meta.url).href
// }

const randomColor = ref(['1d3045', '6682a3', 'dbe2ef', 'fff'])
const makeRandomColor = ref([])
const listWrap = ref(null);
const test = ref(null);
const detailIndex = ref(undefined);

const randomBg = () => {
    let colorCount = randomColor.value.length;
    let order = Math.floor(Math.random() * colorCount);
    return randomColor.value[order];
}

const detailView = (val) => {
    detailIndex.value = val;
}
const closingDetail = () => {
    detailIndex.value = undefined;
}
watch(detailIndex, (newVal) => {
    if (test.value && detailIndex.value !== undefined) {
        test.value.isShow = true;
    }
})
// gsap
gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
    makeRandomColor.value = data.works.map(() => randomBg());

    let sections = gsap.utils.toArray(".work_lists li");
    let maxWidth = 0;
    let horizontalScroll, scrollTween;
    
    // 가로 스크롤 최대 너비 계산
    const getMaxWidth = () => {
        const viewportWidth = window.outerWidth;
        maxWidth = 0;
        
        if (window.innerWidth > 480) {
            sections.forEach((section) => {
                maxWidth += section.offsetWidth;
            });
            let spacing = viewportWidth * 0.025 * (sections.length - 1) + viewportWidth * 0.078 * 2;
            maxWidth += spacing;
            listWrap.value.style.width = `${maxWidth}px`;
        } else {
            return
        }
    };

    const initializeScroll = () => {
        if (horizontalScroll) {
            horizontalScroll.kill();
        }
        if (scrollTween) {
            scrollTween.kill();
        }
        
        if (window.innerWidth > 480) {
            scrollTween = gsap.to('.work_lists', {
                x: () => `-${maxWidth - window.innerWidth}`,
                ease: 'none'
            })
    
            horizontalScroll = ScrollTrigger.create({
                animation: scrollTween,
                trigger: '#works',
                pin: true,
                start: 'top top',
                end: () => `+=${maxWidth - window.innerWidth}`,
                scrub: true
            })   
        } else {
            return
        }
    }

    getMaxWidth();
    initializeScroll();

    // 리사이즈 이벤트 핸들러
    window.addEventListener("resize", () => {
        getMaxWidth();
        ScrollTrigger.refresh();
        initializeScroll(); // 스크롤 및 드래그 초기화
    });

})
</script>

<style lang="scss" scoped>
#works {
    padding: 100px 0 0;
    min-height: 100vh;
    background-color: var(--color-light);
    color: var(--color-dark);
    box-sizing: border-box;
    h2 {
        color: var(--color-dark);
    }
    .work_lists {
        position: relative;
        display: flex;
        flex-flow: row nowrap;
        padding: 0 7.8vw 80px;
        margin-top: 70px;
        width: auto;
        z-index: 1;
        gap: 2.5vw;
        &:before {
            position: absolute;
            display: block;
            margin-top: 30px;
            left: 0;
            top: 0;
            content: '';
            width: 100%;
            height: 2rem;
            border-bottom: 1px solid var(--color-dark);
            z-index: 2;
        }
        li {
            position: relative;
            display: block;
            flex: 0 0 auto;
            width: 18vw;
            .text_wrap {
                font: 800 .875rem/1 var(--font-desc);
                .year {
                    display: inline-block;
                    padding: 30px 0 30px;
                    font: 500 1.325rem/2rem 'Oswald', sans-serif;
                    letter-spacing: -1px;
                    position: relative;
                    transition: .5s all;
                    &:after {
                        position: absolute;
                        left: 0;
                        top: 62px;
                        display: block;
                        content: '';
                        width: 100%;
                        height: 3px;
                        font-size: 0;
                        line-height: 0;
                        background: var(--color-dark);
                        transition: .5s all;
                    }
                }
                .title {
                    margin-bottom: 10px;
                }
                .desc {
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    word-break: break-all;
                    margin-bottom: 30px;
                    height: 1.125rem;
                    font-size: 0.75rem;
                    font-weight: 400;
                    line-height: 1.5;
                }
                .tags {
                    display: none;
                }
            }
            figure {
                position: relative;
                overflow: hidden;
                width: 100%;
                aspect-ratio: 1.75;
                background: var(--color-dark);
                border-radius: 8px;
                transition: .5s all;
                img {
                    object-fit: cover;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    width: 100%;
                    mix-blend-mode: luminosity;
                    opacity: .5;
                    transform: translate(-50%, -50%);
                    transition: .5s all;
                }
            }
            &:hover {
                .year {
                    padding: 20px 0 40px 0;
                    color: var(--color-mid);
                    &:after {
                        top: 0;
                        background-color: var(--color-mid);
                        transition: .5s all;
                    }
                }
                figure {
                    transform: translateY(-10px);
                    cursor: pointer;
                    img {
                        mix-blend-mode: normal !important;
                        opacity: 1;
                        // transform: translate(-50%, -50%) scale(1.2);
                    }
                    &:after {
                        position: relative;
                        display: block;
                        content: '';
                        width: 100%;
                        height: 100%;
                        color: #fff;
                        text-align: center;
                        background: rgba(0, 0, 0, .2);
                        background-size: cover;
                        z-index: 5;
                    }
                }
            }
        }
    }
    .guide {
        content: '';
        position: absolute;
        display: none;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .3);
        z-index: 99;
        span {
            position: absolute;
            left: 50%;
            top: 70%;
            width: 150px;
            height: 150px;
            font-size: 0;
            line-height: 0;
            background: #fff url("../images/swipe.gif") no-repeat 50% 50%;
            background-size: 100px auto;
            border-radius: 50%;
            transform: translate(-50%, -50%);
        }
    }
}
</style>