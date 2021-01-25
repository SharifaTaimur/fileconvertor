export const initialState = {
  files: [],
  currentfile: [],
  lastmodified: "",
  filename: "",
};

const reducer = (state, action) => {
  console.log("in the reducer", action);

  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        files: [...state.files, action.item],
      };

    default:
      return state;
  }
};

export default reducer;
