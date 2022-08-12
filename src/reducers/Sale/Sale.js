import { faLeftLong } from "@fortawesome/free-solid-svg-icons"

export const innitialSale = {
    client_name: '',
    client_telephone: '',
    payment_form: {
        payment_key : '',
        payment_type : 'V',
        payment_discount_percent : 0
    },
    products: []
}

export const saleReducer = (state, action) => {
    switch (action.type) {
        case 'addProduct':

        // SE payment_type == V -> PAGAMENTO A VISTA // SE != -> PAGAMENTO A PRAZO
        let unit_price = state.payment_form.payment_type == 'V' ? action.product.product_cash_payment_value : action.product.product_deferred_payment_value

            return {
                ...state,
                products: [
                    ...state.products,
                    {
                        ...action.product,
                        quantity: 1,
                        unit_price:  unit_price,
                        amount : unit_price
                    }
                ]
            }
            break

        case 'changeQuantity':

            const products = state.products.map(product => {
                if (product.product_key == action.product_key) {
                    return { ...product, quantity: action.quantity, amount: product.unit_price *  action.quantity}
                } else {
                    return product
                }
            })

            return (
                {
                    ...state,
                    products: products
                }
            )
            break

        case 'changePaymentForm':
            return{
                ...state,
                payment_form : {
                    payment_key: action.form.payment_key,
                    payment_type : action.form.payment_type,
                    payment_discount_percent: action.form.payment_discount_percent
                },
                products: state.products.map(product => {
                    let unit_price = action.form.payment_type == 'V' ? product.product_cash_payment_value : product.product_deferred_payment_value
                    return {
                        ...product,
                        unit_price : unit_price,
                        amount: unit_price * product.quantity
                    }
                })

            }

        break;
    }
}