export const actionTypes = {
  SET_COLLECTION_ORDER: "SET_COLLECTION_ORDER",
  SET_COLLECTION_SORT: "SET_COLLECTION_SORT",
  SET_COLLECTION_TAGS: "SET_COLLECTION_TAGS",
};

export const initialState = {
  collectionOrder: "",
  collectionSort: "",
  collectionTags: [],
};

export function collectionReducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_COLLECTION_ORDER:
      return {
        ...state,
        collectionOrder: action.payload,
      };
    case actionTypes.SET_COLLECTION_SORT:
      return {
        ...state,
        collectionSort: action.payload,
      };
    case actionTypes.SET_COLLECTION_TAGS:
      return {
        ...state,
        collectionTags: action.payload,
      };
    default:
      return state;
  }
}
