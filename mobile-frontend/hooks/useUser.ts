import {User} from "@/types/User";

let currentUser: User | undefined = {
    id: 1,
    image: "",
    name: "Davi",
    email: "example",
    role: "CUSTOMER"
};


export function isLogged() {
    return currentUser !== undefined;
}

export function useCurrentUser() {
    return currentUser;
}

export function login() {

}