import * as actionTypes from '@/store/action-types';
//购物车的基础数据是一个商品的数组
const initialState = [];
export default function (state = initialState, action) {
    switch (action.type) {
        //添加某个商品到购物车
        case actionTypes.ADD_CART_ITEM: {//{type:'ADD_CART_ITEM',payload:{id:2,title:'Vue'}} 
            //判断此商品是否已经存在于购物车
            let oldIndex = state.findIndex(item => item.lesson.id === action.payload.id);
            if (oldIndex === -1) {
                //如果说购物车里原来没有此商品，则向购物车中添加一个新的条目
                state.push({
                    checked: false,//是否选中
                    count: 1,//数量
                    lesson: action.payload//课程
                });
            } else {
                //如果已经存在此商品了，则数量+1
                state[oldIndex].count += 1;
            }
            return state;
        }
        case actionTypes.REMOVE_CART_ITEM: {//{type:'REMOVE_CART_ITEM',payload:1} 
            //查找此商品ID在购物车数组中的索引
            let oldIndex = state.findIndex(item => item.id === action.payload);
            //在索引为removeIndex的地方删除一个商品
            state.splice(oldIndex, 1);
            return [...state];
        }
        case actionTypes.CHANGE_CART_ITEM_COUNT: {//{type:'CHANGE_CART_ITEM_COUNT',payload:{id:1,count:5}}
            //{payload:{id,count}} 
            let oldIndex = state.findIndex(item => item.lesson.id === action.payload.id);
            state[oldIndex].count = action.payload.count;
            return [...state];
        }
        case actionTypes.CLEAR_CART_ITEMS: {//{type:'CLEAR_CART_ITEMS'}
            state.length = 0;
            return [...state];
        }
        case actionTypes.CHANGE_CHECKED_CART_ITEM: {//{type:'CHANGE_CHECKED_CART_ITEM',payload:[1]}
            //需要将要选中的ID数组
            let checkedIds = action.payload;
            //遍历购物车中的每一个条目
            state.forEach(item=>{
                //判断选中的ID数组是否包含此课程的ID
                if(checkedIds.includes(item.lesson.id)){
                    item.checked =true;
                }else{
                    item.checked = false;
                }
            });
            return [...state];
        }
        case actionTypes.SETTLE: {//{type:'SETTLE'}
            //结算的时候要在购物车中删除选中的条目，没选中的留下
            state=state.filter(item=>!item.checked);
            return [...state];
        }
        default:
            return state;
    }
}
/**
//向购物车中添加一个商品
export const ADD_CART_ITEM = 'ADD_CART_ITEM';
//从购物车中删除一个商品
export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';
//清空购物车
export const CLEAR_CART_ITEMS = 'CLEAR_CART_ITEMS';
//修改购物车某个商品的数量
export const CHANGE_CART_ITEM_COUNT = 'CHANGE_CART_ITEM_COUNT';
//选中或取消选中某个商品
export const CHANGE_CHECKED_CART_ITEM = 'CHANGE_CHECKED_CART_ITEM';
//结算
export const SETTLE = 'SETTLE';
 */