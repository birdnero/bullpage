import React from "react";
import logo from "../../assets/logo_bw.svg"
import { useLocation } from 'react-router-dom';
import styles from "../index.module.scss"

//сторінка для помилок
const Error: React.FC = () => {
    const location = useLocation(); // Отримуємо поточний шлях з адресного рядка

    //в залежності від url виводиться текст
    let text = "";
    switch (location.pathname) {
        case "/denied":
            text = "ACCESS DENIED :/"
            break;
        case "/error":
            text = "ERROR OCURRED :/"
            break;
        default:
            text = "ERROR 4O4: PAGE NOT FOUND :/"
            break;
    }


    return <div className={styles.error_container}>
        <div className={styles.error_inner_container}>
            <img src={logo} className={styles.logo_img} alt="logo" />
            <p className={styles.error_text}>
                {text}
            </p>
        </div>
    </div>
}
export default Error