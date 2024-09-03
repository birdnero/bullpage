import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import Icon from "../../../assets/modified_icons/icon";
import { create_post, post } from "../../../assets/modified_icons/ICONS";
import styles from "./create_post.module.scss"
import "../home.scss"
import { useNavigate } from "react-router-dom";


const CreatePost: React.FC = () => {
    const navigate = useNavigate()
    const [arrows, setArrows] = useState([false, true, 1])

    useEffect(() => {
        switch (arrows[3]) {
            case 1:
                setArrows([false, true, 1])
                break;

            case 2:
                setArrows([true, true, 1])
                break;

            case 3:
                setArrows([true, false, 3])
                break;

            default:
                break;
        }
    }, [arrows])

    return <div className="body_container">
        <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={false}
            slidesPerView={'auto'}
            coverflowEffect={{
                rotate: 30,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
            }}
            allowTouchMove={false}
            simulateTouch={false}
            noSwiping={true}
            mousewheel={false}
            pagination={{ el: '.swiper-pagination', clickable: true }}
            navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="swiper_container"
        >
            <SwiperSlide>
                <div className="slider_container">
                    <div className={styles.flex_100_center}>
                        <div className={styles.p1_container}>
                            <div onClick={() => navigate("/create_post")} className={styles.p1_halfs}>
                                <Icon path={create_post} className={"home_icon " + styles.p1_icon} />
                                <div className="logo_text">+ new</div>
                            </div>
                            <div onClick={() => navigate("/my_posts")} className={styles.p1_halfs}>
                                <Icon path={post} className={"home_icon " + styles.p1_icon} />
                                <div className="logo_text">My posts</div>
                            </div>
                        </div>
                    </div>
                </div>
            </SwiperSlide>



            {/* <div className="slider-controler">
                {arrows[0] ? <div className="swiper-button-prev slider-arrow">
                    <Icon path={left_arrow} className={"home_icon"} />
                </div> : <div></div>}
                {arrows[1] ? <div className="swiper-button-next slider-arrow">
                    <Icon path={right_arrow} className={"home_icon"} />
                </div> : <div></div>}
            </div> */}
        </Swiper>
    </div>
}

export default CreatePost