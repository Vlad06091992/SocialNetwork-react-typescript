import React from "react";
import classes from "./Sidebar.module.css"
import {NavLink} from "react-router-dom";
import {Router} from "react-router-dom";
import {Route} from "react-router-dom";
import {BrowserRouter} from "react-router-dom";



export const Sidebar: React.FC = (props) => {

    const active = (isActive:boolean) => isActive ? classes.active : classes.item

    return (

        <div className={classes.Sidebar}>
            <NavLink className={active} to="/Profile">Profile</NavLink>
            <NavLink className={active} to="/Dialogs">Messges</NavLink>
            <NavLink className={active} to="/News">News</NavLink>
            <NavLink className={active} to="/Music">Music</NavLink>
            <NavLink className={active} to="/Settings">Settings</NavLink>
        </div>

    )
}

