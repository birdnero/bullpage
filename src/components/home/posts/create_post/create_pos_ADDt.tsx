import { ThemeConfig } from "antd";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { SwiperProps, SwiperRef } from "swiper/react";
import { Colors } from "../../../../STANDARTS";

export const SwiperProp:React.RefAttributes<SwiperRef> & React.PropsWithChildren<SwiperProps> ={
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: false,
    slidesPerView: 'auto',
    coverflowEffect: {
        rotate: 30,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
    },
    allowTouchMove: false,
    simulateTouch: false,
    noSwiping: true,
    mousewheel: false,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    modules: [EffectCoverflow, Pagination, Navigation],
    className: "swiper_container",
}

export const AntdTheme: ThemeConfig = {
    components: {
        Modal: {
            contentBg: "#14141492",
            headerBg: "transparent",
            boxShadow: Colors.bg_shadow,
            
        }
    }
}
/*

import React, { useState, useRef } from "react";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import 'react-image-crop/src/ReactCrop.scss';

const ImageCropper = () => {
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 50,
    aspect: 1,
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null); // Референс для зображення
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null); // Референс для canvas

  const onImageLoaded = (img: HTMLImageElement) => {
    imgRef.current = img;
  };

  const onCropComplete = (crop: PixelCrop) => {
    setCompletedCrop(crop);
    generateCroppedImage(crop);
  };

  const generateCroppedImage = (crop: PixelCrop) => {
    if (!imgRef.current || !previewCanvasRef.current || !crop.width || !crop.height) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const ctx = canvas.getContext("2d");

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = crop.width;
    canvas.height = crop.height;

    ctx?.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    // Створити нове зображення на основі canvas
    canvas.toBlob((blob) => {
      if (blob) {
        const fileUrl = URL.createObjectURL(blob);
        console.log("Cropped image URL:", fileUrl); // Можна використовувати для подальшого завантаження або відображення
      }
    }, "image/jpeg");
  };

  return (
    <div>
      <ReactCrop
        crop={crop}
        onChange={(newCrop) => setCrop(newCrop)}
        onComplete={onCropComplete}
        aspect={1}
      >
        <img
          src="your-image-url"
          alt="Crop"
          onLoad={(e) => onImageLoaded(e.currentTarget)}
        />
      </ReactCrop>
      
      {/* Canvas для preview або збереження *./}
      <canvas ref={previewCanvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default ImageCropper;




document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement) {
    setTimeout(() => {
      updateCoordinates();
    }, 100); // Затримка для стабілізації
  }
});





*/