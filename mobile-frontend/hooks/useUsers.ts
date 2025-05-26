import {User} from "@/types/User";
import {Professional} from "@/types/Professional";
import {makeRequest} from "@/hooks/useRequest";


export async function getUsers(): Promise<Array<User | Professional>> {
    return await makeRequest({
        url: "http://127.0.0.1:8000/users",
        method: "GET",
        params: []
    }).then(function (resp) {
        return resp.json().then(function (data) {
            console.log(data)
            return data as Array<User | Professional>;
        }).catch((e) => {
            console.log(e)
            return [];
        });
    })
}

export  async function getProfessionals(): Promise<Array<Professional>> {
    return await getUsers().then((resp) => {
        return resp.filter(user => user.role === "PROFESSIONAL") as Array<Professional>;
    })
}

export  async function getCustomers(): Promise<Array<User>> {
    return await getUsers().then((resp) => {
        return resp.filter(user => user.role === "CUSTOMER") as Array<User>;
    })
}