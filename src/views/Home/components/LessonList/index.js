import React,{ useEffect,useReducer } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Card, Image, Skeleton, Button, NoticeBar } from 'antd-mobile';
import './index.less'
function LessonList({ lessons, getLessons ,homeContainerRef},lessonListRef) {
  //调用forceUpdate方法可以让此组件更新
  const [_,forceUpdate] = useReducer(x=>x+1,0);
  useEffect(() => {
    if (lessons.list.length === 0) {
      getLessons();
    }
    lessonListRef.current = forceUpdate;
  }, [])
  //获取根元素大小font-size: 37.5px;
  const remSize = parseFloat(document.documentElement.style.fontSize);
  //每个课程卡片高度真实高度 320  640*(remSize/75)
  const itemSize = (640/75)*remSize;
  //获取容器home-container的高度  window.innerHeight=667-110=557
  const homeContainerHeight = window.innerHeight - (100+120)*(remSize/75);
  const homeContainer = homeContainerRef.current;
  //const homeContainerHeight = homeContainerRef?.current?.clientHeight;
  //定义起始和结束索引
  let start=0,end=0;
  //获取容器向上卷去的高度，如果容器有值的话，实际卷曲的高度减去轮播图和标题的高度，
  //就是有意义的课程列表向上卷去的高度
  let scrollTop = homeContainer?Math.max((homeContainer.scrollTop-((320+100)*(remSize/75))),0):0;
  //用容器向上卷去的高度除以每个课程卡片的高度等于开始渲染的起始卡片的索引
  start = Math.floor(scrollTop/itemSize);
  //结束索引就是开始索引加上容器一页显示的课程条目的数量 数量=容器的高度除以每个条目的高度
  end = start + Math.ceil((homeContainerHeight/itemSize));
  start-=2;//起始索引减去2
  end = end+=2;//结束索引加上2
  start=start<0?0:start;//最小值为0
  end = end>lessons.list.length?lessons.list.length:end;//最大值为课程列表的长度
  //计算可视区域的课程列表
  const visibleList = lessons.list.map((lesson,index)=>({...lesson,index})).slice(start,end);
  //定义外面容器的样式 相对定位，高度为总条目的数量乘以每个条目的高度
  const lessonListStyle = {position:'relative',width:'100%',height:`${lessons.list.length*itemSize}px`};
  const itemStyle = {position:'absolute',top:0,left:0,width:'100%',height:itemSize,backgroundColor:'#EEE'};
  return (
    <section className="lesson-list">
      <h3><MenuOutlined />全部课程</h3>
      {
        visibleList.length > 0 ? (
          <div style={lessonListStyle}>
            {
              visibleList.map((lesson) => (
                <Link style={{...itemStyle,top:`${lesson.index*itemSize}px`}} key={lesson.id}
                  to={{ pathname: `/detail/${lesson.id}` }} state={lesson}>
                  <Card
                    headerStyle={{ display: 'flex', justifyContent: 'center' }}
                    title={lesson.title}
                  >
                    <Image src={lesson.poster} />
                  </Card>
                </Link>
              ))
            }
          </div>
        ) : (
          <>
            <Skeleton.Title animated />
            <Skeleton.Paragraph animated lineCount={5} />
          </>
        )
      }
      {
        lessons.hasMore ? (
          <Button
            type="primary"
            onClick={getLessons}
            loading={lessons.loading}
            block
          >加载更多</Button>
        ) : (<NoticeBar content="到底了" color='alert' />)
      }

    </section>
  )
}
export default React.forwardRef(LessonList);