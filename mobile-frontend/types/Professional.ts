import {User} from "@/types/User";
import {Agenda} from "@/types/Agendas";

export type Professional = User &  {

    agendas: Agenda[],
    professional_role: string,
    phone_number: number,
    pix: string,


}