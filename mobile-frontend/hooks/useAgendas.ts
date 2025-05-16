import {Agenda} from "@/types/Agendas";
import {Booking} from "@/types/Bookings";
import {Professional} from "@/types/Professional";
import {Service} from "@/types/Service";

export default function getAgendas(): Array<Agenda> {
    return [
        {
            id: 1,
            professional: {id: 10, image: "", name: "AFF2", email: "example@example.example", role: "PROFESSIONAL", phone_number: 0, pix: "0", professional_role: "", account_number: "1", agency: "a", bank_name: "b"},
            service: { id: 1, name: "Corte de cabelo"},
            week_day: 1,
            start_time: "10:00",
        }
    ]
}