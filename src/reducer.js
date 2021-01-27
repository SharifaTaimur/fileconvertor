export const initialState = {
  files: [],
};

const reducer = (state, action) => {
  // console.log("in the reducer", action);

  switch (action.type) {
    case "ADD_TO_FOLDER":
      return {
        ...state,
        files: [...state.files, action.item],
      };

    case "REMOVE_FROM_FOLDER":
      const index = state.files.findIndex((file) => file.id === action.id);

      let newFolder = [...state.files];

      if (index >= 0) {
        newFolder.splice(index, 1);
      }

      return {
        ...state,
        files: newFolder,
      };

    default:
      return state;
  }
};

export default reducer;
