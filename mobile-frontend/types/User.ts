import {Booking} from "@/types/Bookings";

export type Role = "ADMIN" | "PROFESSIONAL" | "CUSTOMER"

export type User = {
    id: number,
    image: string,
    name: string,
    email: string,
    role: Role,
}
