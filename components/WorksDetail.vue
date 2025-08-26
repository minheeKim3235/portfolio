<template>
    <Teleport to="body">
        <div class="works_detail" :class="currentClass" v-if="isShow" ref="detailFrame"
            @mousemove="handleMouseMove"
            @touchmove="handleTouchMove"
            @click="handleClick"
        >
            <div class="detail_wrap">
                <div class="pagination">
                    <h3 class="works_year" v-if="item.year">{{ item.year }}</h3>
                    <button type="button" class="prev" @click="changeIndex(-1)">PREV</button>
                    <button type="button" class="next" @click="changeIndex(1)">NEXT</button>
                </div>
                <p class="works_title">{{ item.title }}</p>
                <p class="works_desc" v-html="item.desc"></p>
                <h4 class="works_tit">주요업무</h4>
                <ul class="works_li">
                    <li v-for="part in item.parts">{{ part }}</li>
                </ul>
                <h4 class="works_tit">업무성과</h4>
                <ul class="works_li">
                    <li v-for="result in item.results">{{ result }}</li>
                </ul>
                <!-- <h4 class="works_tit">참여인원</h4> -->
                <h4 class="works_tit">기여도 {{ computedContribution }}%</h4>
                <div class="works_members">
                    <p v-if="item.members[0].planner !== 0"><font-awesome :icon="['fas', 'chart-diagram']" />기획 {{ item.members[0].planner }}</p>
                    <p v-if="item.members[0].designer !== 0"><font-awesome :icon="['fas', 'palette']" />
                        <strong v-if="item.position.includes(1)">디자인 {{ item.members[0].designer }}</strong>
                        <template v-else>디자인 {{ item.members[0].designer }}</template>
                    </p>
                    <p v-if="item.members[0].publisher !== 0"><font-awesome :icon="['fas', 'laptop-code']" />
                        <strong v-if="item.position.includes(2)">퍼블리싱 {{ item.members[0].publisher }}</strong>
                        <template v-else>퍼블리싱 {{ item.members[0].publisher }}</template>
                    </p>
                    <p v-if="item.members[0].developer !== 0"><font-awesome :icon="['fas', 'code']" />개발 {{ item.members[0].developer }}</p>
                </div>
                <p class="works_tags">
                    <span v-for="tag in item.tags" :key="tag">{{ tag }}</span>
                </p>
                <figure :class="`${item.type}`">
                    <span class="frame"></span>
                    <span class="img_wrap">
                        <img :src="`./images/works/${item.image[1]}`" alt="" v-if="Array.isArray(item.image) && gifData === null">
                        <img :src="`./images/works/${item.image}`" alt="" class="align-top" v-else>
                    </span>
                </figure>
                <div class="btn_close" :style="btnStyle" v-show="isBtnVisible" @click="closeDetail"><font-awesome :icon="['fas', 'xmark']" /></div>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { useBreakpoint } from '../composables/useBreakpoint';

import data from '@/assets/js/data.json'

const { currentBreakpoint, currentClass } = useBreakpoint()
const gifData = ref(null)
const props = defineProps({
    initialItemIndex: {
        type: Number,
        default: 0
    }
})

//------- data ---------//
const isShow = ref(false);
const detailFrame = ref(null);
const prevBtn = ref(null);
const nextBtn = ref(null);
const currentIndex = ref(props.initialItemIndex);
const btnStyle = reactive({ left: '0px', top: '0px'});
const isBtnVisible = ref(false);
const emits = defineEmits(['closed']);

//------- computed ---------//
const item = computed(() => {
    return data.works[currentIndex.value];
});
const computedContribution = computed(() => {
    const members = Object.values(item.value.members[0]);
    const position = Object.values(item.value.position);
    const totalMembers = members.reduce((prev, cur) => {
        return prev + cur;
    }, 0);

    let totalContribution = 0;
    position.forEach((role) => {
        totalContribution += members[role] / totalMembers *  1 / members[role];
    })
    return Math.ceil(totalContribution * 100);
})

//------- methods ---------//
const changeIndex = (val) => {
    const newIndex = currentIndex.value + val;

    if (newIndex >= 0 && newIndex < data.works.length) {
        currentIndex.value = newIndex;
    }
}

const closeDetail = () => {
    isShow.value = false;
}

const handleMouseMove = (e) => {
    const target = e.target;
    if (!target.closest('.pagination, .prev, .next, .works_year')) {
        const scrollTop = detailFrame.value?.scrollTop || 0;

        const mouseX = e.clientX;
        const mouseY = e.clientY + scrollTop;
        btnStyle.left = `${mouseX}px`;
        btnStyle.top = `${mouseY}px`;
        isBtnVisible.value = true;
    } else {
        isBtnVisible.value = false;
    }
}

const handleTouchMove = (e) => {
    const target = e.target;
    if (!target.closest('.pagination, .prev, .next, .works_year')) {
        const mouseX = e.changedTouches[0].clientX;
        const mouseY = e.changedTouches[0].clientY;
        btnStyle.left = `${mouseX}px`;
        btnStyle.top = `${mouseY}px`;
        isBtnVisible.value = true;
    } else {
        isBtnVisible.value = false;
    }
}

const handleClick = (e) => {
    const target = e.target;
    if (!target.closest('.pagination, .prev, .next, .works_year')) {
        emits('closed');
        isShow.value = false;
        prevBtn.value?.classList.remove('deactive');
        nextBtn.value?.classList.remove('deactive');
        document.documentElement.style.overflow = 'auto';
    }
}

watch(isShow, (newVal) => {
    if (newVal) {
        document.documentElement.style.overflow = 'hidden';
        currentIndex.value = props.initialItemIndex;
    } else {
        document.documentElement.style.overflow = 'auto';
    }
})

