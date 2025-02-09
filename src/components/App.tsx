import React, { useEffect, useLayoutEffect } from "react"
import { Outlet } from "react-router-dom"
import { ConfigProvider, message } from "antd"
import { getState } from "../store/store"
import styles from "./index.module.scss"
import Navbar from "./home/navbar"
import TopBar from "./home/topBar"
import { Colors } from "../STANDARTS"
import BACKFROUND from "./BACKGROUND/background"
import "./css/hotStrip.module.scss"



const App: React.FC = () => {
  const [messageApi, messageElement] = message.useMessage()
  const { content, duration, onClose } = getState(e => e.getMessage)
  const hotStrip = getState(e => e.getHotStripRedux)


  //відповідає за повноекранний режим
  // useEffect(() => {
  //   const handleUserInteraction = () => {
  //     document.documentElement.requestFullscreen()
  //   };

  //   // Attach event listeners
  //   document.addEventListener('click', handleUserInteraction);
  //   document.addEventListener('touchstart', handleUserInteraction);

  //   // Clean up the event listeners when the component unmounts
  //   return () => {
  //     document.removeEventListener('click', handleUserInteraction);
  //     document.removeEventListener('touchstart', handleUserInteraction);
  //   };
  // }, []);

  useLayoutEffect(() => {
    messageApi.info(content, duration, onClose)
  }, [content, duration, onClose])


  //ConfigProvider відповідає за AntDesign
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


        {/* <Navbar /> */}
        {hotStrip}

        <TopBar />

        <Outlet />




      </div>
    </ConfigProvider>
  </>
}

export default App
