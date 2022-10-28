export const innitialExpense = {
    expense_key : '',
    expense_description: '',
    category_key : '',
    expense_value: '',
    expense_status: '',
    expense_date: ''
}

export const expenseReducer = (state, action) => {
    switch(action.type){
        case 'changeCategory':
            return {
                ...state,
                category_key : action.category_key
            }
        break;

        case 'changeValue':
            return {
                ...state,
                expense_value: action.expense_value
            }
        break;

        case 'changeDescription':
            return {
                ...state,
                expense_description: action.expense_description
            }
        break;

        case 'clearExpense':
            return innitialExpense
        break

        case 'setState':
            return {
                expense_key : action.expense.expense_key,
                expense_description: action.expense.expense_description,
                category_key : action.expense.category_key,
                expense_value: action.expense.expense_value,
                expense_status: action.expense.expense_status,
                expense_date: action.expense.expense_date
            }
        break;
    }
}