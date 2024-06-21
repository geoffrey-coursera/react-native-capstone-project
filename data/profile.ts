export { getProfileEntries, saveProfile, initState };
export type { State }

import { getEntries, save } from './asyncStorage';

type State = typeof initState;

const initState = {
    lastName: '',
    phoneNumber: '',
    orderStatus: true,
    passwordChange: true,
    specialOffer: true,
    newsletter: true,
    image: '',
};

const stateFields = Object.keys(initState) as (keyof State)[];

const getProfileEntries = getEntries(initState, stateFields);

const saveProfile = save<State>;