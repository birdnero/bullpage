import React, { useEffect } from "react"
import Rating from "./rating";
import css from "../../../css/addinfo.module.scss"

const AddInfo: React.FC = () => {


    return <div className={css.container}>

        <Rating />

        <div
            className={css.applyBtn}
            onClick={e => e.currentTarget.innerText == "APPLIED"}>
            APPLY
        </div>
    </div>
}

export default AddInfo