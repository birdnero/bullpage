import { ReactNode } from "react";

export type TypeHotStripRedux = string | null | undefined

export interface TypeActionForGetHotStripRedux {
  type: string,
  payload: TypeHotStripRedux
}


// Action Types
const SET = "SET_STRIP";

//початковий state
const ZeroMessage: TypeHotStripRedux = null

/*(початковий state, action{тип для розуміння що треба робити, state який надходить})=>{
    конструкція якщо треба і щоб повертало або state що надходить або інші дані цього типу
}*/
export const getHotStripRedux = (state = ZeroMessage, action: TypeActionForGetHotStripRedux): ReactNode => {
  state;
  switch (action.type) {
    case SET:
      return <div className="hot_strip">
        <div
          className="hot_strip_inner"
          style={{
            animationDuration: (
              action.payload ? (action.payload.length + 40) / 10 : 0) + "s"
          }}
        >{action.payload}</div>
      </div>
    default:
      return null;
  }
};

//ця функція буде встановлювати новий state повертає об'єкт типу action з верхньої функції
export const setHotStripRedux = (state: TypeHotStripRedux): TypeActionForGetHotStripRedux => ({
  type: SET,
  payload: state,
});