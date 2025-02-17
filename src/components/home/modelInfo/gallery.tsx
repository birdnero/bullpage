import React, { ReactNode, useEffect, useRef, useState } from "react";
import * as bodyADD from "../bodyADD";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import css from "../../css/gallery.module.scss"

import me1 from "../../../assets/me2.jpg"
import me3 from "../../../assets/me3.jpg"
import me4 from "../../../assets/me4.jpg"
import { getState } from "../../../store/store";

interface galleryFetchInfoType {
    photo: string,
    description: string,
}



const Gallery: React.FC = () => {
    const [slide, setSlide] = useState(0)
    const [info, setInfo] = useState<ReactNode>(<SwiperSlide></SwiperSlide>)
    const swiperRef = useRef<SwiperRef | null>(null);
    const gradient = getState(e => e.getGradientNowRedux)

    useEffect(() => {
        const FAKE_DATA: galleryFetchInfoType[] = [
            { description: "asdf", photo: me1 },
            { description: "erwgasdf khg lkfguh lhfufb kgifihb jkbigigio", photo: me3 },
            { description: "jhasdf", photo: me4 },
            { description: "654asdf", photo: "" },
        ]
        let nodes: ReactNode[] = []
        FAKE_DATA.forEach((data, index,) => {

            nodes.push(
                <SwiperSlide
                    key={index}
                    style={{
                        visibility: slide == index ? "visible" : "hidden"
                    }}
                    onClick={() => {
                        setTimeout(() => {
                            const newSlide = (index + 1) % FAKE_DATA.length
                            setSlide(newSlide)
                            swiperRef.current?.swiper.slideNext()
                        }, 300)
                    }}
                    className={css.slider_container_style}>
                    <div className={css.container}>
                        <img className={css.photo} src={data.photo} />
                        <div className={css.description}>{data.description}</div>
                        <div className={css.prokladka}>
                            
                            <div className={css.photoBorder1} style={{
                                borderImage: gradient + " 1"
                            }} />
                            <div className={css.photoBorder2} style={{
                                borderImage: gradient + " 1"
                            }} />
                            <div className={css.photoBorder3} style={{
                                borderImage: gradient + " 1"
                            }} />
                        </div>
                    </div>
                </SwiperSlide>)
        })
        setInfo(nodes)
    }, [slide])

    return <>
        <Swiper
            loop
            ref={swiperRef}
            {...bodyADD.verticalInnerFLipSwiperConfig}
            allowTouchMove
            className={css.slider_container}>
            {info}
        </Swiper>
    </>
}

export default Gallery
