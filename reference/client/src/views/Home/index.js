import React, { useRef, useEffect } from "react";
import actionCreators from '@/store/actions/home';
import HomeHeader from './components/HomeHeader';
import { connect } from 'react-redux';
import HomeSwiper from "./components/HomeSwiper";
import LessonList from "./components/LessonList";
import { loadMore, downRefresh, throttle } from "@/utils";
import { DotLoading } from 'antd-mobile';
import './index.less';
function Home(props) {
    const homeContainerRef = useRef(null);
    const lessonListRef = useRef(null);
    useEffect(() => {
        loadMore(homeContainerRef.current, props.getLessons);
        downRefresh(homeContainerRef.current, props.refreshLessons);
        homeContainerRef.current.addEventListener("scroll", throttle(lessonListRef.current, 13));
        homeContainerRef.current.addEventListener('scroll', () => {
            sessionStorage.setItem('scrollTop', homeContainerRef.current.scrollTop);
        });
        let scrollTop = sessionStorage.getItem('scrollTop');
        if(scrollTop){
            homeContainerRef.current.scrollTop = +scrollTop;
            lessonListRef.current();
        }
    }, []);
    return (
        <>
            <DotLoading />
            <HomeHeader
                currentCategory={props.currentCategory}
                setCurrentCategory={props.setCurrentCategory}
                refreshLessons={props.refreshLessons}
            />
            <div className="home-container" ref={homeContainerRef}>
                <HomeSwiper sliders={props.sliders} getSliders={props.getSliders} />
                <LessonList
                    container={homeContainerRef}
                    lessons={props.lessons}
                    getLessons={props.getLessons}
                    ref={lessonListRef}
                    homeContainerRef={homeContainerRef}
                />
            </div>
        </>
    )
}
let mapStateToProps = (state) => state.home;
export default connect(
    mapStateToProps,
    actionCreators
)(Home);