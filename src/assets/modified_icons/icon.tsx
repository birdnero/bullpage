import React from "react";

const Icon: React.FC<{path: React.ReactNode, className?: string, onClick?: ()=>any}> = ({className, onClick, path}) =>{
    return <svg onClick={()=>onClick? onClick() : null} className={className} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" fill="currentColor" >
    {path}
  </svg>
  
}
export default Icon