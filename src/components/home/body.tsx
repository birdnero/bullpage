import React, { ReactNode, useLayoutEffect, useRef } from "react";
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import * as bodyADD from "./bodyADD";
import { SliderPost } from "./sliderPostWithFlipTransition";
import { getState } from "../../store/store";
import ModelSlider from "./modelInfo/modelSlider";
import Preview from "./preview";
import img from "../../assets/WITCH_PHOTO.jpg"

export interface IdataModelPreview {
    prePhoto?: string
    name1: string
    name2?: string
    rating: number
    id: number
}

const elements: ReactNode[] = []
const data: IdataModelPreview[] = [{
    name1: "Олена",
    rating: 97,
    name2: "Кшик",
    prePhoto: img,
    id: 666,
}]

data.forEach((el, index, ) => {
    elements.push(
        <SwiperSlide key={index}>
            <SliderPost level={1} index={el.id} Idmodel={el.id} savePosition>
                <Preview {...el} />
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