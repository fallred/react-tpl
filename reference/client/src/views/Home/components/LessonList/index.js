import React, { useEffect, useReducer } from "react";
import { Image, Button, NoticeBar, Card, Skeleton } from "antd-mobile";
import { Link } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import "./index.less";

function LessonList(props,lessonListRef) {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  useEffect(() => {
    if (props.lessons.list.length == 0) {
      props.getLessons();
    }
    lessonListRef.current = forceUpdate;
  }, []);
  const remSize = parseFloat(document.documentElement.style.fontSize);
  const itemSize = (650 / 75) * remSize;
  const screenHeight = window.innerHeight - (222 / 75) * remSize;
  const homeContainer = props.homeContainerRef.current;
  let start = 0, end = 0;
  const scrollTop = homeContainer?Math.max(homeContainer.scrollTop - ((320 + 65) / 75) * remSize,0):0;
  start = Math.floor(scrollTop / itemSize);
  end = start + Math.floor(screenHeight / itemSize);
  start -= 2, end += 2;
  start = start < 0 ? 0 : start;
  end = end > props.lessons.list.length ? props.lessons.list.length : end;
  const visibleList = props.lessons.list.map((item, index) => ({ ...item, index })).slice(start, end);
  const style = { position: 'absolute', top: 0, left: 0, width: '100%', height: itemSize };
  const bottomTop = (props.lessons.list.length) * itemSize;
  return (
    <section className="lesson-list">
      <h2>
        <MenuOutlined /> 全部课程
      </h2>
      {visibleList.length > 0 ? (
        <div style={{ position: 'relative', width: '100%', height: `${props.lessons.list.length * itemSize}px` }}>
          {
            visibleList.map((lesson) => (
              <Link
                style={{ ...style, top: `${itemSize * lesson.index}px`,backgroundColor: '#EEE' }}
                key={lesson.id}
                to={{ pathname: `/detail/${lesson.id}` }}
                state={lesson}
              >
                <Card headerStyle={{ display: 'flex', justifyContent: 'center'}} title={lesson.title}>
                  <Image src={lesson.poster} />
                </Card>
              </Link>
            ))
          }
          {props.lessons.hasMore ? (
            <Button
              style={{ textAlign: "center",position: 'absolute', top: `${bottomTop}px` }}
              onClick={props.getLessons}
              loading={props.lessons.loading}
              type="primary"
              block
            >
              {props.lessons.loading ? "" : "加载更多"}
            </Button>
          ) : (
            <NoticeBar style={{width:'100%',position: 'absolute', top: `${bottomTop}px`}} content='到底了' color='alert' />
          )}
        </div>
      ) : (
        <>
          <Skeleton.Title animated />
          <Skeleton.Paragraph lineCount={5} animated />
        </>
      )}
    </section>
  );
}
export default React.forwardRef(LessonList);