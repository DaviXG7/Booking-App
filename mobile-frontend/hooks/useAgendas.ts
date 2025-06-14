import {Agenda} from "@/types/Agendas";
import {makeRequest} from "@/hooks/useRequest";

export async function getAgendas(): Promise<Array<Agenda>> {
    return await makeRequest({
        url: "http://127.0.0.1:8000/agenda/list",
        method: "GET",
        params: []
    }).then(function (resp) {
        return resp.json().then(function (data) {
            console.log(data)
            return data as Array<Agenda>;
        }).catch((e) => {
            console.log(e)
            return [];
        });
    })
}
export async function getAgendasByProfessional(id_professional: string): Promise<Array<Agenda>> {
    return await makeRequest({
        url: "http://127.0.0.1:8000/agenda/list/professional",
        method: "GET",
        params: [
            {
                key: "id_professional",
                value: id_professional,
                isRequired: true
            }
        ]
    }).then(function (resp) {
        return resp.json().then(function (data) {
            console.log(data)
            return data as Array<Agenda>;
        }).catch((e) => {
            console.log(e)
            return [];
        });
    })
}