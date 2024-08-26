import React, { useEffect, useLayoutEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CheckCookie } from "./auth/auth_funcs"
import Loading from "./loading/loading"
import { message } from "antd"


const App: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [messageApi, messageElement] = message.useMessage()

  useEffect(()=>{
    if (!CheckCookie("user_token") || !CheckCookie("guest_user")) {
      // navigate("/auth")
    }

  }, [])
  // useLayoutEffect(() => {
  //   messageApi.info(content, duration, onClose)
  // }, [content])


  return <>
    {messageElement}
    {loading ? <Loading /> : <div style={{background: "#000"}}>you are logged in</div>}
  </>
}

export default App
