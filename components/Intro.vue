    <template>
    <section id="intro" class="bg-light">
        <div class="intro_wrap">
            <div class="greeting">
                <p>
                    <span>만나서 반갑습니다 :)</span>
                    웹퍼블리셔 김민희입니다.
                </p>
            </div>
            <div class="send-mail">
                <a href="mailto:mhkim3235@gmail.com"><i class="fas fa-envelope"></i>
                    mhkim3235@gmail.com</a>
            </div>
        </div>
    </section>
</template>

<script setup>

</script>

<style lang="scss" scoped>
#intro {
    background-color: var(--color-light);
    
    .intro_wrap {
        margin-top: 10vh;
        width: 100%;
        height: 90vh;
        z-index: 1;
        div {
            width: 100%;
            min-height: 45vh;

            &:before, &:after {
                position: relative;
                text-align: center;
                font: 200 7vmax/.73 var(--font-tit);
                color: var(--color-dark);
                letter-spacing: -5px;
            }

            &.greeting {
                display: flex;
                flex-flow: column nowrap;
                justify-content: flex-end;
                p {
                    margin-bottom: 10vh;
                    position: relative;
                    text-align: center;
                    font: 500 1.25rem/2rem var(--font-desc);
                    color: var(--color-dark);
                    z-index: 3;
    
                    span {
                        display: block;
                        font-weight: 800;
                    }
                }
                &:after {
                    content: 'DILIGENCE'
                }
            }

            &.send-mail {
                display: flex;
                flex-flow: column wrap;
                justify-content: start;
                align-items: center;
                position: relative;
                overflow: hidden;
                padding-left: 5px;
                background-color: var(--color-dark);
                z-index: 1;
                a {
                    position: relative;
                    display: inline-flex;
                    flex-flow: row wrap;
                    justify-content: center;
                    align-items: center;
                    padding: 0 40px;
                    margin: 100px auto 0;
                    height: clamp(50px, 4vw, 70px);
                    font: 400 1.125rem/1 var(--font-desc);
                    letter-spacing: 0;
                    color: var(--color-light);
                    background: rgba(255, 255, 255, .1);
                    border: 1px solid rgba(255, 255, 255, .4);
                    border-radius: 35px;
                    z-index: 4;
                    transition: .5s all;
                    i {
                        margin-right: 6px;
                    }
                }
                &:before {
                    content: 'CURIOUSITY';
                    display: block;
                    line-height: .66;
                    color: var(--color-light);
                    z-index: 10;
                }
                &:after {
                    content: '';
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    height: 100%;
                    background: url("@/assets/images/office.webp") no-repeat 50% 80%;
                    background-size: cover;
                    opacity: .1;
                    z-index: 2;
                }
            }
        }
    }
}
</style>