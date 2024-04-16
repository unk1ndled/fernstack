// import { useReducer, useEffect } from "react";
// import { getDocs, query, where } from "firebase/firestore";

// import { useAuth } from "../contexts/AuthContext";
// import { database } from "../config/firebase";

// const actionTypes = {
//   FETCH_DATA_SUCCESS: "FETCH_DATA_SUCCESS",
//   FETCH_DATA_ERROR: "FETCH_DATA_ERROR",
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "FETCH_DATA":
//       return { ...state, loading: true };
//     case "FETCH_DATA_SUCCESS":
//       return { ...state, loading: false, data: action.payload };
//     case "FETCH_DATA_ERROR":
//       return { ...state, loading: false, error: action.payload };
//     case "UPDATE_DATA":
//       return { ...state, data: action.payload };
//     default:
//       return state;
//   }
// };

// const useStorage = (uid) => {
//   const initialState = {
//     data: null,
//     loading: true,
//     error: null,
//   };
//   const [state, dispatch] = useReducer(reducer, initialState);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (state.data) {
//           dispatch({ type: "FETCH_DATA_SUCCESS", payload: state.data });
//         }
//         const querySnapshot = await getDocs(
//           query(database.users, where("userId", "==", uid))
//         );

//         if (!querySnapshot.empty) {
//           const data = querySnapshot.docs[0].data().usedStorage;
//           dispatch({ type: actionTypes.FETCH_DATA_SUCCESS, payload: data });
//           console.log("db");
//         } else {
//           dispatch({
//             type: actionTypes.FETCH_DATA_ERROR,
//             payload: "No data found",
//           });
//         }
//       } catch (error) {
//         console.log(error);
//         dispatch({
//           type: actionTypes.FETCH_DATA_ERROR,
//           payload: error.message,
//         });
//       }
//     };

//     fetchData();
//   }, []);

//   const updateData = (newData) => {
//     dispatch({ type: "UPDATE_DATA", payload: newData });
//   };

//   return { ...state, updateData };
// };

// export default useStorage;
