export const innitialFilter = {
    productCode: '',
    productCategory: '',
    productSubcategory: ''
}

export const filterReducer = (state, action) => {
    switch (action.type) {

        case 'changeProductCode':
            return {
                ...state,
                productCode: action.value
            }
            break

        case 'changeProductCategory':
            return {
                ...state,
                productCategory: action.value
            }
            break
        case 'changeProductSubcategory':
            return {
                ...state,
                productSubcategory: action.value
            }
            break
        default:
            return state
            break
    }
}