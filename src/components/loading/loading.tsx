import React from "react";
import css from "../css/loading.module.scss"

const Loading: React.FC = () => {
    return <div className={css.container1}>
        <div className={css.container2}>
            <div className={css.container3}>
                <div className={css.el1}></div>
            </div>
            <div className={css.container3}>
                <div className={css.el2}></div>
            </div>
            <div className={css.container3}>
                <div className={css.el3}></div>
            </div>
        </div>
    </div>
}
export default Loading