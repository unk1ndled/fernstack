import { getDocs, query, updateDoc, where } from "firebase/firestore";
import { database } from "../config/firebase";
import { set } from "firebase/database";

const usedStorage = "usedStorage";

export const updateStorage = async (operation, value, userid) => {
  try {
    const querySnapshot = await getDocs(
      query(database.users, where("userId", "==", userid))
    );

    if (!querySnapshot.empty) {
      const user = querySnapshot.docs[0];
      const oldVal = user.data().usedStorage;
      let next;
      switch (operation) {
        case "add":
          next = oldVal + value;
          break;
        case "subtract":
          next = Math.max(oldVal - value, 0);
          break;
        default:
          break;
      }
      await updateDoc(user.ref, { usedStorage: next });
      localStorage.setItem(usedStorage, next);
    } else {
      console.log("Document does not exist");
    }
  } catch (error) {
    console.error("Error updating storage:", error);
  }
};

