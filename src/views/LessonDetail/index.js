import NavHeader from "@/components/NavHeader";
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Image, Card, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import './index.less';
import homeActionCreators from "@/store/actionCreators/home";
import cartActionCreators from "@/store/actionCreators/cart";
function LessonDetail(props) {
    const { getLesson } = props;
    //定义一个状态，用于保存当前的课程对象
    const [lesson, setLesson] = useState({});
    const { id } = useParams();
    //获取当前的路径对象
    const location = useLocation();
    useEffect(() => {
        //获取当前的路径对象中的状态
        let lesson = location.state;
        if (lesson) {
            setLesson(lesson);
        } else {
            (async function () {
                //调用接口获取此ID对应的课程详情对象
                let lesson = await getLesson(id);
                if (lesson) {
                    setLesson(lesson);
                }
            })()
        }
    }, []);
    const addCart = (lesson) => {
        props.addCartItem(lesson);
        //获取课程卡片的div容器
        let lessonImage = document.querySelector('.adm-image');
        //获取购物车小图标
        let cart = document.querySelector('.anticon.anticon-shopping-cart');
        //把课程卡片的div克隆一份
        let clonedLessonImage = lessonImage.cloneNode(true);
        //获取课程卡片的宽和高
        let { offsetWidth: lessonImageWidth, offsetHeight: lessonImageHeight } = lessonImage;//351 250
        //获取购物车图标的宽度和高度
        let { offsetWidth: cartWidth, offsetHeight: cartHeight } = cart;//25 25;
        let { left: lessonImageLeft, top: lessonImageTop } = lessonImage.getBoundingClientRect();
        let { left: cartLeft, top: cartTop } = cart.getBoundingClientRect();
        clonedLessonImage.style.cssText = `
            z-index:1000;
            opacity:0.8;
            position:fixed;
            width:${lessonImageWidth}px;
            height:${lessonImageHeight}px;
            top:${lessonImageTop}px;
            left:${lessonImageLeft}px;
            transition:all 2s;
        `;
        document.body.appendChild(clonedLessonImage);
        requestAnimationFrame(() => {
            clonedLessonImage.style.width='0px';
            clonedLessonImage.style.height='0px';
            clonedLessonImage.style.opacity='50';
            clonedLessonImage.style.left = cartLeft+(cartWidth/2)+'px';
            clonedLessonImage.style.top = cartTop+(cartHeight/2)+'px';
        });
    }
    return (
        <>
            <NavHeader>课程详情</NavHeader>
            <Card title={lesson.title} headerStyle={{ display: 'flex', justifyContent: 'center' }}>
                <Image src={lesson.poster} />
                <Button className="add-cart" onClick={() => addCart(lesson)}>加入购物车</Button>
            </Card>

        </>
    )
}
export default connect(
    state => state.home,
    {...homeActionCreators,...cartActionCreators})(LessonDetail);