import {Service} from "@/types/Service";
import {Professional} from "@/types/Professional";

export type Agenda = {
    id: number,
    professional: Professional,
    service: Service,
    week_day: number,
    start_time: string,
}