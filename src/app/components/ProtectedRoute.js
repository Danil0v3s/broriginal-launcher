import React from 'react';
import {
    Route,
    Redirect,
} from "react-router-dom";

export default function ProtectedRoute({ children, userInfo, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) => userInfo.isAuthenticated ? (children) : (
                <Redirect to={{
                    pathname: "/login",
                    state: { from: location }
                }} />
            )}
        />
    )
}