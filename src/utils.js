function loadMore(domElement, callback) {
    const _loadMore = () => {
        console.log('_loadMore')
        //获取元素的可视区域高度 557px
        let clientHeight = domElement.clientHeight;
        //获取元素向上滚动的高度
        let scrollTop = domElement.scrollTop;
        //获取元素内容的高度
        let scrollHeight = domElement.scrollHeight;
        //如果容器高度加上向上卷去的高度大于等于内容高度的话
        if (clientHeight + scrollTop + 10 >= scrollHeight) {
            callback();
        }
    }
    //给DOM元素绑定滚动事件
    domElement.addEventListener('scroll', debounce(_loadMore, 300));
}
//debounce(关门，等待的时间)
function debounce(fn, wait) {
    let timer = null;
    return function () {
        //如果存在上一个定时器，则取消上一个定时器,再开启一个新的定时器
        if (timer) clearTimeout(timer);
        //在滚动过程中，此fn函数不会立刻执行，而是等定时器到期了再会执行
        timer = setTimeout(fn, wait);
    }
}
/**
 * 实现下拉刷新
 * @param {*} domElement 元素
 * @param {*} callback 回调 等回弹到最初始位置时执行callback回调函数
 */
function downPullRefresh(domElement, callback) {
    //当按下的时候起始Y坐标
    let startY;
    //向下拉的距离
    let distance;
    //100px iphone6 50px
    let originTop = domElement.offsetTop;
    //起始的top值 开始拉动的时候的top值
    let startTop;
    
    //给元素帮定事件touchstart touchmove touchend
    // 触摸开始，触摸移动中 触摸结束
    domElement.addEventListener('touchstart', (event) => {
        //对原touchMove方法进行节流，每32ms执行一次计算一次就可以了
        const touchMove=throttle(_touchMove,32);
        //只在在没有滚动的时候才会可以下拉
        if(domElement.scrollTop==0){
            //获取按下的触摸点git 的距离文档顶部的纵坐标
            startY = event.touches[0].pageY;
            //获取开始移动的之前的top值
            startTop = domElement.offsetTop;
            domElement.addEventListener('touchmove', touchMove);
            domElement.addEventListener('touchend', touchEnd);
        }
        function _touchMove(event) {
            console.log('touchMove');
            //拉动到当前的位置的触摸点距离文档顶部的纵坐标
            let currentY = event.touches[0].pageY;
            //如果最新的Y值大于起始的Y值，说明是下拉
            if(currentY>startY){
                //用最新的y坐标减去开始的Y价值就是移动的距离
                distance = currentY - startY;
                domElement.style.top = (startTop + distance) + 'px'
            }else{
                domElement.removeEventListener('touchmove', touchMove);
                domElement.removeEventListener('touchend', touchEnd);
            }
        }
        function touchEnd(event) {
            //在停止移动的时候移除掉两个监听函数
            domElement.removeEventListener('touchmove', touchMove);
            domElement.removeEventListener('touchend', touchEnd);
            //如果说移动的距离大于30像素的话，则调用callback执行回调
            if (distance > 30) {
                callback();
            }
            function step() {
                //获取最新的top值
                let currentTop = domElement.offsetTop;
                //如果最新的top值减去最原始的top值的话
                if (currentTop - originTop >= 1) {//说明距离还大于等于1像素
                    domElement.style.top = (currentTop - 1) + 'px';
                    //减去1之后可能还是要移动的距离，再次调度step方法
                    requestAnimationFrame(step);
                } else {//如果说剩下的距离已经小于1像素了
                    //把top值还原始最原始的位置 
                    domElement.style.top = originTop + 'px';
                }
            }
            requestAnimationFrame(step);
        }
    });
}
/**
 * 节流函数
 * @param {*} func 函数
 * @param {*} interval 执行间隔的时间
 */
export function throttle(func,interval){
    //其实指是上次执行的时间
    let prev = Date.now();
    return function(){
        const context = this;//缓存this指针 
        const args = arguments;//缓存参数列表
        const now = Date.now();//获取最新的时间戳
        //判断当前的时间戳减去上一次执行的时间戳是不是大于等于间隔的时间
        if(now - prev >= interval){
            //如果距离 上次执行已经超过了interval时间了，则执行func函数
            func.apply(context,args);
            //把prev更新为当前的时间
            prev = now;
        }
    }
}
export {
    loadMore,
    downPullRefresh
}
//offsetLeft 和 offsetTop 是 DOM 元素的两个属性，
//它们分别表示元素左边缘（offsetLeft）和上边缘（offsetTop）相对于其offsetParent的距离
//offsetParen 最近的有定位属性的父级元素 fixed absolute relative

//当touchstart事件触发时，它会提供一个包含触摸点信息的TouchEvent对象。
//此对象包含一些有关触摸点的重要属性，如以下几个触摸列表
//touches：一个包含当前在屏幕上的所有触摸点的列表
//每个触摸点都由一个Touch对象表示，其中包含有关触摸点的信息，如
//pageX和pageY：相对于整个文档的触摸点的X和Y坐标

//刷新频率1s是60帧 1000/60=16.6ms */
//有些浏览器刷新频率120帧 1000/120=8.3ms绘制一次

/*  $timer=setInterval(()=>{
     //获取最新的top值
     let currentTop = domElement.offsetTop;
     //如果最新的top值减去最原始的top值的话
     if(currentTop-originTop>=1){//说明距离还大于等于1像素
         domElement.style.top = (currentTop-1)+'px';
     }else{//如果说剩下的距离已经小于1像素了
         clearInterval($timer);//清除掉定时器
         //把top值还原始最原始的位置 
         domElement.style.top = originTop+'px';
     }
 },16.6);//刷新频率1s是60帧 1000/60=16.6ms */