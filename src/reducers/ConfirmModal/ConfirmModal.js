export const innitialConfirm = {
    confirmTitle: '',
    confirmBody: '',
    confirmOpen: false,
    confirmLoading: false,
    confirmCallback: () => {}
}

export const confirmReducer = (state, action) => {
    switch (action.type) {
        case 'openConfirm':
            return {
                ...state,
                confirmTitle: action.title,
                confirmBody: action.body,
                confirmCallback: action.callback,
                confirmOpen: true
            }
        break

        case 'setLoading':
            return {
                ...state,
                confirmLoading: action.loading
            }
        break;

        case 'closeConfirm':
            return innitialConfirm
        break
    }
}