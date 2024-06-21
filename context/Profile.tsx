export { ProfileProvider, useProfile }

import { useLogin } from "@/context/Login";
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
    clearAll: noop,
});

    
const useProfile = () => {
    const context = useContext(ProfileContext);
    const { firstName, setFirstName, email, setEmail } = useLogin();
    return { ...context, firstName, setFirstName, email, setEmail };
};
    
const ProfileProvider = ({ children }: { children: ReactNode }) => {
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [orderStatus, setOrderStatus] = useState(true);
    const [passwordChange, setPasswordChange] = useState(true);
    const [specialOffer, setSpecialOffer] = useState(true);
    const [newsletter, setNewsLetter] = useState(true);
    const [image, setImage] = useState('');
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
        phoneNumber, setPhoneNumber,
        orderStatus, setOrderStatus,
        passwordChange, setPasswordChange,
        specialOffer, setSpecialOffer,
        newsletter, setNewsLetter,
        image, setImage,
        clearAll
    };

    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    );
}