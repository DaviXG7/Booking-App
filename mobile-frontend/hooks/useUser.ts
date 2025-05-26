import {User} from "@/types/User";
import {RequestForm} from "@/types/Form";

let currentUser: User | undefined = undefined;


export function isLogged() {
    return currentUser !== undefined;
}

export function useCurrentUser() {
    return currentUser;
}

export function login(user: User) {
    currentUser = user;
}