type Role = "ADMIN" | "PROFESSIONAL" | "CUSTOMER"

export type User = {
    image: string,
    name: string,
    email: string,
    role: Role
}
