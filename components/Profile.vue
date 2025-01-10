<template>
    <section id="profile" class="bg-light">
        <h2>Profile</h2>
        <figure>
            <span><img src="@/assets/images/profile.svg" alt="프로필 일러스트"></span>
        </figure>
        <p class="introduce">
            안녕하세요, <strong>{{ totalCarrior }}차</strong> 퍼블리셔 김민희입니다.<br />
            만족스러운 사용자경험을 위한 기초가 탄탄하고 완성도 높은 화면 구현을 위해 노력하고 있습니다.
        </p>
        <div class="wrapper">
            <article>
                <h3>INFO</h3>
                <ul>
                    <li><font-awesome :icon="['fas', 'cake-candles']" /> 1986년</li>
                    <li><font-awesome :icon="['fas', 'mobile-screen-button']" /> 010-621*-****</li>
                    <li><font-awesome :icon="['fas', 'envelope']" /> mhkim3235@gmail.com</li>
                </ul>
            </article>
            <article>
                <h3>EDUCATION</h3>
                <p><span class="year edu">2010</span>경희대학교 화학과 졸업</p>
            </article>
            <article>
                <h3>CERTIFICATIONS</h3>
                <ul>
                    <li>인터넷정보검색사 2급</li>
                    <li>컴퓨터그래픽스운용기능사</li>
                </ul>
            </article>
            <article>
                <h3>CAREER</h3>
                <ul>
                    <li><span class="year">2023 ~ 2024</span> 이투스 교육 <span class="role">퍼블리셔</span></li>
                    <li><span class="year">2016 ~ 2023</span> 프리랜서 <span class="role">퍼블리셔</span></li>
                    <li><span class="year">2013 ~ 2016</span> 이안아이티 <span class="role">프리랜서</span></li>
                    <li><span class="year">2010 ~ 2013</span> (주)온라인파워스 <span class="role">웹프로젝트팀</span></li>
                    <li><span class="year">2008 ~ 2009</span> (주)아벤트코리아 <span class="role">체인영업팀</span></li>
                </ul>
            </article>
        </div>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const totalCarrior = computed(() => {
    const fulltime = new Date() - new Date('2010-02-16');
    const restTime = new Date('2023-11-08') - new Date('2016-09-01');
    const calcMonth = 24 * 60 * 60 * 1000 * 30;
    const resultY = parseInt((fulltime - restTime) / calcMonth / 12);
    const resultM = parseInt(((fulltime - restTime) / calcMonth) % 12);
    return `${resultY}년 ${resultM}개월`
})
</script>

<style lang="scss" scoped>
#profile {
    padding-top:10vh;
    display: grid;
    grid-template-columns: 38.9vw 1fr;
    grid-template-rows: 1fr 2fr;
    align-items: start;
    min-height: 100vh;
    color: var(--color-dark);
    background: #fff;
    
    h2 {
        display: none;
    }
    figure, .introduce, .wrapper {
        position: relative;
    }
    figure {
        grid-column: 1 / 2;
        grid-row: 1 / 3;
        margin: -100px 5vw 0 0;
        height: 100%;
        span {
            overflow: hidden;
            position: absolute;
            display: block;
            right: 15vw;
            top: 13vh;
            min-width: 400px;
            width: 26vw;
            aspect-ratio: .5;
            background: var(--color-light);
            border-radius: 250px 250px 0 0;
            transform: rotate(45deg);
        }
        img {
            width: 55%;
            transform: rotate(-45deg) translate(50%, 25%);
        }
    }
    .introduce {
        margin: 80px 0 7.4vh;
        font-size: 0.875rem;
        line-height: 1.5rem;
    }
    .wrapper {
        display: flex;
        flex-flow: row wrap;
        font-size: 0.875rem;
        line-height: 1.5rem;
        article {
            margin-bottom: 50px;
            width: 33.33%;
            h3 {
                display: inline-block;
                margin-bottom: 30px;
                font: 600 1.25rem/1 'Sofia Sans Condensed', sans-serif;
                &:after {
                    display: block;
                    content: '';
                    margin-top: 5px;
                    width: 100%;
                    height: 3px;
                    background: var(--color-dark);
                }
            }
            &:nth-of-type(4) {
                width: 100%;
            }
            li {
                margin-bottom: 5px;
            }
            .year {
                display: inline-block;
                width: 75px;
                font: 400 0.9375rem/1 'Oswald', sans-serif;
                vertical-align: middle;
            }
        }
    }
    .edu {
        margin-right: 8px;
        width: auto !important;
    }
}
</style>