import React from 'react';

const AuthContext = React.createContext({
    isLoggedIn: false,
});

export const AuthContextProvider = (props) => {

    const userIsLoggedIn = async () => {
        const res = await fetch(`http://localhost:4000/api/v1/auth/authorize`, {
            method: "Get",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (await res.json() == null) {
            return false;
        } else {
            return true;
        }
    }

    const contextValue = {
        isLoggedIn: userIsLoggedIn,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>);
};

export default AuthContext;
