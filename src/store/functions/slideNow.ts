export type TypeSlideNowRedux = number 
  
  export interface TypeActionForGetSlideNowRedux {
    type: string,
    payload: TypeSlideNowRedux
  }
  
  
  // Action Types
  const SET_LEVEL = "SET_SLIDE";
  
  //початковий state
  const ZeroMessage: TypeSlideNowRedux = 0
  
  /*(початковий state, action{тип для розуміння що треба робити, state який надходить})=>{
      конструкція якщо треба і щоб повертало або state що надходить або інші дані цього типу
  }*/
  export const getSlideNowRedux = (state = ZeroMessage, action: TypeActionForGetSlideNowRedux): TypeSlideNowRedux => {
    switch (action.type) {
      case SET_LEVEL:
        return action.payload;
      default:
        return state;
    }
  };
  
  //ця функція буде встановлювати новий state повертає об'єкт типу action з верхньої функції
  export const setSlideNowRedux = (state: TypeSlideNowRedux): TypeActionForGetSlideNowRedux => ({
    type: SET_LEVEL,
    payload: state,
  });