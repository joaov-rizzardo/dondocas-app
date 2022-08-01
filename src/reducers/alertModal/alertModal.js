export const innitialAlert = {
    alertTitle: '',
    alertBody: '',
    alertOpen: false
}

export const alertReducer = (state, action) => {
    switch (action.type) {
        case 'openAlert':
            return {
                alertTitle: action.title,
                alertBody: action.body,
                alertOpen: true
            }
        break

        case 'closeAlert':
            return innitialAlert
        break
    }
}