// import { useReducer } from "react";

// const ACTIONS = {
//   INCREASE_STORAGE: "increase-storage",
//   DECREASE_STORAGE: "decrease-storage",
//   GET_STORAGE: "get-storage",
// };

// function reducer(state, { type, payload }) {
//   switch (type) {
//     case ACTIONS.INCREASE_STORAGE:
//       return {
//         userStorage: payload.userStorage,
//       };
//     case ACTIONS.DECREASE_STORAGE:
//       return {
//         userStorage: payload.userStorage,
//       };
//     case ACTIONS.GET_STORAGE:
//       return {
//         userStorage: payload.userStorage,
//       };
//     default:
//       return state;
//   }
// }
// export const useStorage = (val = null) => {
//   const [state, dispatch] = useReducer(reducer, {
//     userStorage: 0,
//   });
// };
