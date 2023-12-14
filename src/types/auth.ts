
export interface user {
    user_id: number,
    email: string,
    paid: boolean,
    isAdmin: boolean
}

export interface AccountCredentials {
    phoneNumber: string,
    email: string,
    password: string
}