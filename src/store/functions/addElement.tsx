import { ReactNode } from "react";


export interface TypeActionForGetAddElementRedux {
  type: string,
  payload: ReactNode
}


// Action Types
const SET = "SET_ELEMENT";

//початковий state
const ZeroMessage: ReactNode = null

/*(початковий state, action{тип для розуміння що треба робити, state який надходить})=>{
    конструкція якщо треба і щоб повертало або state що надходить або інші дані цього типу
}*/
export const getAddElementRedux = (state = ZeroMessage, action: TypeActionForGetAddElementRedux): ReactNode => {
  state;
  switch (action.type) {
    case SET:
      return action.payload
    default:
      return null;
  }
};

//ця функція буде встановлювати новий state повертає об'єкт типу action з верхньої функції
export const setAddElementRedux = (state: ReactNode): TypeActionForGetAddElementRedux => ({
  type: SET,
  payload: state,
});