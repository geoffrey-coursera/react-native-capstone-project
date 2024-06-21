export { LoginProvider, useLogin }

import { ReactNode, createContext, useContext, useState } from "react";

const LoginContext = createContext({
    firstName: 'John',
    email: 'john.doe@email.com',
    isFormValid: true,
    isLoggedIn: true,
    setFirstName: (_: string) => {},
    setEmail: (_: string) => {},
    logIn: () => {}
});

const useLogin = () => useContext(LoginContext);

const LoginProvider = ({ children }: { children: ReactNode }) => {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const isFormFilled = Boolean(firstName && email);
    const isEmailValid = checkEmail(email);
    const isFormValid = isFormFilled && isEmailValid;
    const logIn = () => setIsLoggedIn(true);

    const value = {
        firstName,
        email,
        isFormValid,
        isLoggedIn,
        setFirstName,
        setEmail,
        logIn
    }

    return (
        <LoginContext.Provider value={value}>
            {children}
        </LoginContext.Provider>
    );
}

export const checkEmail = (email: string): boolean => email.match(emailReg) !== null;

const emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;