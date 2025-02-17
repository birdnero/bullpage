import { ReactNode } from "react";

export type TypeGradientNowRedux = string

export interface TypeActionForGetGradientNowRedux {
  type: string,
  payload: TypeGradientNowRedux
}


// Action Types
const SET = "SET";

//початковий state
const ZeroMessage: TypeGradientNowRedux = ""

/*(початковий state, action{тип для розуміння що треба робити, state який надходить})=>{
    конструкція якщо треба і щоб повертало або state що надходить або інші дані цього типу
}*/
export const getGradientNowRedux = (state = ZeroMessage, action: TypeActionForGetGradientNowRedux): TypeGradientNowRedux => {
  switch (action.type) {
    case SET:
      return action.payload;
    default:
      return state;
  }
};

//ця функція буде встановлювати новий state повертає об'єкт типу action з верхньої функції
export const setGradientNowRedux = (state: TypeGradientNowRedux): TypeActionForGetGradientNowRedux => ({
  type: SET,
  payload: state,
});