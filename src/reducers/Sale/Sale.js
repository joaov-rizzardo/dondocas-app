export const innitialSale = {
    client_name: '',
    client_telephone: '',
    payment_form: '',
    products: []
}

export const saleReducer = (state, action) => {
    switch (action.type) {
        case 'addProduct':
            return {
                ...state,
                products: [
                    ...state.products,
                    {
                        ...action.product,
                        quantity: 0
                    }
                ]
            }
            break

        case 'changeQuantity':

            const products = state.products.map(product => {
                if (product.product_key == action.product_key) {
                    return { ...product, quantity: action.quantity }
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
    }
}