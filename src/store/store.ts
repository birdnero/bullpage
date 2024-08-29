import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createStore, combineReducers, bindActionCreators } from "redux";
import { getMessage, setMessage } from "./functions/message";
import { getLoginSatus, setLoginStatus } from "./functions/login_status";


//used in getState
const rootReducer = combineReducers({
    getMessage: getMessage,
    getLoginSatus: getLoginSatus,
})

//used in setState
const ActionCreators={
    setMessage,
    setLoginStatus,
}

///////////////////////////////////////////////////////

//з неї добувати state ----> const {name of function} = getState()
export const setState = () =>{
    const dispatch=useDispatch()
    return bindActionCreators(ActionCreators, dispatch)
}

//задаєш state ----> const {name of arguments} = setState(e=>e.name of function)
type rootState= ReturnType<typeof rootReducer>
export const getState: TypedUseSelectorHook<rootState> = useSelector

// ця хрінь потім запихається в обгортку
export const state = createStore(rootReducer)