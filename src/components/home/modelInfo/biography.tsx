import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import * as bodyADD from "../bodyADD";
import { getState, setState } from "../../../store/store";
import Loading from "../../loading/loading";
import css from "../../css/biography.module.scss"


import PHOTO_TO_CHANGE from "../../../assets/WITCH_PHOTO.jpg"//!
import PHOTO_TO_DELETE1 from "../../../assets/ball.jpeg"//!


interface biographyFetchInfoType {
    photo?: string,     //*
    name1: string,      //*
    name2?: string,     //*
    name3?: string,     //*
    funFact?: string,
    smthElse?: string,
    tag?: string[],       //*
    id: number,         //*
    rating: number,     //*
    age?: number,       //*
    birthday?: string,
    biography?: string,
}

export const RatingColorDefiner = (rating: number): string =>
    "rating-" +
    (rating < 20 ?
        1 : (rating < 40 ?
            2 : (rating < 60 ?
                3 : (rating < 80 ?
                    4 : (rating < 95 ?
                        5 : 95)
                ))))

const AgePrefixDefiner = (age: number | null | undefined): string => {
    let agePrefix = "ро"
    if (age == null || age == undefined) {
        return ""
    }
    const end = age % 10
    if (age <= 10) {
        agePrefix += "ч"
    }
    if (age == 1) {
        return agePrefix + "ок"
    }
    if (end == 1 && age > 20) {
        return "рік"
    }
    if (end > 1 && end < 5 && (age > 20 || age < 10)) {
        return agePrefix + "ки"
    } else {
        return agePrefix + "ків"
    }
}




export const TagCreator = (tags: string[] | undefined, gradient: string): ReactNode[] => {
    if (tags != undefined) {
        let elements: ReactNode[] = []
        tags.forEach(el => {
            elements.push(<div key={Math.round(Math.random() * 100)} style={{
                background: gradient
            }}>
                {" #" + el}&nbsp;
            </div>)
        })
        return elements
    }
    return []
}

const Biography: React.FC = () => {
    const [slide, setSlide] = useState(1)
    const { setSwiperLevelRedux, setHotStripRedux } = setState()
    const [info, setInfo] = useState<ReactNode>()
    const swiperRef = useRef<SwiperRef | null>(null);
    const gradient = getState(e => e.getGradientNowRedux)



    useEffect(() => {
               const FAKE_DATA1: biographyFetchInfoType = {
            photo: PHOTO_TO_DELETE1,
            id: 666,
            name1: "dfvfsd",
            name2: "sdgsd",
            name3: "dlfmld",
            rating: 93,
            age: 8,
            tag: ["вма", "олp", "вміапролорпека", "олp"],
            funFact: " до ch GPнапряму в мозок",
            smthElse: "не врати майнфт,ається",
            biography: "\tнарк чиє ім'я нашу редакцію попросили не вказувати, з етичних переконань. \n\tВважається, щоодить у топ 100 найкращих люважає) "
        }
        const FAKE_DATA: biographyFetchInfoType = { //!CHANGE FOR REAL FETCH
            photo: PHOTO_TO_CHANGE,
            id: 666,
            name1: "Олена",
            name2: "Кшик",
            name3: "Андріївна",
            rating: -13,
            age: 8,
            tag: ["відьма", "опілля"],
            funFact: "підкупила Open AI, продала душу Сему Альтману заради підключення до chat GPT напряму в мозок",
            smthElse: "не вміє грати майнкрафт, але намагається🥰",
            biography: "   Народилася 16 листопада 2016р. у м. Львів, живе з сім'єю у Домажирі, має старшого на декілька років брата, відвідувала молодшу школу у своєму населеному пункті. \n   Через знущання, булінг та газлайтинг матаналізом своїх однолітків її відправили у інтернат для математично-психічно хворих (фізмат).\n   Очоливши місцеву мафію та підкупивши Садового, Олені вдалося вибратися звідти, але це тривало недовго, оскільки вже через 3 місяці її зловили і відправили у львівський \"Алькатрас\" - СШІ. Тут у дівчини не вийшло набрати авторитету, тому вона почала шукати собі жертву для емоційного насилля... Ним став її одногрупник чиє ім'я нашу редакцію попросили не вказувати, з етичних переконань. \n   Вважається, що Олена входить у топ 100 найкращих людей України (як мінімум вона так вважає) ",
            birthday: "11.16"
        }
        if (FAKE_DATA.funFact != null && FAKE_DATA.funFact != undefined) {
            setHotStripRedux("інтересний факт: " + FAKE_DATA.funFact)
        }
        setInfo(<div className={css.container}>
            <div className={css.block1}>
                <div className={css.photoBlock}>
                    <img src={FAKE_DATA.photo} alt={FAKE_DATA.name1} className={css.photo} />
                    <div onClick={GoBackHandler} className={css.photoBorder} style={{
                        borderImage: gradient + " 1"
                    }}></div>
                </div>
                <div className={css.infoBlock}>
                    <div className={css.names}>

                        {FAKE_DATA.name2 + " " +
                            FAKE_DATA.name1 + " " +
                            FAKE_DATA.name3}
                    </div>
                    <div className={css.rating}>
                        <div className={
                            css[RatingColorDefiner(FAKE_DATA.rating)]
                        }>
                            {FAKE_DATA.rating}
                        </div>
                        /100⭐
                    </div>
                    <div className={css.age}>
                        {FAKE_DATA.age + " " + AgePrefixDefiner(FAKE_DATA.age)}
                    </div>
                    <div className={css.age}>
                    {FAKE_DATA.birthday? (FAKE_DATA.birthday  + "🎂") : ""}
                    </div>
                    <div className={css.tag}>
                        {TagCreator(FAKE_DATA.tag, gradient)}
                    </div>

                </div>
            </div>
            <div className={css.bottomBlock}>
                <div className={css.biography}>
                    {FAKE_DATA.biography}
                </div>

                <div className={css.smthElse}>
                    {FAKE_DATA.smthElse}
                </div>
            </div>
        </div>)

    }, [])

    const GoBackHandler = () => {
        setTimeout(() => {
            swiperRef.current?.swiper.slideNext()
            setSlide(2)
            setTimeout(() => {
                setHotStripRedux(null)
                setSwiperLevelRedux({ level: 0 })
            }, 1000);
        }, 150);
    }

    return <>
        <Swiper ref={swiperRef} {...bodyADD.verticalInnerFLipSwiperConfig} className="slider_container">
            <SwiperSlide
                style={{ visibility: slide == 1 ? "visible" : "hidden" }}
                className="slider_container_style">
                {info}
            </SwiperSlide>

            <SwiperSlide
                style={{ visibility: slide == 2 ? "visible" : "hidden" }}
                className="slider_container_style">
                <Loading />
            </SwiperSlide>
        </Swiper>
    </>
}

export default Biography