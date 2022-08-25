export const innitialTags = []

export const tagReducer = (state, action) => {
    switch (action.type) {
        case 'addTag':

            const maxId = state.length == 0 ? 1 : state.reduce((currentValue = 0, tag) => {
                if (tag.id > currentValue) {
                    return tag.id
                }
            }, 0)

            const tag = {
                id: maxId + 1,
                product_code: action.product_code,
                subcategory_key: action.subcategory_key,
                cash_value: action.cash_value,
                deferred_value: action.deferred_value,
                quantity: action.quantity
            }

            return [
                ...state,
                tag
            ]
            break;

        case 'deleteTag':
            return (
                state.filter(tag => {
                    if(tag.id != action.id){
                        return tag
                    }
                })
            )

        case 'changeQuantity':
                return (
                    state.map(tag => {
                        if(tag.id == action.id){
                            return {
                                ...tag,
                                quantity: action.quantity
                            }
                        }else{
                            return tag
                        }
                    })
                )
        break;
        break;
    }
}
