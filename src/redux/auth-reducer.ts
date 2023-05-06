import {ActionsType} from "./store";
import {AuthApi} from "../api/api";
import {AppDispatch, AppThunk} from "./redux-store";
import {Dispatch} from "redux";


export type AuthStateType = {
    userId: null | string
    email: null | string
    login: null | string
    isAuth: null | boolean,
    serverError: null | string
}

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    serverError: null
}

export const authReducer = (state: AuthStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'auth/AUTH-USER':
            return {
                ...state,
                email: action.email,
                login: action.login,
                userId: action.id,
                isAuth: action.isAuth
            }
        case 'auth/SET-SERVER-ERROR':
            return {...state, serverError: action.error}
        default:
            return state
    }
}


//For auth reducer


export const setAuthUserData = (id: string | null, login: string | null, email: string | null, isAuth: boolean) => {
    return {
        type: 'auth/AUTH-USER',
        id,
        login,
        email,
        isAuth
    } as const
}

export const setServerError = (error: string) => {
    return {
        type: 'auth/SET-SERVER-ERROR',
        error
    } as const
}


export const getAuthUserDataTC = ():AppThunk => {
    return async (dispatch: Dispatch) => {
        try {
            let res = await  AuthApi.me()
            if (res.data.resultCode === 0) {
                let {id, email, login} = res.data.data
                dispatch(setAuthUserData(id, login, email, true))
            }
        } catch (e:any){
            throw new Error(e)
        }

    }
}


export const loginTC = (email: string, password: string, remeberMe: boolean): AppThunk => { //дипатчим санку в санке
    try {
        return async (dispatch:AppDispatch) => {
            let res = await AuthApi.login(email, password, remeberMe)
            if (res.data.resultCode === 0) {
                dispatch(getAuthUserDataTC())  //дипатчим санку здесь
            } else {
                dispatch(setServerError(res.data.messages[0]))
            }
        }
    } catch (e:any){
        throw new Error(e)
    }
}

export const logoutTC = ():AppThunk => async (dispatch: AppDispatch)=> {
     let res = await AuthApi.logout()
        if (res.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
}



export type ForAuthReducersTypes = ForAuthUser | SetServerError

type ForAuthUser = ReturnType<typeof setAuthUserData>
type SetServerError = ReturnType<typeof setServerError>
