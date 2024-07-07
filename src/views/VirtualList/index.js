import {useEffect, useRef,useState} from 'react';
import './index.less'
function VirtualList(){
    let items = [1,2,3,4,5,6];
    const containerRef= useRef();
    const [_,setState]=useState({});
    useEffect(()=>{
        containerRef.current.addEventListener('scroll',()=>{
            setState({});
        });
    },[]);
    let start=0,end=3;
    if(containerRef.current){
        let container = containerRef.current;
        start = Math.floor(container.scrollTop/50);//1
        end  = start + 3;//4
    }
    start = start-2<0?0:start-2;
    end = end+2>=items.length?items.length:end+2;
    let visibleItems = items.map((_,index)=>({index})).slice(start,end);
    return (
        <div className="container" ref={containerRef}>
            <ul className="content" style={{height:items.length*50,width:'100%'}}>
                {
                    visibleItems.map(item=>(
                        <li className="item" key={item} 
                        style={{position:'absolute',width:'100%',top:`${item.index*50}px`}}>
                            item:{item.index+1}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
export default VirtualList;