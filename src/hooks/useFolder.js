import { useReducer, useEffect } from "react";
import { database } from "../config/firebase";
import { useAuth } from "../contexts/AuthContext";
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

  const refreshFolder = () => {
    if (folderId == null) {
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: ROOT_FOLDER },
      });
    }

    getDoc(database.getFolderRef(folderId))
      .then((doc) => {
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: database.formatDoc(doc) },
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    refreshFolder();
  }, [folderId]);

  const setChildFolders = async () => {
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

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      setChildFolders();
    }
  }, [folderId, currentUser]);

  const setChildFiles = async () => {
    const q = query(
      database.files,
      where("folderId", "==", folderId),
      where("userId", "==", currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    dispatch({
      type: ACTIONS.SET_CHILD_FILES,
      payload: { childFiles: querySnapshot.docs.map(database.formatDoc) },
    });
  };
  useEffect(() => {
    if (currentUser && currentUser.uid) {
      setChildFiles();
    }
  }, [folderId, currentUser]);

  const refreshChildren = async () => {
    setChildFolders();
    setChildFiles();
  };

  return { ...state, refreshChildren };
}
