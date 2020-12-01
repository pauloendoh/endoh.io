export interface AuthUserGetDto {
    id: number
    username: string
    email: string
    picture: string

    token: string
    expiresAt: string 
}