import {Agenda} from "@/types/Agendas";
import {Booking} from "@/types/Bookings";

export default function getAgendas(): Array<Agenda> {
    return [
        {
            id: 1,
            week_day: 2,
            service: {
                id: 1,
                name: "Corte de cabelo",
                professional: {
                    id: 1,
                    name: "John Doe",
                    image: "",
                    email: "aff",
                    role: "PROFESSIONAL",
                    agendamentos: [],
                    agendas: [],
                    professional_role: "Barber",
                    phone_number: 1234567890,
                    pix: "a",
                }
            }
        }
    ]
}