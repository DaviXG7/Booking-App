import {Booking} from "@/types/Bookings";

export default function getAgendamentos(): Array<Booking> {
    return [
        {
            id: 1,
            customer: {id: 1, image: "", name: "Davi", email: "example", role: "CUSTOMER", agendamentos: []},
            date_time: "2023-10-01T10:00:00Z",
            agenda: {
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
        }
    ]
}