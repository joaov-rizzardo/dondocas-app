export const innitialSale = {
    client: {
        client_name : '',
        client_telephone: '',
        unidentified: false
    },
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
                        amount : unit_price,
                        color: '',
                        size: ''
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

        case 'changeColor':
            return{
                ...state,
                products : state.products.map(product => {
                    if(product.product_key == action.product_key){
                        return {
                            ...product,
                            color: action.color
                        }
                    }else{
                        return product
                    }
                })
            }

        break;

        case 'changeSize':
            return{
                ...state,
                products : state.products.map(product => {
                    if(product.product_key == action.product_key){
                        return {
                            ...product,
                            size: action.size
                        }
                    }else{
                        return product
                    }
                })
            }

        break;

        case 'changeClientName':
            return {
                ...state,
                client: {
                    ...state.client,
                    client_name : action.value
                }
            }

        break

        case 'changeClientTelephone':
            return {
                ...state,
                client: {
                    ...state.client,
                    client_telephone : action.value
                }
            }

        break

        case 'changeClientUnidentified':
            return {
                ...state,
                client: {
                    ...state.client,
                    unidentified : action.value
                }
            }

        break

        case 'removeProduct':
            return {
                ...state,
                products: state.products.filter(product => {
                    if(product.product_key != action.product_key){
                        return product
                    }
                })
            }
        break
    }
}