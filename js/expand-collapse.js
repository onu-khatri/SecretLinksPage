function expandCollapseBind() {
  const timeout = setTimeout(() => {
  var li_ul = document.querySelectorAll(".collapse-able li  ul");
  for (var i = 0; i < li_ul.length; i++) {
    li_ul[i].style.display = "none";
  }

  var exp_li = document.querySelectorAll(".collapse-able li > span");
  for (var i = 0; i < exp_li.length; i++) {
    exp_li[i].style.cursor = "pointer";
    exp_li[i].onclick = showUL;
  }

  clearTimeout(timeout);
}, 500);
}


function showUL() {
  const nextUL = this.nextElementSibling;
  if(nextUL.className?.indexOf('flex-item') && nextUL.style.display !== "flex")
    nextUL.style.display = "flex";
  else if (nextUL.style.display === "block" || nextUL.style.display === "flex") 
    nextUL.style.display = "none";
  else 
    nextUL.style.display = "block";
}
