export type TypeModelIdRedux = number | null
  
  export interface TypeActionForGetModelIdRedux {
    type: string,
    payload: TypeModelIdRedux
  }
  
  
  // Action Types
  const SET_LEVEL = "SET_ID";
  
  //початковий state
  const ZeroMessage: TypeModelIdRedux = null
  
  /*(початковий state, action{тип для розуміння що треба робити, state який надходить})=>{
      конструкція якщо треба і щоб повертало або state що надходить або інші дані цього типу
  }*/
  export const getModelIdRedux = (state = ZeroMessage, action: TypeActionForGetModelIdRedux): TypeModelIdRedux => {
    switch (action.type) {
      case SET_LEVEL:
        return action.payload;
      default:
        return state;
    }
  };
  
  //ця функція буде встановлювати новий state повертає об'єкт типу action з верхньої функції
  export const setModelIdRedux = (state: TypeModelIdRedux): TypeActionForGetModelIdRedux => ({
    type: SET_LEVEL,
    payload: state,
  });