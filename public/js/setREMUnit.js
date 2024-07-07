let docEle = document.documentElement;
function setREMUnit() {
    //获取屏幕宽度的10分之一设置为根节点的字体大小 1rem=clientWidth/10
    docEle.style.fontSize = docEle.clientWidth / 10 + 'px';
}
setREMUnit();
window.addEventListener('resize', setREMUnit)