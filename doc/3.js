
/**
 * 编写一个节流的函数
 * @param {*} func 真正要执行的函数
 * @param {*} delay 间隔的时间
 */
function throttle(func,times){
    let counter = 0;
    return function(){
        if((++counter)>=times){
            func();
            counter = 0;
        }
    }
}

function askMoney(){
    console.log(`要5块钱`)
}
const throttledAskMoney = throttle(askMoney,3);
throttledAskMoney();//早饭
throttledAskMoney();//午饭
throttledAskMoney();//晚饭
throttledAskMoney();
throttledAskMoney();
throttledAskMoney();