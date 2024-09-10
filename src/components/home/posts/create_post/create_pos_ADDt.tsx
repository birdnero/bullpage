import { ThemeConfig, UploadFile } from "antd";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { SwiperProps, SwiperRef } from "swiper/react";
import { Colors } from "../../../../STANDARTS";
import { Crop } from "react-image-crop";
import { RectReadOnly } from "react-use-measure";

// задає конфігурацію для слайдера
export const SwiperProp: React.RefAttributes<SwiperRef> & React.PropsWithChildren<SwiperProps> = {
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

// задає конфігурацію для конфіґ провайдера
export const AntdTheme: ThemeConfig = {
  components: {
    Modal: {
      contentBg: "#14141492",
      headerBg: "transparent",
      boxShadow: Colors.bg_shadow,

    }
  }
}

// ця хрінь збирає з всього на світі дані і створює обрізане зображення
export const generateCroppedImage = (
  img_id: string,
  cropImgRef: React.RefObject<HTMLImageElement>,
  cropCanvasRef: React.RefObject<HTMLCanvasElement>,
  crop: Crop | undefined, upd_bounds: RectReadOnly,
  setFinalImageList: (value: React.SetStateAction<{
    url: string;
    name: string;
    id: string;
    file: Blob;
  }[]>) => void
) => {
  if (cropImgRef.current && cropCanvasRef.current && crop) {

    const img = cropImgRef.current
    const canvas = cropCanvasRef.current;
    const ctx = canvas.getContext("2d");

    const scaleX = img.naturalWidth / upd_bounds.width;
    const scaleY = img.naturalHeight / upd_bounds.height;

    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleX;

    ctx?.drawImage(
      img, //повне зображення
      crop.x * scaleX, //координати початку х
      crop.y * scaleY, //координати початку у
      crop.width * scaleX, //ширина зображення (х)
      crop.height * scaleY, //довжина зображення (у)
      0, //координати початку х
      0, //координати початку y
      crop.width * scaleX, //ширина полотна (х)
      crop.height * scaleX //довжина полотна (у)
    );

    canvas.toBlob((blob) => {
      if (blob) {
        const fileUrl = URL.createObjectURL(blob);
        setFinalImageList(prev => [...prev, {
          id: img_id,
          url: fileUrl,
          file: blob,
          name: img.alt,
        }])
      }
    }, "image/jpeg");
  }
};

// стандартне налаштування для форми обрізки
export const cropDefault: Crop = {
  width: 50,
  height: 50,
  x: 50,
  y: 50,
  unit: "px"
}

// ця хуйня отримує фотку, запихає куди треба і перетворює у потрібний формат
export const loadImageSrc = (
  fileUpload: UploadFile,
  isModal: boolean,
  setisModal: (value: React.SetStateAction<boolean>) => void,
  setImageSrc: (value: React.SetStateAction<{
    path: string;
    id: string;
    name: string;
  } | undefined>) => void
) => {
  if (!fileUpload.originFileObj || isModal) return; // Умова для перевірки модального стану
  const reader = new FileReader();
  reader.onload = (e) => {
    const nextid = fileUpload.uid + Math.round(Math.random() * 1000)
    setisModal(true); // встановлює стан до завершення операції
    setImageSrc({
      path: e.target?.result as string,
      id: nextid,
      name: fileUpload.name
    });
  };

  reader.readAsDataURL(fileUpload.originFileObj);
};