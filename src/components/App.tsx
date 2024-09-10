import React, { useEffect, useLayoutEffect } from "react"
import Cookies from "js-cookie"
import { Outlet, useNavigate } from "react-router-dom"
import { ConfigProvider, message } from "antd"
import { getState } from "../store/store"
import styles from "./index.module.scss"
import Navbar from "./home/navbar"
import TopBar from "./home/topBar"
import { Colors } from "../STANDARTS"
import BACKFROUND from "./BACKGROUND/background"



const App: React.FC = () => {
  const navigate = useNavigate()
  const [messageApi, messageElement] = message.useMessage()
  const { content, duration, onClose } = getState(e => e.getMessage)

  useEffect(() => {
    const handleUserInteraction = () => {
      document.documentElement.requestFullscreen()
    };

    // Attach event listeners
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    // Clean up the event listeners when the component unmounts
    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  useEffect(() => {

    if (!Cookies.get("user_token")) {
      navigate("/auth")
    }
  }, [])
  useLayoutEffect(() => {
    messageApi.info(content, duration, onClose)
  }, [content, duration, onClose])


  return <>
    <ConfigProvider
      theme={{
        components: {
          Input: {
            colorTextPlaceholder: Colors.colorTextPlaceholder
          },
          Message: {
            contentBg: Colors.magenta
          },
          Dropdown: {
            colorBgElevated: Colors.gray,

          }
        },
      }}
    >
      {messageElement}
      <div className={styles.home_container}>
        <BACKFROUND />


        <Navbar />

        <TopBar />

        <Outlet />




      </div>
    </ConfigProvider>
  </>
}

export default App
