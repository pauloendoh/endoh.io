export default interface MyAxiosError {
    response?: {
        data: {
            errors: MyFieldError[]
        }
    },
    status: number,
    statusText: string
}

export interface MyFieldError {
    message: string,
    field: string
}