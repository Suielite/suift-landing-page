"use client"
import React, { createContext, useState, useMemo, useEffect } from 'react';

export const AuthContext = createContext({
    Auth: {id: '', email: '', username: ''},
    setAuth: () => {},
});

export const AuthProvider = ({ children }) => {
    const [Auth, setAuth] = useState('');

    //try to get from localstorage
    useEffect(() => {
        const user = localStorage.getItem('user_profile');
        if (user) {
            setAuth(JSON.parse(user));
        }
    }
    , []);
    const memoizedValue = useMemo(() => ({ Auth, setAuth }), [Auth]);

    return (
        <AuthContext.Provider
            value={{
                Auth: memoizedValue.Auth,
                setAuth: memoizedValue.setAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
