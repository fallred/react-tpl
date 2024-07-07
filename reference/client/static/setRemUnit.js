let docEle = document.documentElement;
function setRemUnit() {
  docEle.style.fontSize = docEle.clientWidth / 10 + "px";
}
setRemUnit();
window.addEventListener("resize", setRemUnit);