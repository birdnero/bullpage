// елемент який відповідатиме за праивльну логіку при перевороті картки 
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { mainSwiperConfig } from "../bodyADD";
import Biography from "./biography";





const ModelSlider: React.FC = () => {
    

    return <Swiper {...mainSwiperConfig}>
        <SwiperSlide>
                <Biography />
        </SwiperSlide>
        <SwiperSlide className="slider_container_style slider_container">
            #2
        </SwiperSlide>
        <SwiperSlide className="slider_container_style slider_container">
            #3
        </SwiperSlide>
        <SwiperSlide className="slider_container_style slider_container">
            #4
        </SwiperSlide>
        <SwiperSlide className="slider_container_style slider_container">
            #5
        </SwiperSlide>
    </Swiper>
}

export default ModelSlider