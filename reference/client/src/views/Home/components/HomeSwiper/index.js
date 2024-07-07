import React, { useEffect } from "react";
import { Swiper,Image } from "antd-mobile";
import "./index.less";
function HomeSwiper(props) {
    useEffect(() => {
        if (props.sliders && props.sliders.length === 0 && props.getSliders) {
            props.getSliders();
        }
    }, []);
    return (
        <Swiper autoplay={true} loop={true}>
            {
                props.sliders.map((slider) => (
                    <Swiper.Item key={slider._id}>
                        <Image src={slider.url} />
                    </Swiper.Item>
                ))
            }
        </Swiper>
    );
}

export default HomeSwiper;
