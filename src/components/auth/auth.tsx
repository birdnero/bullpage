import React, { useRef } from "react";
import { CheckCookie } from "./auth_funcs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loading from "../loading/loading";
import { useEffect } from "react";
import { Input, ConfigProvider, Space, InputRef } from "antd";
import styles from "../index.module.scss"
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import logo from "../../assets/logo.png"
import ok_btn from "../../assets/ok_btn.svg"

const Auth: React.FC = () => {
    const [loading, setLoading] = useState(true)
    const [allRight, setAllRight] = useState(false)
    const navigate = useNavigate()
    const second_input_ref = useRef<InputRef>(null)

    if (CheckCookie("user_token")) {
        navigate("/")
    }
    useEffect(() => {
        setLoading(false)
    }, [])

    const Check = (input: number): boolean => {
        if(input == 1){
            setAllRight(true) //ЦЕ ПРОСТО ПРИКЛАД РОБОТИ, ТРЕБА ЗМІНИТИ
        }
        return false
    }

    return <>
        {loading ? <Loading /> : <div className={styles.auth_container}>
            <ConfigProvider
                theme={{
                    components: {
                        Input: {
                            colorTextPlaceholder: "#838383"//ПОМІНЯТИ НА ЗМІННУ КОЛИ НЕБУДЬ ПОТІМ
                        },
                    },
                }}
            >
                <Space direction="vertical" size={"middle"} className={styles.auth_inner_container}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end" }}>
                        <p className={styles.auth_text}>Log in</p>
                        <img src={logo} alt="logo" />
                    </div>
                    <Input onKeyDown={(e) => {
                        if (e.key == "Enter") {
                            if (second_input_ref.current && Check(0)) {
                                second_input_ref.current.focus();
                            }
                        }
                    }} placeholder="login" className={styles.auth_input} />
                    <Input.Password onKeyDown={(e) => {
                        if (e.key == "Enter") {
                            Check(1)
                        }
                    }}
                        ref={second_input_ref}
                        iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                        placeholder="password" className={styles.auth_input} />

                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <p className={styles.auth_url} onClick={() => { }}>or Register here</p>
                        <img className={(allRight ? styles.auth_ok_btn : styles.auth_ok_btn_disable)} onClick={() => { }} src={ok_btn} alt="OK" />
                    </div>
                </Space>
            </ConfigProvider>
            <div style={{
                position: "absolute",
                zIndex: 10,
                bottom: "6dvh",
                width: "100dvw",
                display: "flex",
                justifyContent: "center",
                fontSize: "1.7dvh"
            }}>
                <p>Anime Pear</p>
            </div>
        </div>}
    </>
}
export default Auth