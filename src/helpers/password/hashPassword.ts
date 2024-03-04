import { hash } from 'bcrypt';

export async function HashPassword(password) {

    const passHash = await hash(password, 10)

    return passHash

}