defineExpose({
    detailFrame,
    isShow
})

onMounted(() => {
    prevBtn.value = document.querySelector('.prev');
    nextBtn.value = document.querySelector('.next');
})
</script>

<style lang="scss" scoped>
/* Works Detail*/
.works_detail {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    z-index: 99;
    background-color: #d9e4f2;
    overflow-x: hidden;
    overflow-y: scroll;
    
    .detail_wrap {
        padding: 14.8vh 9.8vw;
        width: 100%;
        min-height: 100%;
        height: auto;
    }
    .pagination {
        position: relative;
        margin-bottom: 130px;
        min-width: 250px;
        width: 30vw;
        max-width: 320px;
        text-align: center;
        z-index: 101;
        transition: .5s all;

        h3 {
            display: inline-block;
            font: 400 2.25rem/2rem 'Oswald', sans-serif;

            &:before {
                display: block;
                content: " ";
                margin-bottom: 20px;
                width: 100%;
                height: 5px;
                background-color: var(--color-dark);
            }
        }

        button {
            display: block;
            position: absolute;
            padding: 0 40px;
            top: 40px;
            font-size: .75rem;
            transition: .5s all;

            &.deactive {
                opacity: .3;
            }

            &:before,
            &:after {
                display: inline-block;
                position: absolute;
                top: 50%;
                content: '';
                width: 30px;
                height: 1px;
                background: var(--color-dark);
                transition: .5s all;
            }

            &.prev {
                padding-right: 0;
                left: 0;

                &:before,
                &:after {
                    left: 0;
                    transform-origin: 0 100%;
                }

                &:hover {
                    padding: 0 10px 0 30px;

                    &:before {
                        transform: rotate(45deg);
                    }

                    &:after {
                        transform: rotate(-45deg);
                    }
                }
            }

            &.next {
                padding-left: 0;
                right: 0;

                &:before,
                &:after {
                    right: 0;
                    transform-origin: 100% 0;
                }

                &:hover {
                    // padding-right: 40px;
                    padding: 0 30px 0 10px;

                    &:before {
                        transform: rotate(45deg);
                    }

                    &:after {
                        transform: rotate(-45deg);
                    }
                }
            }
        }
    }

    .works_title {
        margin-bottom: 50px;
        font: 800 1.825rem / 1 var(--font-tit);
    }

    .works_desc {
        font-size: 1.0125rem;
        line-height: 1.5rem;
        word-break: keep-all;
    }

    .works_tit {
        margin: 20px 0 10px;
    }
    .works_li {
        font-size: .85em;
        display: flex;
        flex-flow: column wrap;
        gap: 10px 0;
        li {
            line-height: 1.2;
            &:before {
                content: '- '
            }
        }
    }
    .works_members {
        font-size: .85em;
        display: flex;
        gap: 20px;
        svg {
            width: 14px;
            margin-right: 5px;
        }
    }
    .works_tags {
        margin: 40px 0 0 -5px;

        span {
            display: inline-block;
            margin: 5px;
            padding: 7px 13px;
            color: var(--color-mid);
            font-size: 0.725rem;
            background: rgba(255, 255, 255, .8);
            border-radius: 18px;

            &:before {
                content: "#";
            }
        }
    }

    figure {
        position: fixed;
        z-index: 1;
        transition: .5s left;
        width: var(--frameW);

        .frame {
            position: relative;
            display: block;
            background-position: 0 0;
            background-repeat: no-repeat;
            background-size: 100% auto;
            width: var(--frameW);
            z-index: 3;
        }

        .img_wrap {
            --calcW: calc(var(--wrapW) * 100%);
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            width: var(--calcW);
            height: calc(var(--calcW) / var(--ratio));
            z-index: 2;
            // z-index: 12;

            img {
                max-width: 100%;
            }
            &:has(.align-top) {
                align-items: start;
            }
        }

        &.pc {
            --frameW: 60vw;
            --wrapW: 0.922;
            --ratio: 1.39;
            left: 43vw;
            top: 50%;
            transform: translateY(-50%);

            .frame {
                aspect-ratio: 1.275;
                background-image: url("/images/frame_pc.png");
            }

            .img_wrap {
                left: 4%;
                top: 5.6%;
            }
        }

        &.tab {
            --frameW: 57vw;
            --wrapW: 0.762;
            --ratio: 0.84;
            left: 45.2vw;
            top: 50%;
            transform: translateY(-50%);

            .frame {
                aspect-ratio: 1.6;
                background-image: url("/images/frame_tab.png");
            }

            .img_wrap {
                left: 21.3%;
                top: 4.5%;
            }
        }

        &.mobile {
            --frameW: 33.8vw;
            --wrapW: 0.861;
            --ratio: 0.92;
            left: 52vw;
            top: 14vh;

            .frame {
                aspect-ratio: .5;
                background-image: url("/images/frame_mobile.png");
            }

            .img_wrap {
                left: 6.5%;
                top: 3.3%;
            }
        }
    }
}

.btn_close {
    position: absolute;
    left: 0;
    top: 0;
    width: 45px;
    height: 45px;
    display:flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    border-radius: 50%;
    background: #fff;
    border: 3px solid var(--color-dark);
    opacity: .8;
    transform: translate(-50%, -50%);
    z-index: 100;
    cursor: none;
}
:deep(strong) {
    font-weight: 500;
    position: relative;
    background: repeating-linear-gradient(transparent, transparent calc(1rem - 8px), #fcffc1 calc(1rem - 8px), #fcffc1 1rem);
}
</style>