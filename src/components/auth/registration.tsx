import React, { useLayoutEffect, useRef } from "react";
import { CheckInput, Authentication, SkipFn } from "./auth_funcs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Input, ConfigProvider, Space, InputRef, message } from "antd";
import styles from "../index.module.scss"
import { CloseCircleOutlined, EyeInvisibleOutlined, EyeOutlined, LoadingOutlined } from "@ant-design/icons";
import logo from "../../assets/logo.png"
import ok_btn from "../../assets/ok_btn.svg"
import { getState, setState } from "../../store/store";
import Cookies from "js-cookie"
import { Colors } from "../../STANDARTS";

const Registration: React.FC = () => {
    const [loading, setLoading] = useState(false)
    const [allRight, setAllRight] = useState(false)
    const [input1, setInput1] = useState("")
    const [input2, setInput2] = useState("")
    const [input3, setInput3] = useState("")
    const navigate = useNavigate()
    const first_input_ref = useRef<InputRef>(null)
    const second_input_ref = useRef<InputRef>(null)
    const third_input_ref = useRef<InputRef>(null)
    const [messageApi, messageElement] = message.useMessage()
    const { content, duration, onClose } = getState(e => e.getMessage)
    const { setMessage, setLoginStatus } = setState()

    //перенаправка у випадку якщо вже є потрібна кука (без перевірики на автентичність)
    useEffect(() => {
        if (Cookies.get("user_token")) {
            if (Cookies.get("user_token") !== "skipped_registration") {
                navigate("/")
            }
        }
    }, [])

    useLayoutEffect(() => {
        messageApi.info(content, duration, onClose)
    }, [content])

    useEffect(() => {
        if (!CheckInput(input1, "login") && !CheckInput(input2, "password") && input2 === input3) {
            setAllRight(true)
        } else {
            setAllRight(false)
        }
    }, [input1, input2, input3])











    return <>
        {<div className={styles.auth_container}>
            <ConfigProvider
                theme={{
                    components: {
                        Input: {
                            colorTextPlaceholder: Colors.colorTextPlaceholder
                        },
                        Message: {
                            contentBg: Colors.magenta
                        }
                    },
                }}
            >
                <div style={{ position: "relative" }}>{messageElement}</div>

                <p className={styles.auth_skip_btn} onClick={() => SkipFn(navigate)}>Just skip</p>

                <Space
                    direction="vertical"
                    size={"middle"}
                    className={styles.auth_inner_container}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end" }}>

                        <p className={styles.auth_text}>Sign up</p>
                        <img style={{ userSelect: "none" }} src={logo} alt="logo" />

                    </div>
                    {/* login input */}
                    <Input
                        style={{ marginBottom: "2dvh" }}
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
                                        content: {
                                            content: fitTemplate,
                                            className: styles.message,
                                            icon: <CloseCircleOutlined style={{ stroke: Colors.magenta }} />
                                        }
                                    })
                                }
                            }
                        }}
                        placeholder="login"
                        ref={first_input_ref}
                        className={styles.auth_input} />

                    {/* password input */}
                    <Input.Password
                        value={input2} //разом з onChange записує значення в стан
                        onChange={(e) => setInput2(e.currentTarget.value)}
                        onKeyDown={(e) => { //перевірка при нажиманні Enter
                            if (e.key == "Enter") {
                                const fitTemplate = CheckInput(input2, "password")
                                if (!fitTemplate) {
                                    if (third_input_ref.current) {
                                        third_input_ref.current.focus()
                                    }
                                } else {
                                    setMessage({
                                        content: {
                                            content: fitTemplate,
                                            className: styles.message,
                                            icon: <CloseCircleOutlined style={{ stroke: Colors.magenta }} />
                                        }
                                    })
                                }
                            }
                        }}
                        ref={second_input_ref}
                        iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                        placeholder="password"
                        className={styles.auth_input} />
                    <Input.Password
                        value={input3} //разом з onChange записує значення в стан
                        onChange={(e) => setInput3(e.currentTarget.value)}
                        onKeyDown={(e) => { //перевірка при нажиманні Enter
                            if (e.key == "Enter") {
                                if (input2 === input3) {
                                    if (allRight) {
                                        Authentication("signup", input1, input2, setMessage, setLoading, setLoginStatus, navigate)
                                    } else {
                                        if (first_input_ref.current) {
                                            first_input_ref.current.focus()
                                        }
                                    }
                                } else {
                                    setMessage({
                                        content: {
                                            content: "passwords are different",
                                            className: styles.message,
                                            icon: <CloseCircleOutlined style={{ stroke: Colors.magenta }} />
                                        }
                                    })
                                }
                            }
                        }}
                        ref={third_input_ref}
                        iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                        placeholder="repeat password"
                        className={styles.auth_input} />

                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <p
                            className={styles.auth_url}
                            onClick={() => { navigate("/auth") }}>
                            or Login here
                        </p>
                        {loading ?
                            <div className={styles.auth_loading}>
                                <LoadingOutlined />
                            </div>
                            :
                            <img
                                className={(allRight ? styles.auth_ok_btn : styles.auth_ok_btn_disable)}
                                onClick={() => {
                                    if (allRight) {
                                        Authentication("signup", input1, input2, setMessage, setLoading, setLoginStatus, navigate)

                                    } else {
                                        setMessage({
                                            content: {
                                                content: "you haven't entered data correctly"
                                            }
                                        })
                                    }
                                }}
                                src={ok_btn}
                                alt="OK" />}

                    </div>
                </Space>
            </ConfigProvider>
            <div className={styles.auth_bottom_text}>
                <p onClick={()=>setMessage({content: {content: <a style={{textDecoration: "none", color: Colors.white, cursor: "default"}} href="https://www.pornhub.com/video/search?search=jojo+bizarre+adventure+hentai">The best hentai is JoJo Bizzare Adventure)))</a>}})}>Anime Pear</p>
            </div>
        </div>}
    </>
}
export default Registration