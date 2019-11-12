 /************************************* smooth-scroll*************************************/

 window.onbeforeunload = function() {
     window.scrollTo(0, 0);
 }

 window.onload = function() {

     const easing = function(t) { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t }
     const scrollElems = document.getElementsByClassName('link');

     const scrollToElem = (start, stamp, duration, scrollEndElemTop, startScrollOffset) => {
         //debugger;
         const runtime = stamp - start;
         let progress = runtime / duration;
         const ease = easing(progress);

         progress = Math.min(progress, 1);

         const newScrollOffset = startScrollOffset + (scrollEndElemTop * ease);
         window.scroll(0, startScrollOffset + (scrollEndElemTop * ease));

         if (runtime < duration) {
             requestAnimationFrame((timestamp) => {
                 const stamp = new Date().getTime();
                 scrollToElem(start, stamp, duration, scrollEndElemTop, startScrollOffset);
             })
         }
     }

     for (let i = 0; i < scrollElems.length; i++) {
         const elem = scrollElems[i];

         elem.addEventListener('click', function(e) {
             e.preventDefault();
             const scrollElemId = e.target.href.split('#')[1];
             const scrollEndElem = document.getElementById(scrollElemId);

             const anim = requestAnimationFrame(() => {
                 const stamp = new Date().getTime();
                 const duration = 1200;
                 const start = stamp;

                 const startScrollOffset = window.pageYOffset;

                 const scrollEndElemTop = scrollEndElem.getBoundingClientRect().top;

                 scrollToElem(start, stamp, duration, scrollEndElemTop, startScrollOffset);
                 // scrollToElem(scrollEndElemTop);
             })
         })
     }
 }

window.addEventListener('scroll', ()=> {



  let winScroll = document.documentElement.scrollTop;
  let winHeight = window.innerHeight;
  let percent = winScroll / winHeight * 100;
  if (percent > 10) {
    document.querySelector('nav').style.background = 'white';
  } else {
    document.querySelector('nav').style.background = 'transparent';
  }

});
 /*************************************  nav *************************************/

 const burger = document.querySelector('.burger');
 const nav = document.querySelector('nav ul');
 const navItem = document.querySelectorAll('nav ul li');
 const close = document.querySelector('.close');

 function navOpen() {
     nav.classList.add('nav-active');
     close.style.display = 'block';
     document.querySelector('nav').style.background = 'transparent';
 }

 function navClose() {
     nav.classList.remove('nav-active');
     close.style.display = 'none';
 }

 burger.addEventListener('click', navOpen);
 close.addEventListener('click', navClose);

 navItem.forEach(function(elem) {
     elem.addEventListener('click', navClose);
 });


 /************************************* form *************************************/

 const thankYouScreen = document.querySelector('.form_thank_you');
 const thankYouPopUp = document.querySelector('.form_thank_you_window');
 const thankYouButton = document.querySelector('.form_thank_you_window .button');

 function thankYouClose() {
     setTimeout(() => {
         thankYouScreen.style.display = 'none';
     }, 500)
     thankYouPopUp.style.opacity = '0';
     thankYouPopUp.style.transform = 'translateY(100px)';
     thankYouScreen.style.opacity = '0';

 }

 thankYouButton.addEventListener('click', thankYouClose);




 let serialize = function(form) {

     let serialized = [];

     for (let i = 0; i < form.elements.length; i++) {

         let field = form.elements[i];

         if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;

         if (field.type === 'select-multiple') {
             for (let n = 0; n < field.options.length; n++) {
                 if (!field.options[n].selected) continue;
                 serialized.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(field.options[n].value));
             }
         } else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
             serialized.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(field.value));
         }
     }

     return serialized.join('&');

 };



 form.onsubmit = function validator(e) {
     let request = new XMLHttpRequest();
     request.open('POST', './mail.php', true);
     request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

     let data = serialize(form);

     request.onload = function() {
         if (this.status >= 200 && this.status < 400) {
             setTimeout(function() {
                 thankYouScreen.style.display = 'flex';
                 setTimeout(() => {
                     thankYouPopUp.style.opacity = '1';
                     thankYouPopUp.style.transform = 'translateY(0px)';
                     thankYouScreen.style.opacity = '1';
                 }, 10)


                 form.reset();
             }, 500);
         }
     };

     request.send(data);
     return false;


 }


 /************************************* loading *************************************/

 function loader() {
     const h1 = document.querySelector('h1');
     const description = document.querySelector('.description');
     const button = document.querySelector('header .button');
     const img = document.querySelector('header .right-side');
     document.body.style.opacity = 1;

     setTimeout(() => {
         h1.style.opacity = 1;
         h1.style.transform = 'translateY(0px)';
     }, 700)

     setTimeout(() => {
         description.style.opacity = 1;
         description.style.transform = 'translateY(0px)';
     }, 900)

     setTimeout(() => {
         button.style.opacity = 1;
         button.style.transform = 'translateY(0px)';
         img.style.opacity = 1;
     }, 1100)

     if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
         let args = ['\n %c Made by emotiON: %c https://emotion-agency.com %c %c \n\n', 'color: #fff; background: #a03adb; padding:5px 0;', 'color: #fff; background: #131116; padding:5px 0;', 'background: #fff; padding:5px 0;', 'color: #b0976d; background: #fff; padding:5px 0;'];
         window.console.log.apply(console, args);
     } else if (window.console) {
         window.console.log('Made by emotiON: https://emotion-agency.com');
     }

 }

 window.addEventListener('load', loader);