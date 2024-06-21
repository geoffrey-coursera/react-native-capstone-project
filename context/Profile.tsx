export { ProfileProvider, useProfile }

import ErrorBubble from "@/components/ErrorBubble";
import { P } from "@/components/StyledText";
import { useLogin } from "@/context/Login";
import Colors from "@/lib/Colors";
import { ReactNode, createContext, useContext, useState } from "react";

const noop = (..._: any[]) => {}

const ProfileContext = createContext({
    lastName: '',
    phoneNumber: '',
    orderStatus: false,
    passwordChange: true,
    specialOffer: false,
    newsletter: false,
    image: '',
    setLastName: noop,
    setPhoneNumber: noop,
    setOrderStatus: noop,
    setPasswordChange: noop,
    setSpecialOffer: noop,
    setNewsLetter: noop,
    setImage: noop,
    isPhoneNumberValid: false,
    errors: [] as string[],
    phoneErrorRenderer: () => null as ReactNode,
    clearAll: noop,
});

    
const useProfile = () => {
    const context = useContext(ProfileContext);
    const { firstName, setFirstName, email, setEmail } = useLogin();
    const saveProfile = () => {};
    return { ...context, firstName, setFirstName, email, setEmail, saveProfile };
};
    
const ProfileProvider = ({ children }: { children: ReactNode }) => {
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [orderStatus, setOrderStatus] = useState(true);
    const [passwordChange, setPasswordChange] = useState(true);
    const [specialOffer, setSpecialOffer] = useState(true);
    const [newsletter, setNewsLetter] = useState(true);
    const [image, setImage] = useState('');
    const isPhoneNumberValid = checkPhoneNumber(phoneNumber);

    const errors = [
        !(isPhoneNumberValid || phoneNumber === '') && 'incorrect phone number'
    ].filter(Boolean) as string[];

    const clearAll = () => {
        setLastName('');
        setPhoneNumber('');
        setOrderStatus(true);
        setPasswordChange(true);
        setSpecialOffer(true);
        setNewsLetter(true);
        setImage('')
    };

    const value = {
        lastName, setLastName,
        phoneNumber, setPhoneNumber, isPhoneNumberValid, phoneErrorRenderer,
        orderStatus, setOrderStatus,
        passwordChange, setPasswordChange,
        specialOffer, setSpecialOffer,
        newsletter, setNewsLetter,
        image, setImage,
        errors,
        clearAll
    };

    return (
        <ProfileContext.Provider value={value}>
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