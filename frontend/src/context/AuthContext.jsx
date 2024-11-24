import React, { createContext, useState, useContext } from "react";

// AuthContext 생성
const AuthContext = createContext();

// AuthProvider: 로그인 상태 관리 및 제공
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("jwtToken"));

    const login = () => setIsLoggedIn(true);
    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("userInfo");
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// AuthContext 소비를 위한 커스텀 훅
export const useAuth = () => useContext(AuthContext);
