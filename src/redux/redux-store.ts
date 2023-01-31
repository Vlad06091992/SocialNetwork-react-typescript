import {combineReducers, createStore} from "redux"
import {dialogsReducer} from "./dialogs-reducer"
import {profileReducer} from "./profile-reducer"
import {sidebarReducer} from "./sidebar-reducer"
import {userReducer} from "./users-reducer";
import {authReducer} from "./auth-reducer";

let reducers = combineReducers({
    dialogsPage: dialogsReducer,
    profilePage: profileReducer,
    sidebarPage: sidebarReducer,
    usersPage: userReducer,
    auth:authReducer
})

export let store = createStore(reducers)

export type ReduxStoreType = typeof store


