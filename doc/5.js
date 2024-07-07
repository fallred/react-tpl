/**
immer是用于处理js中不可变状态更新的库
使用它，可以看起来是直接修改对象和数组的方式来编写返回可变的结果，
但实际上并没有修改原始数据
原理是通过代理来实成的，这些代理能够捕获所有的修改操作，并在结束返回
新的不可变对象，里面包含所有的修改

因为不可以数据就是可以尽可能的共享 老的数据，减少内存占用
 */
//https://img-blog.csdnimg.cn/20200531145035500.gif
const {produce} = require('immer');
const _ = require('lodash');
let state = {
    age:18,
    home:{
        province:'广东',
        city:'深圳'
    },
    person:{
        name:'张三'
    }
}
 const newState = produce(state,(draft)=>{
    draft.home.city = '广州'
}); 
console.log(newState.person === state.person);

/* const cloneState = _.cloneDeep(state);
cloneState.home.city = '广州' */
//console.log(cloneState)