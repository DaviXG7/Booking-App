import {Booking} from "@/types/Bookings";

type Role = "ADMIN" | "PROFESSIONAL" | "CUSTOMER"

export type User = {
    id: number,
    image: string,
    name: string,
    email: string,
    role: Role,
    agendamentos: Booking[]
}
