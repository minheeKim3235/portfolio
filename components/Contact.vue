<template>
    <section id="contact" class="bg-dark">
        <h2>Get in Touch!</h2>
        <font-awesome :icon="['fas', 'envelope']" />
        <span>mhkim3235@gmail.com</span>
        <!-- <form method="POST" action="https://script.google.com/macros/s/AKfycbzPzHhvwR20-cz7nz6fZdyn1EGcy6_zoJB9kO0XJG_SmOmq77w_BVC4LkRR9eKG96a8/exec" target="frAttachFiles" name="contactForm" class="gform">
            <ul>
                <li>
                    <label for="name"><font-awesome :icon="['fas', 'user']" />이름</label>
                    <input type="text" placeholder="이름" id="name" name="name" autocomplete="username" required />
                </li>
                <li>
                    <label for="mail"><font-awesome :icon="['fas', 'envelope']" />이메일</label>
                    <input type="email" placeholder="메일" name="email" id="mail" autocomplete="email" required />
                </li>
                <li>
                    <label for="title"><font-awesome :icon="['fas', 'pen']" />제목</label>
                    <input type="text" placeholder="제목" id="title" name="contactText" autocomplete="off" required />
                </li>
                <li>
                    <label for="content" class="hidden">내용</label>
                    <textarea name="message" cols="30" rows="10" placeholder="내용을 입력하세요." autocomplete="off" id="content" required></textarea>
                </li>
            </ul>
            <button type="submit"><font-awesome :icon="['fas', 'paper-plane']" /> SEND MESSAGE</button>
        </form> -->
        <!-- <div class="thankyou_message" v-if="submitEnd === true">
            <div class="inner_wrap">
                <h2><em><i class="fa-solid fa-envelope-circle-check"></i><br />
                        Thanks!</em>연락주셔서 감사합니다!
                </h2>
                <span class="done" @click="submitEnd = false"><font-awesome :icon="['fas', 'xmark']" /></span>
            </div>
        </div> -->
    </section>
</template>
<script setup>
import { ref } from 'vue'
const submitEnd = ref(false);

onMounted(() => {
    // get all data in form and return object
function getFormData(form) {
    var elements = form.elements;
    var honeypot;

    var fields = Object.keys(elements).filter(function(k) {
        if (elements[k].name === "honeypot") {
        honeypot = elements[k].value;
        return false;
        }
        return true;
    }).map(function(k) {
        if(elements[k].name !== undefined) {
        return elements[k].name;
        // special case for Edge's html collection
        }else if(elements[k].length > 0){
        return elements[k].item(0).name;
        }
    }).filter(function(item, pos, self) {
        return self.indexOf(item) == pos && item;
    });

    var formData = {};
    fields.forEach(function(name){
        var element = elements[name];
        
        // singular form elements just have one value
        formData[name] = element.value;

        // when our element has multiple items, get their values
        if (element.length) {
        var data = [];
        for (var i = 0; i < element.length; i++) {
            var item = element.item(i);
            if (item.checked || item.selected) {
            data.push(item.value);
            }
        }
        formData[name] = data.join(', ');
        }
    });

    // add form-specific values into the data
    formData.formDataNameOrder = JSON.stringify(fields);
    formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
    formData.formGoogleSendEmail
        = form.dataset.email || ""; // no email by default

    return {data: formData, honeypot: honeypot};
    }

    function handleFormSubmit(event) { // handles form submit without any jquery
        event.preventDefault();           // we are submitting via xhr below
        var form = event.target;
        var formData = getFormData(form);
        var data = formData.data;

        // If a honeypot field is filled, assume it was done so by a spam bot.
        if (formData.honeypot) {
            return false;
        }

        disableAllButtons(form);
        var url = form.action;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        // xhr.withCredentials = true;
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                form.reset();
                var formElements = form.querySelector(".form-elements")
                if (formElements) {
                formElements.style.display = "none"; // hide form
                }
                var thankYouMessage = form.querySelector(".thankyou_message");
                if (thankYouMessage) {
                thankYouMessage.style.display = "block";
                }
            }
        };
        // url encode form data for sending as post data
        var encoded = Object.keys(data).map(function(k) {
            return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
        }).join('&');
        xhr.send(encoded);
        }

        function loaded() {
        // bind to the submit event of our form
        var forms = document.querySelectorAll("form.gform");
        for (var i = 0; i < forms.length; i++) {
            forms[i].addEventListener("submit", handleFormSubmit, false);
        }
        };
        document.addEventListener("DOMContentLoaded", loaded, false);

        function disableAllButtons(form) {
        var buttons = form.querySelectorAll("button");
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
        }
    }
})

