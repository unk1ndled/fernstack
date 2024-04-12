import { useReducer, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { database } from "../config/firebase";
import { getDoc, getDocs, query, where } from "firebase/firestore";

const ACTIONS = {
  SELECT_FOLDER: "select-folder",
  UPDATE_FOLDER: "update-folder",
  SET_CHILD_FOLDERS: "set-child-folders",
  SET_CHILD_FILES: "set-child-files",
};

export const ROOT_FOLDER = { name: "Root", id: null, path: [] };

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.SELECT_FOLDER:
      return {
        folderId: payload.folderId,
        folder: payload.folder,
        childFiles: [],
        childFolders: [],
      };
    case ACTIONS.UPDATE_FOLDER:
      return {
        ...state,
        folder: payload.folder,
      };
    case ACTIONS.SET_CHILD_FOLDERS:
      return {
        ...state,
        childFolders: payload.childFolders,
      };
    case ACTIONS.SET_CHILD_FILES:
      return {
        ...state,
        childFiles: payload.childFiles,
      };
    default:
      return state;
  }
}

export function useFolder(folderId = null, folder = null) {
  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder,
    childFolders: [],
    childFiles: [],
  });
  const { currentUser } = useAuth();

  useEffect(() => {
    dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folderId, folder } });
  }, [folderId, folder]);

  useEffect(() => {
    if (folderId == null) {
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: ROOT_FOLDER },
      });
    }
    database
      .getFolderRef(folderId)
      .then(async (docRef) => {
        return await getDoc(docRef);
      })
      .then((doc) => {
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: database.formatDoc(doc) },
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, [folderId]);

  useEffect(() => {
    const setChildren = async () => {
      const q = query(
        database.folders,
        where("parentId", "==", folderId),
        where("userId", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      dispatch({
        type: ACTIONS.SET_CHILD_FOLDERS,
        payload: { childFolders: querySnapshot.docs.map(database.formatDoc) },
      });
    };
    if (currentUser && currentUser.uid) {
      setChildren();
    }
  }, [folderId, currentUser]);

  // useEffect(() => {
  //   return database.folders
  //     .where("parentId", "==", folderId)
  //     .where("userId", "==", currentUser.uid)
  //     .orderBy("createdAt")
  //     .onSnapshot((snapshot) => {
  //       dispatch({
  //         type: ACTIONS.SET_CHILD_FOLDERS,
  //         payload: { childFolders: snapshot.docs.map(database.formatDoc) },
  //       });
  //     });
  // }, [folderId, currentUser]);

  // useEffect(() => {
  //   return (
  //     database.files
  //       .where("folderId", "==", folderId)
  //       .where("userId", "==", currentUser.uid)
  //       // .orderBy("createdAt")
  //       .onSnapshot((snapshot) => {
  //         dispatch({
  //           type: ACTIONS.SET_CHILD_FILES,
  //           payload: { childFiles: snapshot.docs.map(database.formatDoc) },
  //         });
  //       })
  //   );
  // }, [folderId, currentUser]);

  return state;
}
