import React from 'react';
import classnames from 'classnames';
import logo from '@/assets/images/logo.png';
import {BarsOutlined} from '@ant-design/icons';
import {Transition} from 'react-transition-group';
import './index.less';
//动画的持续时间1s
const duration = 1000;
//默认样式 当透明度发生变化的时候
const defaultStyle = {
    transition:`opacity ${duration}ms ease-in-out`,
}
//不同的状态下的样式
const transitionStyles = {
    entering:{opacity:1},//进入中 显示
    entered:{opacity:1},//进入后 显示
    exiting:{opacity:0},//离开中 不显示
    exited:{opacity:0}//离开后 不显示
}
function HomeHeader(props){
    const [isMenuVisible,setIsMenuVisible] = React.useState(false);
    const {currentCategory}=props;
    const setCurrentCategory = (event)=>{
        const {category} = event.target.dataset;
        //修改课程分类
        props.setCurrentCategory(category);
        //课程分类修改完后会重新刷新课程列表
        props.refreshLessons();
    }
    return (
        <header className='home-header'>
            <div className='logo-header'>
                <img src={logo}/>
                <BarsOutlined onClick={()=>setIsMenuVisible(!isMenuVisible)}/>
            </div>
            <Transition in={isMenuVisible} timeout={duration}>
                {
                    (state)=>(
                        <ul 
                        className='category' 
                        style={{
                            ...defaultStyle,
                            ...transitionStyles[state]
                        }}
                        onClick={setCurrentCategory}
                      >
                            <li className={classnames({active:currentCategory==='all'})} data-category="all">全部课程</li>
                            <li className={classnames({active:currentCategory==='react'})} data-category="react">React课程</li>
                            <li className={classnames({active:currentCategory==='vue'})} data-category="vue">Vue课程</li>
                        </ul>
                    )
                }
            </Transition>
        </header>
    )
}
export default HomeHeader;