</script>

<style lang="scss" scoped>
#contact {
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #596c84;
    color: #fff;
    h2 {
        margin-bottom: 30px;
        font-size: 6vw;
        letter-spacing: 0;
    }
    svg {
        margin-bottom: 10px;
        font-size: 36px;
    }
}
// #contact {
//     padding: 10vh 0;
//     min-height: 100vh;
//     background: #596c84;
//     h2 {
//         margin-bottom: 30px;
//         font-size: 6vw;
//         color: #fff;
//         letter-spacing: 0;
//     }
//     form {
//         position: relative;
//         display: flex;
//         flex-flow: column wrap;
//         margin: 0 auto;
//         min-width: 400px;
//         width: 35vw;
//         li {
//             position: relative;
//             display: flex;
//             margin: 10px 0;
//             label {
//                 position:absolute;
//                 display: flex;
//                 justify-content: center;
//                 align-items: center;
//                 padding: 0 0 0 20px;
//                 margin: 0;
//                 left: 0;
//                 top: 50%;
//                 width: 50px;
//                 aspect-ratio: 1;
//                 line-height: 100%;
//                 color: transparent;
//                 z-index: 2;
//                 transform: translateY(-50%);
//                 svg {
//                     line-height: auto;
//                     color: #fff;
//                 }
//                 &.hidden {
//                     width: 0;
//                     height: 0;
//                     line-height: 0;
//                     color: transparent;
//                 }
//             }
//         }
//     }
    
//     input,
//     textarea {
//         flex: 1 0 auto;
//         position: relative;
//         display: block;
//         padding: 0 20px 0 60px;
//         width: 100%;
//         height: 50px;
//         font-size: 0.825rem;
//         color: #fff;
//         background: #697a90;
//         border: 1px solid rgba(255, 255, 255, .25);
//         border-radius: 50vh;
//         z-index: 1;
//         transition: .5s all;
//     }
//     textarea {
//         padding: 20px;
//         margin-top: 0;
//         height: 200px;
//         line-height: 1.25rem;
//         border-radius: 20px;
//         resize: none;
//     }
//     input::placeholder,
//     textarea::placeholder {
//         color: #fff;
//     }
//     input:focus,
//     textarea:focus {
//         color: var(--color-dark);
//         background: rgba(255, 255, 255, .5);
//         border: none;
//         outline: none;
//         box-shadow: 0 0 15px rgba(0, 0, 0, .2);
//     }
//     button {
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         gap: 10px;
//         height: 50px;
//         color: var(--color-dark);
//         border-radius: 25px;
//         background: rgba(255, 255, 255, .8);
//         transition: .5s all;
//         &:focus,
//         &:active {
//             background: rgba(29, 48, 69, .8);
//             color: #fff;
//             outline: none;
//             box-shadow: 0 0 15px rgba(0, 0, 0, .2);
//         }
//     }
// }
// .thankyou_message {
//     position: fixed;
//     left: 0;
//     top: 0;
//     width: 100%;
//     height: 100%;
//     background: rgba(0, 0, 0, .5);
//     z-index: 101;
//     .inner_wrap {
//         position: absolute;
//         display: flex;
//         flex-flow: row wrap;
//         justify-items: center;
//         align-items: center;
//         left: 50%;
//         top: 50%;
//         padding: 50px 20px !important;
//         width: 400px !important;
//         height: auto !important;
//         background: #fff;
//         border-radius: 20px;
//         box-shadow: 0 0 20px rgba(0, 0, 0, .5);
//         z-index: 101;
//         transform: translate(-50%, -50%);
//     }
//     h2 {
//         padding: 0;
//         margin: 0 !important;
//         width: 100%;
//         text-align: center;
//         font-family: var(--font-desc);
//         font-size: 1rem !important;
//         line-height: 1.125rem;
//         letter-spacing: 0;
//         color: #333 !important;
//         em {
//             display: block;
//             margin-bottom: 40px;
//             font: normal 400 2rem/1 var(--font-tit);
//             i {
//                 margin-bottom: 20px;
//             }
//         }
//     }
//     .done {
//         position: absolute;
//         right: 15px;
//         top: 15px;
//         width: 40px;
//         height: 40px;
//         color: #333;
//         text-align: center;
//         line-height: 40px;
//         cursor: pointer;
//     }
// }
</style>