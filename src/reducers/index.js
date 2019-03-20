import {combineReducers} from 'redux'

const init = {
    id: '',
    username: '',
    error: '',
    success: '',
    empty: ''
}

const AuthReducer = (state=init, action) => {
    switch (action.type) {
        case 'SUCCEED':
            return {...state, id: action.payload.id, username: action.payload.username}
        
        case 'AUTH_ERROR' :
            return{...state,  error: action.payload, success: '', empty: ''}

        case 'REGISTER_SUCCESS' :
            return {...state, error: '', success: action.payload}
        case 'AFTER_ERROR' :
            return {...state,error: '', empty: ''}
        case 'AUTH_EMPTY' :
            return {...state,  error: '', empty: action.payload}
        case 'LOGOUT_USER':
            return {...state, ...init}
        case 'ADD_SUCCES' :
            return {...state, success: action.payload}
        
        default:
            return state
    }

}

export default combineReducers(
    {
        auth: AuthReducer
    }
)