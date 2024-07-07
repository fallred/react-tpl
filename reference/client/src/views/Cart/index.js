import React, { useState,useRef } from "react";
import { connect } from "react-redux";
import { Button, Input, SwipeAction, Modal, Grid, Space, Checkbox, List,Dialog } from "antd-mobile";
import NavHeader from "@/components/NavHeader";
import actions from "@/store/actions/cart";
import './index.less';
function Cart(props) {
    const confirmSettle = () => {
        Modal.confirm({
            content: '请问你是否要结算',
            onConfirm: () => {
                props.settle();
            },
        })
    };
    let totalCount = props.cart
        .filter((item) => item.checked)
        .reduce((total, item) => total + item.count, 0);
    let totalPrice = props.cart
        .filter((item) => item.checked)
        .reduce(
            (total, item) =>
                total + parseFloat(item.lesson.price.replace(/[^0-9\.]/g, "")) * item.count,
            0
        );
    return (
        <div style={{ padding: '2px' }}>
            <NavHeader>购物车</NavHeader>
            <CarrItems cart={props.cart} changeCartItemCount={props.changeCartItemCount} removeCartItem={props.removeCartItem} changeCheckedCartItems={props.changeCheckedCartItems} />
            <Grid columns={15} gap={8}>
                <Grid.Item span={3}>
                    <Button
                        type="warning"
                        size="small"
                        onClick={props.clearCartItems}
                    >清空</Button>
                </Grid.Item>
                <Grid.Item span={5}>
                    已选择{totalCount}件商品
                </Grid.Item>
                <Grid.Item span={4}>¥{totalPrice}元</Grid.Item>
                <Grid.Item span={3}>
                    <Button type="primary" size="small" onClick={confirmSettle}>结算</Button>
                </Grid.Item>
            </Grid>
        </div>
    );
}
const CarrItems = ({ cart, changeCartItemCount, removeCartItem, changeCheckedCartItems }) => {
    const [value, setValue] = useState([])
    const swipeActionRef = useRef(null)
    return (
        <Space direction='vertical'>
            <Checkbox
                indeterminate={value.length > 0 && value.length < cart.length}
                checked={value.length === cart.length}
                onChange={checked => {
                    let newValue;
                    if (checked) {
                        newValue = cart.map(item => item.lesson.id);
                    } else {
                        newValue = [];
                    }
                    setValue(newValue)
                    changeCheckedCartItems(newValue);
                }}
            >全选</Checkbox>
            <Checkbox.Group
                value={value}
                onChange={v => {
                    setValue(v)
                    changeCheckedCartItems(v);
                }}
            >
                <Space direction='vertical'>
                    <List>
                        {cart.map(item => (
                                <List.Item>
                                    <SwipeAction 
                                     ref={swipeActionRef}
                                     closeOnAction={false}
                                     closeOnTouchOutside={false}
                                      rightActions={[
                                        {
                                            key: 'remove',
                                            text: '删除',
                                            color: 'red',
                                            onClick: async (value) => {
                                                console.log('value',value)
                                                const result = await Dialog.confirm({
                                                    content: '确定要删除吗？',
                                                })
                                                if(result){
                                                    removeCartItem(item.lesson.id);
                                                }
                                                swipeActionRef.current?.close()
                                            },
                                        }
                                    ]}>
                                    <Grid columns={12} gap={8}>
                                        <Grid.Item span={1}>
                                            <Checkbox value={item.lesson.id} checked={item.checked}></Checkbox>
                                        </Grid.Item>
                                        <Grid.Item span={6}>
                                            {item.lesson.title}
                                        </Grid.Item>
                                        <Grid.Item span={2}>
                                            ¥{item.lesson.price}
                                        </Grid.Item>
                                        <Grid.Item span={3}>
                                            <Input
                                                value={item.count}
                                                onChange={val => {
                                                    changeCartItemCount(item.lesson.id, Number(val))
                                                }}
                                            />
                                        </Grid.Item>
                                    </Grid>
                                    </SwipeAction>
                                </List.Item>
                        ))}
                    </List>
                </Space>
            </Checkbox.Group>
        </Space>
    )
}
let mapStateToProps = (state) => state;
export default connect(mapStateToProps, actions)(Cart);
