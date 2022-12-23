import {compare, hash} from 'bcrypt'

export async function checkPassword(plainpassword:string,hashedPassword:string) {
    return await compare(plainpassword,hashedPassword)
}


export async function hashPassword(plainPassword:string) {
    const SALT = 10
    return await hash(plainPassword,SALT)
}

export function checkValidPassword(plainPassword:string) {
    return true
}