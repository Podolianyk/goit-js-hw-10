import"./assets/modulepreload-polyfill-3cfb730f.js";import{f as m,i as h}from"./assets/vendor-77e16229.js";const s=document.getElementById("datetime-picker"),n=document.querySelector("[data-start]"),a=document.querySelectorAll(".value");let o,r,i=new Date;const f={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){o=e[0],r=o-i,r<1e3?(h.error({title:"Error",message:"Please choose a date in the future",position:"topCenter"}),n.classList.add("disabled")):n.classList.remove("disabled")}};m(s,f);n.addEventListener("click",()=>{i=new Date,n.classList.add("disabled"),s.disabled=!0;const e=setInterval(()=>{r=o-new Date;const t=p(r);a[0].innerHTML=String(t.days).padStart(2,"0"),a[1].innerHTML=String(t.hours).padStart(2,"0"),a[2].innerHTML=String(t.minutes).padStart(2,"0"),a[3].innerHTML=String(t.seconds).padStart(2,"0"),r<=0&&(clearInterval(e),n.classList.remove("disabled"),s.disabled=!1)},1e3)});function p(e){const d=Math.floor(e/864e5),c=Math.floor(e%864e5/36e5),l=Math.floor(e%864e5%36e5/6e4),u=Math.floor(e%864e5%36e5%6e4/1e3);return{days:d,hours:c,minutes:l,seconds:u}}
//# sourceMappingURL=commonHelpers.js.map
