import React from "react";
import { IdataModelPreview } from "./body";
import css from "../css/preview.module.scss"
import cssBiography from "../css/biography.module.scss"

import { RatingColorDefiner } from "./modelInfo/biography";





const Preview: React.FC<IdataModelPreview> = (el) => {

    return <div className={css.container}>
        <div className={css.photoBlock}>
            <img className={css.photo} src={el.prePhoto} />
            <div className={css.photoBorder1}></div>
            <div className={css.photoBorder2}></div>
        </div>
        <div className={css.name}>
            {el.name1 + " " + el.name2}
        </div>

        <div className={css.rating}>
            <div className={cssBiography[RatingColorDefiner(el.rating)]}>
                {el.rating}
            </div>
            /100⭐
        </div>
    </div>
}

export default Preview