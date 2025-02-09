import { JointContent } from "antd/es/message/interface";

export interface TypeMessage {
  content: JointContent,
  duration?: number | VoidFunction,
  onClose?: VoidFunction
}

export interface TypeActionForGetStateMessage {
  type: string,
  payload: TypeMessage
}


// Action Types
const SET_MESSAGE = "SET_MESSAGE";

//початковий state
const ZeroMessage: TypeMessage = {
  content: {
    content: "",
    style: {
      display: "none"
    }
  }
}

/*(початковий state, action{тип для розуміння що треба робити, state який надходить})=>{
    конструкція якщо треба і щоб повертало або state що надходить або інші дані цього типу
}*/
export const getMessage = (state = ZeroMessage, action: TypeActionForGetStateMessage): TypeMessage => {
  switch (action.type) {
    case SET_MESSAGE:
      return action.payload;
    default:
      return state;
  }
};

//ця функція буде встановлювати новий state поіертає об'єкт типу action з верхньої функції
export const setMessage = (state: TypeMessage): TypeActionForGetStateMessage => ({
  type: SET_MESSAGE,
  payload: state,
});