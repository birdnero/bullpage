// елемент який відповідатиме за праивльну логіку при перевороті картки 
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { mainSwiperConfig } from "../bodyADD";
import Biography from "./biography";
import Gallery from "./gallery";
import AddInfo from "./addInfo/addInfo";



const ModelSlider: React.FC = () => {

    return <Swiper {...mainSwiperConfig}>
        <SwiperSlide>
                <Biography />
        </SwiperSlide>
        <SwiperSlide>
            <Gallery />
        </SwiperSlide>
        <SwiperSlide className="slider_container_style slider_container">
           <AddInfo />
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