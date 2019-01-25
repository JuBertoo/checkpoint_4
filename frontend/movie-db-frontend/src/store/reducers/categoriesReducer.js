const initialState = []

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case "FETCH_CATEGORIES":
    return [...payload.categories]

  default:
    return state
  }
}
