export { ProfileProvider, useProfile }

import ErrorBubble from "@/components/ErrorBubble";
import { P } from "@/components/StyledText";
import { hasChanged } from "@/data/asyncStorage";
import { initState, State, getProfileEntries, saveProfile } from "@/data/profile";
import Colors from "@/lib/Colors";
import { loadStateFromObject, loadStateFromGetter } from "@/lib/react";
import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";

const init = {
    ...initState,
    setLastName: (a: string) => {},
    setPhoneNumber: (a: string) => {},
    setOrderStatus: (a: boolean) => {},
    setPasswordChange: (a: boolean) => {},
    setSpecialOffer: (a: boolean) => {},
    setNewsletter: (a: boolean) => {},
    setImage: (a: string) => {},
    isPhoneNumberValid: false,
    errors: [] as string[],
    phoneErrorRenderer: () => null as ReactNode,
    clearAll: () => {},
    loadStateFromStorage: () => Promise.resolve(),
    profileHasChanged: () => Promise.resolve([] as string[])
};

const ProfileContext = createContext({...init, save: () => {}});

const useProfile = () => useContext(ProfileContext);
    
const ProfileProvider = ({ children }: { children: ReactNode }) => {
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [orderStatus, setOrderStatus] = useState(true);
    const [passwordChange, setPasswordChange] = useState(true);
    const [specialOffer, setSpecialOffer] = useState(true);
    const [newsletter, setNewsletter] = useState(true);
    const [image, setImage] = useState('');
    const isPhoneNumberValid = checkPhoneNumber(phoneNumber);

    const errors = [
        !(isPhoneNumberValid || phoneNumber === '') && 'incorrect phone number'
    ].filter(Boolean) as string[];

    const clearAll = useCallback(() => {
        loadStateFromObject(context, initState);
        saveProfile(initState);
    }, []);

    const loadStateFromStorage = useCallback(() =>
        loadStateFromGetter(context, getProfileEntries),
    []);

    useEffect(() => { loadStateFromStorage() }, []);

    const state = {
        lastName,
        phoneNumber,
        orderStatus,
        passwordChange,
        specialOffer,
        newsletter,
        image,
    } satisfies State;

    const profileHasChanged = useCallback(
        () => getProfileEntries().then(hasChanged(state)),
        [state]
    );

    const context = {
        ...state,
        setLastName,
        setPhoneNumber,
        isPhoneNumberValid,
        phoneErrorRenderer,
        setOrderStatus,
        setPasswordChange,
        setSpecialOffer,
        setNewsletter,
        setImage,
        errors,
        clearAll,
        loadStateFromStorage,
        profileHasChanged
    };

    const save = () => saveProfile(state);

    return (
        <ProfileContext.Provider value={{...context, save}}>
            {children}
        </ProfileContext.Provider>
    );
}

const checkPhoneNumber = (phone: string): boolean => {
    const normalised = normalisePhoneNumber(phone);
    return normalised.match(phoneReg) !== null;
}

const normalisePhoneNumber = (phone: string) =>
    phone.replace(leadingZeros, '')
        .replace(optionalZeroNotation, '')
        .replace(/\D/g, '');


const leadingZeros = /^00/;
const optionalZeroNotation = '(0)'
const countryCode = '[1-9]{1}[0-9]{0,2}';
const areaCode = '[2-9]{1}[0-9]{2}';
const telPrefix = '[0-9]{3}';
const lineNumber = '[0-9]{4}';

const phoneReg = new RegExp(`^${countryCode}${areaCode}${telPrefix}${lineNumber}$`);

const phoneErrorRenderer = () => (
    <ErrorBubble>
        <P color={Colors.error}>We expect an international phone number with a country code, followed by 10 digits.</P>
        <P color={Colors.error}>You can format it any way you like.</P>
        <P color={Colors.error}>If you live in the United States, your country code is 1.</P>
    </ErrorBubble>
);