import {Booking} from "@/types/Bookings";
import {User} from "@/types/User";
import {makeRequest} from "@/hooks/useRequest";
import {Agenda} from "@/types/Agendas";

export default async function getAgendamentos(): Promise<Array<Booking>> {
    return await makeRequest({
        url: "http://127.0.0.1:8000/booking/list",
        method: "GET",
        params: []
    }).then(function (resp) {
        return resp.json().then(function (data) {
            console.log(data)
            return data as Array<Booking>;
        }).catch((e) => {
            console.log(e)
            return [];
        });
    })
}

export async function getAgendamentosByUser(user: User | undefined): Promise<Array<Booking>> {
    if (!user) return []
    return await makeRequest({
        url: "http://127.0.0.1:8000/booking/list/user",
        method: "GET",
        params: [
            {
                key: "id_user",
                value: user.id + "",
                isRequired: true
            }
        ]
    }).then(function (resp) {
        return resp.json().then(function (data) {
            console.log(data)
            return data as Array<Booking>;
        }).catch((e) => {
            console.log(e)
            return [];
        });
    })
}