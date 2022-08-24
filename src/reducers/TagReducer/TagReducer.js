export const innitialTags = []

export const tagReducer = (state, action) => {
    switch(action.type){
        case 'addTag':
            
        const id = state.length == 0 ? 1 : state.reduce((currentValue, tag) => {
            if(tag.id > currentValue){
                return tag
            }
        }, 0)

        console.log(id)
            const tag = {
                id: innitialTags.length + 1,
                product_code: action.product_code,
                subcategory_description: action.subcategory_description,
                cash_value: action.cash_value,
                deferred_value: action.deferred_value,
                quantity: action.quantity
            }

            state.push(tag)
        break;
    }
}
