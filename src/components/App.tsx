import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CheckCookie } from "./auth/auth_funcs"
import Loading from "./loading/loading"

const App: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  if (!CheckCookie("user_token")) {
    navigate("/auth")
  }
  useEffect(() => {
    setLoading(false)
  }, [])


  return <>
    {loading ? <Loading /> : <div>you are logged in</div>}
  </>
}

export default App
