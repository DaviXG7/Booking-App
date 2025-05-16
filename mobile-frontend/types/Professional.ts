import {User} from "@/types/User";
import {Agenda} from "@/types/Agendas";

export type Professional = User &  {

    professional_role: string,
    phone_number: number,
    pix: string,
    bank_name: string,
    account_number: string,
    agency: string,


}