import React, { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import * as bodyADD from "./bodyADD";
import Loading from "../loading/loading";
import { setState } from "../../store/store";

interface ISlidePost {
    children?: React.ReactNode,
    index?: number,
    Idmodel?: number,
    level: number,
    savePosition?: boolean
}


function gradientCreator() {
    const gradients = [
        "#f40076, #df98fa",
        "#f06966, #fad6a6",
        "#ff0076, #590fb7",
        "#9055ff, #12e2da",
        "#d6ff7f, #00b3cc",
        "#e233ff, #ff6b00",
        "#df98fa, #9055ff",
        "#ed7b84, #9055ff",
        "#f40076, #342711",
        "#cb5eee, #4be1ec",
        "#fa7cbb, #f14658",
        "#737dfe, #ffcac9",
    ]

    const choice = Math.floor(Math.random() * gradients.length)
    return gradients[choice]
}

export const SliderPost: React.FC<ISlidePost> = ({ index, Idmodel, level, children, savePosition, }) => {
    const [slide, setSlide] = useState(1)
    const { setSwiperLevelRedux, setModelIdRedux, setSlideNowRedux, setGradientNowRedux } = setState()
    


    return <Swiper {...bodyADD.verticalInnerFLipSwiperConfig} key={index} className="slider_container" >
        <SwiperSlide
            style={{ visibility: slide == 1 ? "visible" : "hidden" }}
            onClick={() => {
                const gradient = `linear-gradient(to right, ${gradientCreator()})`
                    setGradientNowRedux(gradient)
                setSlide(2)
                if (Idmodel) {
                    setModelIdRedux(Idmodel)
                }
                if (level != null) {
                    setTimeout(() => {
                        setSwiperLevelRedux({ level: level }) 
                    }, 1000);
                }
                if (savePosition && index != null) {
                    setSlideNowRedux(index)
                }
            }}
            className="swipe-next-01 slider_container_style">
            {children}
        </SwiperSlide>
        <SwiperSlide
            style={{ visibility: slide == 2 ? "visible" : "hidden" }}
            className="slider_container_style">
            <Loading />
        </SwiperSlide>
    </Swiper >
}





{/* ( <div className="slider_content">
                <div className="slider_img">
                    <img style={{ width: "100%", height: "100%", borderRadius: "6dvh" }} src={img} alt="" />
                </div>
                <div className="slider_name">
                    {name}
                </div>
            </div>

            <div className="slider_like">
                <Icon onClick={() => setSaved(e => !e)} path={saved ? liked : like} style={{ height: "5dvh" }} className="home_icon" />
            </div>) */}