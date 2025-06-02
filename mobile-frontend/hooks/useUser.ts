import {User} from "@/types/User";
import {RequestForm} from "@/types/Form";
import {Professional} from "@/types/Professional";

let currentUser: User | Professional | undefined = undefined;


export function isLogged() {
    return currentUser !== undefined;
}

export function useCurrentUser() {
    return currentUser;
}

export function login(user: User | Professional) {
    currentUser = user;
    console.log(user)
}