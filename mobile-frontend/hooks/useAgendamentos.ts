import {Booking} from "@/types/Bookings";
import {User} from "@/types/User";

export default function getAgendamentos(): Array<Booking> {
    return [
        {
            id: 1,
            customer: {id: 1, image: "", name: "Davi", email: "example", role: "CUSTOMER"},
            date_time: "2023-10-01T10:00:00Z",
            agenda: {
                id: 1,
                professional: {id: 10, image: "", name: "AFF2", email: "example@example.example", role: "PROFESSIONAL", phone_number: 0, pix: "0", professional_role: "", account_number: "1", agency: "a", bank_name: "b"},
                service: { id: 1, name: "Corte de cabelo"},
                week_day: 1,
                start_time: "10:00",
            }
        }
    ]
}

export function getAgendamentosByUser(user: User | undefined): Array<Booking> {
    if (!user) return []
    return []
}