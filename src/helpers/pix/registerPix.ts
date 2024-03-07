export async function diffTypePix(type, user) {

    if(type === 'cpf') return user.cpf
    else if(type === 'telephone') return user.telephone
    else return user.email
    
}