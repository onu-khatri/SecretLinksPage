function expandCollapseBind() {
  const timeout = setTimeout(() => {
  var li_ul = document.querySelectorAll(".collapse-able li  ul");
  for (var i = 0; i < li_ul.length; i++) {
    li_ul[i].style.display = "none";
  }

  var exp_li = document.querySelectorAll(".collapse-able li > span");
  for (var i = 0; i < exp_li.length; i++) {
    exp_li[i].style.cursor = "pointer";
    exp_li[i].onclick = showul;
  }

  clearTimeout(timeout);
}, 500);
}


function showul() {
  nextul = this.nextElementSibling;
  if (nextul.style.display == "block") nextul.style.display = "none";
  else nextul.style.display = "block";
}
