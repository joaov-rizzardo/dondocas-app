export const innitialState = {
    productKey: null,
    productCode: '',
    productDescription: '',
    productCashPaymentValue: '',
    productDeferredPaymentValue: '',
    productPurchaseValue: '',
    productCategory: '',
    productSubcategory: '',
    productUpdate: false
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
                productSubcategory: action.value
            }
            break

        case 'clearFields':
            return innitialState
            break

        case 'handleMakeProduct':
            return {
                productKey: action.productKey,
                productCode: action.productCode,
                productDescription: action.productDescription,
                productCashPaymentValue: action.productCashPaymentValue,
                productDeferredPaymentValue: action.productDeferredPaymentValue,
                productPurchaseValue: action.productPurchaseValue,
                productCategory: action.productCategory,
                productSubcategory: action.productSubcategory,
                productUpdate: true
            }
            break
        
        default:
            return state
            break
    }
}