import React, { ReactNode, useState } from "react";
import css from "../../../css/addinfo.module.scss"
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { getState } from "../../../../store/store";


const Rating: React.FC = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const gradient = getState(e => e.getGradientNowRedux)

    const data: ReactNode[] = []
    for (let i = 1; i <= 5; i++) {
        data.push(<div key={i} className={css.starContainer}>
            {hover >= i ?
                <StarFilled
                    onClick={() => setRating(e =>{
                        if(e == i){
                            setHover(0)
                            return 0
                        }
                        return i
                    })}
                    className={css.starFilled}
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(rating)} /> :
                <StarOutlined
                    onClick={() => setRating(e => e == i ? 0 : i)}
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(rating)}
                    className={css.star} />}
        </div>)
    }



    return <>
        <div className={css.block1}>
            <div className={css.tipBlock}>
                <div className={css.tip}>оціни людину</div>
                <div style={{
                    borderImage: (gradient + " 1")
                }} 
                className={css.tipSeparator}></div>
            </div>
            <div className={css.rating}>
                {data}
            </div>
        </div>
    </>
}

export default Rating