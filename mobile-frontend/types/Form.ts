export type Param = {

    key: string,
    value: string | null | undefined,
    isRequired: boolean,

}

export type RequestForm = {
    url: string,
    method: string,

    params: Param[],
}
