import {Service} from "@/types/Service";
import {Professional} from "@/types/Professional";

export function getServices(): Array<Service> {
    return [
        { id: 1, name: "Corte de cabelo"},
        { id: 2, name: "Legau"},
    ]
}