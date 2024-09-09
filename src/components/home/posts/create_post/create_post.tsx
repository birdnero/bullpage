import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import Icon from "../../../../assets/modified_icons/icon";
import { cancel_ico, check_ico, left_arrow, right_arrow, trash } from "../../../../assets/modified_icons/ICONS";
import "../../home.scss"
import * as PostAdd from "./create_pos_ADDt.tsx"
import { ConfigProvider, Modal, Upload, UploadFile } from "antd";
import styles from "./create_post.module.scss"
import ReactCrop, { Crop } from "react-image-crop";
import 'react-image-crop/src/ReactCrop.scss'
import { LoadingOutlined } from "@ant-design/icons";

const CreatePost: React.FC = () => {
    //////////////////////////////////////////////////////////////
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
    const [imageSrc, setImageSrc] = useState<{ path: string, id: string, name: string } | undefined>(undefined);
    const [crop, setCrop] = useState<Crop>();
    const [isModal, setisModal] = useState<boolean>(false)
    const cropCanvasRef = useRef<HTMLCanvasElement>(null)
    const cropImgRef = useRef<HTMLImageElement>(null)
    const cropRef = useRef<ReactCrop>(null)
    const [fullScreen, setFullScreen] = useState<boolean>(true);
    const [loading, setLoading] = useState(false)
    const [finalImageList, setFinalImageList] = useState<{ url: string, name: string, id: number, file: Blob }[]>([])

    /////////////////////////////////////////////////////////////

    const generateCroppedImage = () => {
        if (cropImgRef.current && cropCanvasRef.current && crop && crop.width && crop.height && cropRef.current) {

            const img = cropImgRef.current
            const canvas = cropCanvasRef.current;
            const ctx = canvas.getContext("2d");

            const scaleX = img.naturalWidth / img.width;
            const scaleY = img.naturalHeight / img.height;

            canvas.width = crop.width;
            canvas.height = crop.height;

            console.log(`natural W: ${img.naturalWidth}  H: ${img.naturalHeight} \t web W: ${img.width}  H: ${img.height} \t crop W: ${canvas.width}  H: ${canvas.height} \t crop x: ${crop.x}  y: ${crop.y}`);


            ctx?.drawImage(
                img, //повне зображення
                crop.x * scaleX, //координати початку х
                crop.y * scaleY, //координати початку у
                crop.width * scaleX, //ширина зображення (х)
                crop.width * scaleX, //довжина зображення (у)
                0, //координати початку полотна х
                0, //координати початку полотна У
                crop.width, //ширина полотна (х)
                crop.height //довжина полотна (у)
            );

            canvas.toBlob((blob) => {
                if (blob) {
                    const fileUrl = URL.createObjectURL(blob);
                    setFinalImageList(prev => [...prev, {
                        id: fileUrl.length,
                        url: fileUrl,
                        file: blob,
                        name: img.alt,
                    }])



                    console.log("Cropped image URL:", fileUrl);
                }
            }, "image/jpeg");
        }
    };

///////////////////////////////////////////////////////////////////

    const loadImageSrc = (fileUpload: UploadFile) => {
        if (!fileUpload.originFileObj || isModal) return; // Умова для перевірки модального стану
        const reader = new FileReader();
        reader.onload = (e) => {
            setisModal(true); // встановлює стан до завершення операції
            setImageSrc({
                path: e.target?.result as string,
                id: fileUpload.uid,
                name: fileUpload.name
            });
        };
        console.log(imageSrc);
        
        reader.readAsDataURL(fileUpload.originFileObj);
    };


    /////////////////////////////////////////////////////////////



    return <div className="body_container">
        {!fullScreen && <div
            className={styles.fullScreen_container}
            onClick={() => {
                const body = document.body
                if (body) {
                    setTimeout(() => {
                        setFullScreen(true)
                        body.requestFullscreen();
                    }, 200);
                }
            }}>
            <div
                className={styles.fullScreen_text}
                onClick={() => {
                    const body = document.body
                    if (body) {
                        setTimeout(() => {
                            setFullScreen(true)
                            body.requestFullscreen();
                        }, 200);
                    }
                }}>
                Tap somewhere
            </div>
        </div>}
        <ConfigProvider theme={PostAdd.AntdTheme}>
            <Swiper {...PostAdd.SwiperProp}>
                <SwiperSlide>
                    <div className="slider_container">


                        <div className={styles.file_input}>

                            <Upload
                                accept=".webp,.png,.jpg,.jpeg"
                                showUploadList={false}
                                listType="picture-card"
                                onChange={(fileUpload) => {
                                    setFullScreen(false)

                                    loadImageSrc(fileUpload.file)

                                }}>
                                {finalImageList.length <= 5 && '+ Upload'}


                            </Upload>
                            <Modal
                                closable={false}
                                open={isModal}
                                className={styles.modal}
                                footer={<div className={styles.modal_footer}>
                                    <Icon
                                        onClick={() => {
                                            setImageSrc(undefined)
                                            setisModal(false)
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
                                                        generateCroppedImage()
                                                        setImageSrc(undefined)
                                                        setisModal(false)
                                                        setLoading(false)
                                                    }, 1500);

                                                }
                                            }} />}
                                </div>} >

                                {imageSrc && <>
                                    <ReactCrop
                                        keepSelection
                                        ref={cropRef}
                                        aspect={1 / 1}
                                        crop={crop}
                                        onComplete={(crop) => {
                                            setCrop(crop)
                                        }}
                                        onChange={(newCrop) => setCrop(newCrop)}
                                        className={styles.crop_zone} >
                                        <img ref={cropImgRef} src={imageSrc.path} alt={imageSrc.name} />
                                    </ReactCrop>
                                    <canvas ref={cropCanvasRef} style={{ display: "none" }} />

                                </>}



                            </Modal>
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

                        </div>


                    </div>
                </SwiperSlide>
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

export default CreatePost