import {User} from "@/types/User";


export function getUsers(): Array<User> {
    return [
        {id: 1, image: "", name: "Davi", email: "example", role: "CUSTOMER"},
        {id: 2, image: "", name: "Deivid", email: "example@example.example", role: "CUSTOMER"},
        {id: 3, image: "", name: "Deivid", email: "example@example.example", role: "CUSTOMER"},
        {id: 4, image: "", name: "Deivid", email: "example@example.example", role: "PROFESSIONAL"},
        {id: 5, image: "", name: "Deivid", email: "example@example.example", role: "ADMIN"},
        {id: 6, image: "", name: "Deivid", email: "example@example.example", role: "CUSTOMER"},
        {id: 7, image: "", name: "Deivid", email: "example@example.example", role: "ADMIN"},
        {id: 8, image: "", name: "Deivid", email: "example@example.example", role: "PROFESSIONAL"},
    ];
}