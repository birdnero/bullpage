import React, { useEffect, useState } from "react"
import Cookies from "js-cookie"
// import { useNavigate } from "react-router-dom"
import Loading from "./loading/loading"
// import { message } from "antd"


const App: React.FC = () => {
  const [loading, setLoading] = useState(false)
  // const navigate = useNavigate()
  // const [messageApi, messageElement] = message.useMessage()

  useEffect(()=>{
    if (!Cookies.get("user_token")) {
      // navigate("/auth")
    }
    setLoading(false)
  }, [])
  // useLayoutEffect(() => {
  //   messageApi.info(content, duration, onClose)
  // }, [content])


  return <>
    {/* {messageElement} */}
    {loading ? <Loading /> : <div style={{background: "#000"}}>you are logged in</div>}
  </>
}

export default App
