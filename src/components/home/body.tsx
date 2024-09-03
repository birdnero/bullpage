import React, { ReactNode, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import img from "../../assets/picture.svg"
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import Icon from "../../assets/modified_icons/icon";
import { left_arrow, like, liked, right_arrow } from "../../assets/modified_icons/ICONS";


interface ISlidePost {
    img: string,
    name: string,
    key: number
}

const SliderPost: React.FC<ISlidePost> = ({ img, name, key }) => {

    const [saved, setSaved] = useState(false)


    return <div key={key} className="slider_container">
        <div className="slider_content">
            <div className="slider_img">
                <img style={{ width: "100%", height: "100%", borderRadius: "6dvh" }} src={img} alt="" />
            </div>
            <div className="slider_name">
                {name}
            </div>
        </div>

        <div className="slider_like">
            <Icon onClick={()=>setSaved(e=>!e)} path={saved ? liked : like} style={{ height: "5dvh" }} className="home_icon" />
        </div>
    </div>
}
const elements: ReactNode[] = []
const data = [{ img: img, name: "it's an image" }, { img: img, name: "it's an image" }, ]

data.forEach((el, index) => elements.push(<SwiperSlide key={index}>

    <SliderPost key={(Math.round(Math.random()) * 1000)} img={el.img} name={el.name} />
</SwiperSlide>))


const Body: React.FC = () => {
    return <div className="body_container">
        <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={false}
            loop={true}
            slidesPerView={'auto'}
            coverflowEffect={{
                rotate: 30,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
            }}
            pagination={{ el: '.swiper-pagination', clickable: true }}
            navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="swiper_container"
        >

            {elements}


            <div className="slider-controler">
                <div className="swiper-button-prev slider-arrow">
                    <Icon path={left_arrow} className="slider-icon" />
                </div>
                <div className="swiper-button-next slider-arrow">
                    <Icon path={right_arrow} className="slider-icon" />
                </div>
            </div>
        </Swiper>
    </div>
}
export default Body