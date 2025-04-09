import {Agenda} from "@/types/Agendas";
import {User} from "@/types/User";

export type Booking = {
    id: number,
    date_time: string,
    agenda: Agenda,
    customer: User,
}