export { LoginProvider, useLogin }

import ErrorBubble from "@/components/ErrorBubble";
import { P } from "@/components/StyledText";
import { hasChanged } from "@/data/asyncStorage";
import { initState, State, getLoginEntries, saveLogin } from "@/data/login";
import Colors from "@/lib/Colors";
import { loadStateFromGetter, loadStateFromObject } from "@/lib/react";
import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";

const init = {
    ...initState,
    setIsLoggedIn: (a: boolean) => {},
    isEmailValid: true,
    isFormValid: true,
    setFirstName: (a: string) => {},
    setEmail: (a: string) => {},
    errors: [] as string[],
    emailErrorRenderer: () => null as ReactNode,
    logIn: () => {},
    clearAll: () => {},
    isStorageLoaded: false,
    loadStateFromStorage: () => Promise.resolve(),
    loginHasChanged: () => Promise.resolve([] as string[])
};

const LoginContext = createContext({...init, save: () => {}});

const useLogin = () => useContext(LoginContext);

const LoginProvider = ({ children }: { children: ReactNode }) => {
    const [isStorageLoaded, setIsStorageLoaded] = useState(false);
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
    useEffect(() => { isLoggedIn && save() }, [isLoggedIn]);

    const clearAll = useCallback(() => {
        loadStateFromObject(context, initState);
        saveLogin(initState);
    }, []);

    const loadStateFromStorage = useCallback(() =>
        loadStateFromGetter(context, getLoginEntries),
    []);

    useEffect(() => {
        loadStateFromStorage().then(() => setIsStorageLoaded(true))
    }, []);

    const state = { isLoggedIn, firstName, email } satisfies State;

    const loginHasChanged = useCallback(
        () => getLoginEntries().then(hasChanged(state)),
        [state]
    );
    
    const context = {
        ...state,
        setIsLoggedIn,
        emailErrorRenderer,
        isEmailValid,
        isFormValid,
        setFirstName,
        setEmail,
        errors,
        logIn,
        clearAll,
        isStorageLoaded,
        loadStateFromStorage,
        loginHasChanged
    };
    
    const save = () => { saveLogin(state); }

    return (
        <LoginContext.Provider value={{...context, save}}>
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