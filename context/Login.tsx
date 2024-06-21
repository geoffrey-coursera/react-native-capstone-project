export { LoginProvider, useLogin }

import ErrorBubble from "@/components/ErrorBubble";
import { P } from "@/components/StyledText";
import Colors from "@/lib/Colors";
import { ReactNode, createContext, useContext, useState } from "react";

const LoginContext = createContext({
    firstName: 'John',
    email: 'john.doe@email.com',
    isEmailValid: true,
    isFormValid: true,
    isLoggedIn: true,
    setFirstName: (_: string) => {},
    setEmail: (_: string) => {},
    errors: [] as string[],
    emailErrorRenderer: () => null as ReactNode,
    logIn: () => {},
    clearAll: () => {}
});

const useLogin = () => useContext(LoginContext);

const LoginProvider = ({ children }: { children: ReactNode }) => {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const isFormFilled = Boolean(firstName && email);
    const isEmailValid = checkEmail(email);
    const isFormValid = isFormFilled && isEmailValid;

    const errors = [
        !firstName && 'missing required first name',
        (
            !email ? 'missing email address'
            : !isEmailValid && 'incorrect email address'
        )
    ].filter(Boolean) as string[]

    const logIn = () => setIsLoggedIn(isFormValid);

    const clearAll = () => {
        setFirstName('');
        setEmail('');
        setIsLoggedIn(false);
    };

    const value = {
        firstName,
        email,
        emailErrorRenderer,
        isEmailValid,
        isFormValid,
        isLoggedIn,
        setFirstName,
        setEmail,
        errors,
        logIn,
        clearAll
    };

    return (
        <LoginContext.Provider value={value}>
            {children}
        </LoginContext.Provider>
    );
}

export const checkEmail = (email: string): boolean => email.match(emailReg) !== null;

const emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const emailErrorRenderer = () => (
    <ErrorBubble>
        <P color={Colors.error}>Invalid email address</P> 
    </ErrorBubble>
);