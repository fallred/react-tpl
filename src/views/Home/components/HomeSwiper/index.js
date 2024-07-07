import {Swiper,Image} from 'antd-mobile';
import { useEffect } from 'react';
import './index.less';
function HomeSwiper({sliders,getSliders}){
    useEffect(()=>{
        if(sliders.length ===0 ){
            getSliders();
        }
    },[]);
    return (
        <Swiper autoplay={true} loop={true}>
            {
                sliders.map(slider=>(
                    <Swiper.Item key={slider._id}>
                        <Image src={slider.url} />
                    </Swiper.Item>
                ))
            }
        </Swiper>
    )
}
export default HomeSwiper;