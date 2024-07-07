import React,{useRef,useEffect} from 'react';
import HomeHeader from './components/HomeHeader';
import { connect } from 'react-redux';
import {DotLoading} from 'antd-mobile'
import actionCreators from '@/store/actionCreators/home';
import HomeSwiper from './components/HomeSwiper';
import LessonList from './components/LessonList';
import {withKeepAlive } from 'keepalive-react-component'
import {loadMore,downPullRefresh,throttle} from '@/utils';
import './index.less';
function Home(props) {
  const { setCurrentCategory, currentCategory,
    sliders, getSliders,
    lessons, getLessons,refreshLessons } = props;
  const homeContainerRef = useRef();
  const lessonListRef = useRef();
  useEffect(()=>{
    loadMore(homeContainerRef.current,getLessons);
    //实现下拉刷新的功能 1参数是home-container 2刷新的方法
    downPullRefresh(homeContainerRef.current,refreshLessons)
    //给容器添加滚动事件，当滚动事件发生的时候，执行lessonListRef.current方法
    //因为一般来说父先开始，后完成，子后开完成，在父亲完成的时候，子肯定 完成了，反而则不一样
    homeContainerRef.current.addEventListener('scroll',throttle(lessonListRef.current,30));
     homeContainerRef.current.addEventListener('scroll',()=>{
      //在滚动的时候获取向上卷去的高度，并保存到sessionStorage中
      sessionStorage.setItem('scrollTop',homeContainerRef.current.scrollTop);
    });
    //当此 Home面渲染成功后，获取保存的scrollTop值
    let scrollTop = sessionStorage.getItem('scrollTop');
    //如果有值的话
    if(scrollTop){
      //获取保存的向上卷去的高度
      homeContainerRef.current.scrollTop=Number(scrollTop);
      //重新调用lessonList中的forceUpdate方法，重新计算虚拟列表
      lessonListRef.current();
    } 
  },[]);
  return (
    <>
      <DotLoading/>
      <HomeHeader
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
        refreshLessons={refreshLessons}
      />
      <div className='home-container' ref={homeContainerRef}>
        <HomeSwiper sliders={sliders} getSliders={getSliders} />
        <LessonList
          lessons={lessons}
          getLessons={getLessons}
          homeContainerRef={homeContainerRef}
          ref={lessonListRef}
        />
      </div>
    </>
  )
}
//把当前的组件和仓库的状态连接在一起
//withKeepAlive(
export default connect(
  state => state.home,//从总状态中返回home状态分片，然后变成组件的属性对象
  actionCreators//action的创建者, 这个对象也会成为当前组件的属性对象
)(Home);
//connect表示把仓库中的状态和当前的组件连接在一起
//一个是读取仓库的状态，一个是调用方法修改仓库状态
//mapStateToProps = state=>state.home 返回值将会成为组件属性对象
//props={currentCategory:'all'}
//调用方法向仓库派发动作，修改仓库中的状态
//把actionCreators传入connect.
//connect 内部会帮我们绑定dispatch,帮我们派发action dispatch(action)
//派发以后会改变状态的状态，让页面重新刷新
//actionCreators也会成为前组件的属性对象，用来派发动作，修改状态
/**
 * home-container 557=667-(100/2)-(120/2)=667-110=557
 * swiper 160
 * lesson-list 1688 320*5+50++24+14=1600+50+38=1688
 * 320=标题+图片=45+250=295+25=320
 * 
 * 容器    557     1114
 * swiper  160     320
 * 每个课程高度 320 640
 * 标题高度 50 100
 * start =容器高度/每个课程高度
 * end
 */