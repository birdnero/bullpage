export interface TypeStatus {
  login_status: boolean
}

export interface TypeActionForGetStateLoginStatus {
  type: string,
  payload: TypeStatus
}


// Action Types
const SET_STATUS = "SET_STATUS";

//початковий state
const ZeroMessage: TypeStatus = {
  login_status: false
}

/*(початковий state, action{тип для розуміння що треба робити, state який надходить})=>{
    конструкція якщо треба і щоб повертало або state що надходить або інші дані цього типу
}*/
export const getLoginSatus = (state = ZeroMessage, action: TypeActionForGetStateLoginStatus): TypeStatus => {
  switch (action.type) {
    case SET_STATUS:
      return action.payload;
    default:
      return state;
  }
};

//ця функція буде встановлювати новий state поіертає об'єкт типу action з верхньої функції
export const setLoginStatus = (state: TypeStatus): TypeActionForGetStateLoginStatus => ({
  type: SET_STATUS,
  payload: state,
});