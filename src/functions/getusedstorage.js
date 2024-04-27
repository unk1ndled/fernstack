import { getDocs, onSnapshot, query, where } from "firebase/firestore";
import { database } from "../config/firebase";

export const getusedstorage = async (uid) => {
  try {
    const storedUsedStorage = localStorage.getItem("usedStorage");
    if (storedUsedStorage != null) {
      console.log("local");
      return storedUsedStorage;
    }

    const querySnapshot = await getDocs(
      query(database.users, where("userId", "==", uid))
    );

    if (!querySnapshot.empty) {
      console.log("db");

      const userData = querySnapshot.docs[0].data();
      const userUsedStorage = userData.usedStorage;
      localStorage.setItem("usedStorage", userUsedStorage);
      return userUsedStorage;
    } else {
      throw new Error("User data not found");
    }
  } catch (error) {
    console.error("Error in getusedstorage:", error);
    return null;
  }
};

const getRealtimestorage = async (uid) => {
  let userUsedStorage;
  const q = query(database.users, where("userId", "==", uid));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const userData = querySnapshot.docs[0].data();
    userUsedStorage = userData.usedStorage;
  });
  return { unsubscribe, userUsedStorage };
};
