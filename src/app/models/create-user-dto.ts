export interface CreateUserDTO {
    name: string,
    phone: string,
    email: string,
    password: string,
    photoUrl: string,
    dateBirth: Date,
    rol: 'USER' | 'HOST'
}
