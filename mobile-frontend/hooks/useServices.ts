import {Service} from "@/types/Service";
import {makeRequest} from "@/hooks/useRequest";

export async function getServices(): Promise<Array<Service>> {
    return await makeRequest({
        url: "http://127.0.0.1:8000/services/list",
        method: "GET",
        params: []
    }).then(function (resp) {
        return resp.json().then(function (data) {
            console.log(data)
            return data as Array<Service>;
        }).catch((e) => {
            console.log(e)
            return [];
        });
    })
}