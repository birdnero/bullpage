import React, { useLayoutEffect, useRef } from "react";
import { CheckCookie, CheckInput, Login } from "./auth_funcs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loading from "../loading/loading";
import { useEffect } from "react";
import { Input, ConfigProvider, Space, InputRef, message } from "antd";
import styles from "../index.module.scss"
import { CloseCircleOutlined, EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import logo from "../../assets/logo.png"
import ok_btn from "../../assets/ok_btn.svg"
import { getState, setState } from "../../store/store";

const Auth: React.FC = () => {
    const [loading, setLoading] = useState(false)
    const [allRight, setAllRight] = useState(false)
    const [input1, setInput1] = useState("")
    const [input2, setInput2] = useState("")
    const navigate = useNavigate()
    const second_input_ref = useRef<InputRef>(null)
    const [messageApi, messageElement] = message.useMessage()
    const { content, duration, onClose } = getState(e => e.DoMessage)
    const { setMessage } = setState()


    if (CheckCookie("user_token")) {
        navigate("/")
    }

    useLayoutEffect(() => {
        messageApi.info(content, duration, onClose)
    }, [content])

    useEffect(() => {
        if(!CheckInput(input1, "login") && !CheckInput(input2, "password")){
            setAllRight(true)
        }
    }, [input1, input2])

    return <>
        {loading ? <Loading /> : <div className={styles.auth_container}>
            <ConfigProvider
                theme={{
                    components: {
                        Input: {
                            colorTextPlaceholder: "#838383"//TODO:ПОМІНЯТИ НА ЗМІННУ КОЛИ НЕБУДЬ ПОТІМ
                        },
                        Message: {
                            contentBg: "#ff007b"//TODO:ПОМІНЯТИ НА ЗМІННУ КОЛИ НЕБУДЬ
                        }
                    },
                }}
            >
                <div style={{position: "relative"}}>{messageElement}</div>

                <p className={styles.auth_skip_btn} onClick={() => { }}>Just skip</p>

                <Space
                    direction="vertical"
                    size={"middle"}
                    className={styles.auth_inner_container}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end" }}>

                        <p className={styles.auth_text}>Log in</p>
                        <img src={logo} alt="logo" />

                    </div>
                    {/* login input */}
                    <Input
                        /*autoFocus*///TODO:РОЗКОМЕНТИТИ ПОТІМ
                        value={input1} //разом з onChange записує значення в стан
                        onChange={(e) => setInput1(e.currentTarget.value)}
                        onKeyDown={(e) => { //перевірка та рефокусація при нажиманні Enter
                            if (e.key == "Enter") {
                                //повертає 0 або помилку
                                const fitTemplate = CheckInput(input1, "login")
                                if (!fitTemplate) {
                                    if (second_input_ref.current) {
                                        second_input_ref.current.focus();
                                    }
                                } else {
                                    setMessage({
                                        content:{
                                            content: fitTemplate,
                                            className: styles.message,
                                            icon: <CloseCircleOutlined style={{stroke: "#ff007b"/*TODO:змінити потім на змінну*/}} />
                                        }
                                    })
                                }
                            }
                        }}
                        placeholder="login"
                        className={styles.auth_input} />

                    {/* password input */}
                    <Input.Password
                        value={input2} //разом з onChange записує значення в стан
                        onChange={(e) => setInput2(e.currentTarget.value)}
                        onKeyDown={(e) => { //перевірка при нажиманні Enter
                            if (e.key == "Enter") {
                                const fitTemplate = CheckInput(input2, "password")
                                if (!fitTemplate) {
                                    if(!CheckInput(input1, "login")){
                                        Login(input1, input2)
                                    } else {
                                        if(second_input_ref.current){
                                            second_input_ref.current.blur()
                                        }
                                    }
                                } else {
                                    setMessage({
                                        content:{
                                            content: fitTemplate
                                        }
                                    })
                                }
                            }
                        }}
                        ref={second_input_ref}
                        iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                        placeholder="password"
                        className={styles.auth_input} />

                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <p
                            className={styles.auth_url}
                            onClick={() => {/*TODO: <Registration /> */ }}>
                            or Register here
                        </p>
                        <img
                            className={(allRight ? styles.auth_ok_btn : styles.auth_ok_btn_disable)}
                            onClick={() => {Login(input1, input2)}}
                            src={ok_btn}
                            alt="OK" />
                    </div>
                </Space>
            </ConfigProvider>
            <div className={styles.auth_bottom_text}>
                <p>Anime Pear</p>
            </div>
        </div>}
    </>
}
export default Auth