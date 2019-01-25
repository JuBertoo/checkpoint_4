export const fetchCategories = (categories) => {
  return {
    payload: categories,
    type: 'FETCH_CATEGORIES'
  }
}