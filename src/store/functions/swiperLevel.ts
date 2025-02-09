export interface TypeSwiperLevelRedux {
  level: number
}

export interface TypeActionForGetSwiperLevelRedux {
  type: string,
  payload: TypeSwiperLevelRedux
}


// Action Types
const SET_LEVEL = "SET_LEVEL";

//початковий state
const ZeroMessage: TypeSwiperLevelRedux = {
  level: 0
}

/*(початковий state, action{тип для розуміння що треба робити, state який надходить})=>{
    конструкція якщо треба і щоб повертало або state що надходить або інші дані цього типу
}*/
export const getSwiperLevelRedux = (state = ZeroMessage, action: TypeActionForGetSwiperLevelRedux): TypeSwiperLevelRedux => {
  switch (action.type) {
    case SET_LEVEL:
      return action.payload;
    default:
      return state;
  }
};

//ця функція буде встановлювати новий state повертає об'єкт типу action з верхньої функції
export const setSwiperLevelRedux = (state: TypeSwiperLevelRedux): TypeActionForGetSwiperLevelRedux => ({
  type: SET_LEVEL,
  payload: state,
});