export { getLoginEntries, saveLogin, initState };
export type { State }

import { getEntries, save } from './asyncStorage';

type State = typeof initState;

const initState = { isLoggedIn: false, firstName: '', email: '' };

const stateFields = Object.keys(initState) as (keyof State)[];

const getLoginEntries = getEntries(initState, stateFields);

const saveLogin = save<State>;