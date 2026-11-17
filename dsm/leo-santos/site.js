(() => {
  const b=document.getElementById("burger"), d=document.getElementById("drawer");
  if(b&&d){b.addEventListener("click",()=>{const o=d.classList.toggle("open");b.setAttribute("aria-expanded",String(o));});d.addEventListener("click",e=>{if(e.target.tagName==="A"){d.classList.remove("open");b.setAttribute("aria-expanded","false");}});}
})();