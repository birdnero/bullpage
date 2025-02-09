import React, { ReactNode, useLayoutEffect, useRef } from "react";
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import * as bodyADD from "./bodyADD";
import { SliderPost } from "./sliderPostWithFlipTransition";
import { getState } from "../../store/store";
import ModelSlider from "./modelInfo/modelSlider";


const elements: ReactNode[] = []
const data = ["#1111111111", "#22222222222222", "#333333333333333"]

data.forEach((el, index, ) => {
    elements.push(
        <SwiperSlide key={index}>
            <SliderPost level={1} index={index} Idmodel={1} savePosition>
                {el}
            </SliderPost>
        </SwiperSlide>)
})




const Body: React.FC = () => {
    const { level } = getState(e => e.getSwiperLevelRedux)
    const slideNow = getState(e => e.getSlideNowRedux)
    const swiperRef = useRef<SwiperRef | null>(null);

    
    useLayoutEffect(()=>{
        if(level == 0 && swiperRef.current){
            swiperRef.current.swiper.slideTo(slideNow)
        }
    }, [level])

    return <div className="body_container">
        <Swiper ref={swiperRef} {...bodyADD.mainSwiperConfig}>
            {level == 0 ? elements : <ModelSlider />}
            <bodyADD.SliderControler />
        </Swiper>
    </div>
}
export default Body