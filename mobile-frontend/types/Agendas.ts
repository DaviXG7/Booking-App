import {Service} from "@/types/Service";
import {Professional} from "@/types/Professional";

export type Agenda = {
    id: number,
    professional_name:  string,
    professional_photo:  string,
    service_name: string
    week_day: number,
    start_time: string,
    final_time: string,
}

export type AvailableAgenda = {
    id_agenda: number,
    date: string,
    horary: string,
    professional_and_hour: string,
}