import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Card, Image,Button } from "antd-mobile";
import NavHeader from "@/components/NavHeader";
import { getLesson } from "@/api/home";
import actions from '@/store/actions/cart';
import { useLocation, useParams } from 'react-router-dom';
import './index.less';
function Detail(props) {
    const location = useLocation();
    const params = useParams();
    let [lesson, setLesson] = useState({});
    useEffect(() => {
        (async () => {
            let lesson = location.state;
            if (!lesson) {
                let result = await getLesson(params.id);
                if (result.success) lesson = result.data;
            }
            setLesson(lesson);
        })();
    }, []);
    const addCartItem = (lesson) => {
        let lessonImage = document.querySelector('.adm-image');
        let cart = document.querySelector('.anticon.anticon-shopping-cart');
        let clonedVideo = lessonImage.cloneNode(true);
        let lessonImageWith = lessonImage.offsetWidth;
        let lessonImageHeight = lessonImage.offsetHeight;
        let cartWith = cart.offsetWidth;
        let cartHeight = cart.offsetHeight;
        let lessonImageLeft = lessonImage.getBoundingClientRect().left;
        let lessonImageTop = lessonImage.getBoundingClientRect().top;
        let cartRight = cart.getBoundingClientRect().right;
        let cartBottom = cart.getBoundingClientRect().bottom;
        clonedVideo.style.cssText = `
            z-index: 1000;
            opacity:0.8;
            position:fixed;
            width:${lessonImageWith}px;
            height:${lessonImageHeight}px;
            top:${lessonImageTop}px;
            left:${lessonImageLeft}px;
            transition: all 2s ease-in-out;
        `;
        document.body.appendChild(clonedVideo);
        setTimeout(function () {
            clonedVideo.style.left = (cartRight - (cartWith / 2)) + 'px';
            clonedVideo.style.top = (cartBottom - (cartHeight / 2)) + 'px';
            clonedVideo.style.width = `0px`;
            clonedVideo.style.height = `0px`;
            clonedVideo.style.opacity = '50';
        }, 0);
        props.addCartItem(lesson);
    }
    return (
        <>
            <NavHeader>课程详情</NavHeader>
            <Card headerStyle={{ display: 'flex', justifyContent: 'center' }} title={lesson.title} id="lesson-card">
                <Image src={lesson.poster} />
            </Card>
            <Button
                className="add-cart"
                onClick={() => addCartItem(lesson)}
            >加入购物车</Button>
        </>
    );
}
let mapStateToProps = (state) => state;
export default connect(
      mapStateToProps,
  actions
)(Detail);