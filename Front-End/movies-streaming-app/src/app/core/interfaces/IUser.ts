export interface IUserType{
    role : string // "user", "admin"
}

export enum Gender {
    male,
    female
}

export interface IUser{
    firstName: string,
    lastName: string,
    email: string,
    birthDate: string,
    gender: Gender
}