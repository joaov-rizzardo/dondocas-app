export const innitialState = {
    productCode: '',
    productDescription: '',
    productCashPaymentValue: '',
    productDeferredPaymentValue: '',
    productPurchaseValue: '',
    productCategory: '',
    productSubcategory: ''
}

export function reducer(state, action) {
    switch (action.type) {
        case 'changeCode':
            return {
                ...state,
                productCode: action.value
            }
            break

        case 'changeDescription':
            return {
                ...state,
                productDescription: action.value
            }
            break

        case 'changeCashPaymentValue':
            return {
                ...state,
                productCashPaymentValue: action.value
            }
            break

        case 'changeDeferredPaymentValue':
            return {
                ...state,
                productDeferredPaymentValue: action.value
            }
            break

        case 'changePurchaseValue':
            return {
                ...state,
                productPurchaseValue: action.value
            }
            break

        case 'changeCategory':
            return {
                ...state,
                productCategory: action.value
            }
            break

        case 'changeSubcategory':
            return {
                ...state,
                productsubCategory: action.value
            }
            break

        case 'clearFields':
            return innitialState
            break
        
        default:
            return state
            break
    }
}