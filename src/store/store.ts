import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createStore, combineReducers, bindActionCreators } from "redux";
import { getMessage, setMessage } from "./functions/message";
import { getLoginSatus, setLoginStatus } from "./functions/login_status";
import { getSwiperLevelRedux, setSwiperLevelRedux } from "./functions/swiperLevel";
import { getModelIdRedux, setModelIdRedux } from "./functions/modelId";
import { getSlideNowRedux, setSlideNowRedux } from "./functions/slideNow";
import { getHotStripRedux, setHotStripRedux } from "./functions/hotStrip";
import { getGradientNowRedux, setGradientNowRedux } from "./functions/gradientNow";
import { getAddElementRedux, setAddElementRedux } from "./functions/addElement";


//used in getState
const rootReducer = combineReducers({
    getMessage: getMessage,
    getLoginSatus: getLoginSatus,
    getSwiperLevelRedux: getSwiperLevelRedux,
    getModelIdRedux: getModelIdRedux,
    getSlideNowRedux: getSlideNowRedux,
    getHotStripRedux: getHotStripRedux,
    getGradientNowRedux: getGradientNowRedux,
    getAddElementRedux: getAddElementRedux,//! NOT USED YET
})

//used in setState
const ActionCreators = {
    setMessage,
    setLoginStatus,
    setSwiperLevelRedux,
    setModelIdRedux,
    setSlideNowRedux,
    setHotStripRedux,
    setGradientNowRedux,
    setAddElementRedux//! NOT USED YET
}

///////////////////////////////////////////////////////

//з неї добувати state ----> const {name of function} = setState()
export const setState = () => {
    const dispatch = useDispatch()
    return bindActionCreators(ActionCreators, dispatch)
}

//задаєш state ----> const {name of arguments} = getState(e=>e.name of function)
type rootState = ReturnType<typeof rootReducer>
export const getState: TypedUseSelectorHook<rootState> = useSelector

// ця хрінь потім запихається в обгортку
export const state = createStore(rootReducer)