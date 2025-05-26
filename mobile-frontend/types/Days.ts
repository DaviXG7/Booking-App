export enum WeekDay {
    DOMINGO = "Domingo",
    SEGUNDA = "Segunda-feira",
    TERCA = "Terça-feira",
    QUARTA = "Quarta-feira",
    QUINTA = "Quinta-feira",
    SEXTA = "Sexta-feira",
    SABADO = "Sábado"
}

export function getWeekByValue(value: string): WeekDay | undefined {
    return (Object.entries(WeekDay) as [keyof typeof WeekDay, string][])
        .find(([, v]) => v === value)?.[1] as WeekDay | undefined;
}

export function getWeekByIndex(index: number): WeekDay | undefined {
    const values = Object.values(WeekDay);
    return values[index] as WeekDay | undefined;
}

export function getWeekDayValues(): { id: number, name: string }[] {
    return Object.values(WeekDay).map((name, index) => ({
        id: index,
        name
    }));
}
