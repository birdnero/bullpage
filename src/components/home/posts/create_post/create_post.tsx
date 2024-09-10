import React, { memo, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { cancel_ico, check_ico, left_arrow, right_arrow, trash } from "../../../../../public/assets/modified_icons/ICONS.tsx"
import "../../home.scss"
import * as PostAdd from "./create_pos_ADDt.tsx"
import { ConfigProvider, Modal, Upload } from "antd";
import styles from "./create_post.module.scss"
import ReactCrop, { Crop } from "react-image-crop";
import 'react-image-crop/src/ReactCrop.scss'
import { LoadingOutlined } from "@ant-design/icons";
import useMeasure from "react-use-measure";
import Icon from "../../../../../public/assets/modified_icons/icon.tsx";
import { generateCroppedImage } from "./create_pos_ADDt.tsx";

const CreatePost: React.FC = () => {
    //////////////////////////////////////////////////////////////
    //хуйня для перемикання між сторінками
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
    //////////////////////////////////////////////////////////////
    //всякі хуки
    const [imageSrc, setImageSrc] = useState<{ path: string, id: string, name: string } | undefined>(undefined);

    const [finalImageList, setFinalImageList] = useState<{ url: string, name: string, id: string, file: Blob }[]>([])

    const [crop, setCrop] = useState<Crop>(PostAdd.cropDefault);
    const [isModal, setisModal] = useState<boolean>(false)
    const [loading, setLoading] = useState(false)

    const cropCanvasRef = useRef<HTMLCanvasElement>(null)
    const cropImgRef = useRef<HTMLImageElement>(null)

    const [updateRef, upd_bounds] = useMeasure();

    ///////////////////////////////////////////////////////////////////

    return <div className="body_container">
        {/* фотка для обрізки оригінального зображення */}
        {imageSrc && <div
            style={{ width: '1px', height: '1px', overflow: 'hidden', position: 'relative' }}>
            <img
                ref={cropImgRef}
                src={imageSrc.path}
                alt=""
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: -10,
                    overflow: "hidden"
                }} />
        </div>}
        {/* хирня щоб міняти стилі для компонентів з  antd */}
        <ConfigProvider theme={PostAdd.AntdTheme}>

            {/* елементи для роботи слайдера */}
            <Swiper {...PostAdd.SwiperProp}>
                <SwiperSlide>
                    <div className="slider_container">
                        <div>
                            <div className={styles.file_input}>

                                {/* хирня для відображення загружених фоток */}
                                {finalImageList && finalImageList.map(el => {
                                    return <div className={styles.uploaded_container1} key={el.id}>
                                        <div className={styles.uploaded_container2} key={el.id}>
                                            <div className={styles.delete_btn}>
                                                <Icon
                                                    className={styles.trash_ico}
                                                    path={trash}
                                                    onClick={() => {
                                                        setFinalImageList(prev => prev.filter(el1 => el1.id !== el.id))
                                                    }} />
                                            </div>
                                            <img src={el.url} alt="" className={styles.uploaded_img} />
                                        </div>
                                    </div>
                                })}

                                {/* штука що дістає фотки з пристрою */}
                                <Upload
                                    accept=".webp,.png,.jpg,.jpeg"
                                    showUploadList={false}
                                    onChange={(fileUpload) => {
                                        PostAdd.loadImageSrc(fileUpload.file, isModal, setisModal, setImageSrc)
                                    }}>
                                    {finalImageList.length <= 3 && <div className={styles.upload_block}>
                                        <div>Upload image</div>
                                    </div>}
                                </Upload>
                            </div>
                        </div>

                        {/* вікно в якому йде обрізка */}
                        <Modal
                            closable={false}
                            open={isModal}
                            className={styles.modal}
                            footer={<div className={styles.modal_footer}>
                                <Icon
                                    onClick={() => {
                                        setImageSrc(undefined)
                                        setisModal(false)
                                        setCrop(PostAdd.cropDefault)
                                    }}
                                    path={cancel_ico}
                                    className="home_icon" />
                                {loading ?
                                    <div className={styles.loading}>
                                        <LoadingOutlined />
                                    </div>
                                    : <Icon
                                        path={check_ico}
                                        className="home_icon"
                                        onClick={() => {
                                            if (crop && imageSrc) {

                                                setLoading(true)
                                                setTimeout(() => {
                                                    generateCroppedImage(imageSrc.id, cropImgRef, cropCanvasRef, crop, upd_bounds, setFinalImageList)
                                                    setImageSrc(undefined)
                                                    setisModal(false)
                                                    setLoading(false)
                                                    setCrop(PostAdd.cropDefault)
                                                }, 1500);

                                            }
                                        }} />}
                            </div>} >

                            {/* хрінь яка робить інтерфейс і збирає корди обрізки */}
                            {imageSrc && <>
                                <ReactCrop
                                    minHeight={25}
                                    minWidth={25}
                                    keepSelection
                                    aspect={1 / 1}
                                    crop={crop}
                                    onChange={(newCrop) => setCrop(newCrop)}
                                    className={styles.crop_zone} >

                                    <div ref={updateRef}>
                                        <img
                                            draggable={false}
                                            src={imageSrc.path}
                                            alt={imageSrc.name}
                                            style={{
                                                width: "100%",
                                                userSelect: "none",
                                                pointerEvents: "none"
                                            }} />
                                    </div>
                                </ReactCrop>
                                <canvas ref={cropCanvasRef} style={{ display: "none" }} />

                            </>}

                        </Modal>

                    </div>
                </SwiperSlide>

                {/* стрілочки для гортання */}
                <div className="slider-controler">
                    {arrows[0] ? <div className="swiper-button-prev slider-arrow">
                        <Icon path={left_arrow} className={"home_icon"} />
                    </div> : <div></div>}
                    {arrows[1] ? <div className="swiper-button-next slider-arrow">
                        <Icon path={right_arrow} className={"home_icon"} />
                    </div> : <div></div>}
                </div>
            </Swiper>
        </ConfigProvider>
    </div>
}

export default memo(CreatePost)