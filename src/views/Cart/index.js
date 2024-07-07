import React, { useState } from 'react';
import { connect } from 'react-redux';
import actionCreators from '@/store/actionCreators/cart';
import NavHeader from '@/components/NavHeader';
import { Grid, List, Input, Checkbox, Space,Button } from 'antd-mobile';
function CartItems(props) {
    const { items,changeCartItemCount, changeCheckedCartItem } = props;
    const checkedValues = items.filter(item => item.checked).map(item => item.lesson.id);
    return (
        <Space direction="vertical" >
            <Checkbox
                style={{ marginLeft: '12px' }}
                indeterminate={checkedValues.length > 0 && checkedValues.length < items.length}
                checked={checkedValues.length>0&&checkedValues.length === items.length}
                onChange={
                    (checked) => {//获取全选按钮的选中状态
                        let newCheckedValues = [];
                        //如果是全选的话，让此newCheckedValues等于所有的课程ID的数组
                        if (checked) {
                            //如果想要全选 话，就把所有的条目的课程ID取现来变成数组
                            newCheckedValues = items.map(item => item.lesson.id);
                        }
                        //修改选中的课程条目
                        changeCheckedCartItem(newCheckedValues);
                    }
                }
            >
                全选
            </Checkbox>
            <Checkbox.Group
                value={checkedValues}//[1,2]
                onChange={(newCheckedValues) => {
                    changeCheckedCartItem(newCheckedValues);///同时派发给仓库，修改redux
                }}
            >
                <List>
                    {
                        items.map(item => (
                            <List.Item key={item.lesson.id}>
                                <Grid columns={12} gap={8}>
                                    <Grid.Item span={1}>
                                        <Checkbox value={item.lesson.id} />
                                    </Grid.Item>
                                    <Grid.Item span={6}>
                                        {item.lesson.title}
                                    </Grid.Item>
                                    <Grid.Item span={2}>
                                        {item.lesson.price}
                                    </Grid.Item>
                                    <Grid.Item span={3}>
                                        <Input
                                            value={item.count}
                                            onChange={(val) => changeCartItemCount(item.lesson.id, Number(val))}
                                        />
                                    </Grid.Item>
                                </Grid>
                            </List.Item>
                        ))
                    }
                </List>
            </Checkbox.Group>
        </Space>
    )
}
function Cart(props) {
    const {items,clearCartItems,settle } = props;
    //总数量 获取所有的选中的商品条目的总数量累加在一起
    const totalCount = items.filter(item=>item.checked).reduce(
        (totalCount,item)=>totalCount+item.count,0);
        console.log(items)
    //总金额 获取所有的选中的商品条目的数量乘以单价，然后累加
    const totalAmount = items.filter(item=>item.checked).reduce(
        (totalAmount,item)=>totalAmount+item.count*parseFloat(item.lesson.price.replace(/[^0-9\.]/g,'')),0);
    return (
        <div style={{ padding: '2px' }}>
            <NavHeader />
            <CartItems{...props} />
            <Grid columns={15} gap={8}>
                <Grid.Item span={3}>
                    <Button type="warning" size="small" onClick={clearCartItems}>清空</Button>
                </Grid.Item>
                <Grid.Item span={5}>
                    已选择{totalCount}商品
                </Grid.Item>
                <Grid.Item span={4}>
                    {totalAmount}元
                </Grid.Item>
                <Grid.Item span={3}>
                    <Button type="warning" size="small" onClick={settle}>结算</Button>
                </Grid.Item>
            </Grid>
        </div>
    )
}
export default connect(
    state => ({ items: state.cart }),
    actionCreators
)(Cart);