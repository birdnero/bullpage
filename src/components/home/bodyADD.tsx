import React from "react";
import { EffectCoverflow, EffectFlip, Navigation, Pagination } from "swiper/modules";
import { SwiperProps } from "swiper/react";



export const mainSwiperConfig: SwiperProps = {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: false,
    loop: true,
    slidesPerView: 'auto',
    coverflowEffect: {
        rotate: 30,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
    },
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
    },
    modules: [EffectCoverflow, Pagination, Navigation],
    className: "swiper_container",
}


export const verticalInnerFLipSwiperConfig: SwiperProps = {
    effect: 'flip',
    allowTouchMove: false,
    grabCursor: false,
    direction: "vertical",
    navigation: {
        prevEl: '.swipe-prev-01',
        nextEl: '.swipe-next-01',
    },
    modules: [EffectFlip, Navigation]
}

////////////////////////////////////////////////////////////////////////////////////////////?/

const onTouchEndSliderBtn = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target = e.currentTarget as HTMLElement
    target.click()
}
export const SliderControler: React.FC = () => {
    return <div className="slider-controler">
        <div className="swiper-button-prev" onTouchEnd={onTouchEndSliderBtn} />
        <div className="swiper-button-next" onTouchEnd={onTouchEndSliderBtn} />
    </div>
}