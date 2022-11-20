type UserInput={
    username: string;
    password: string;
}

export async function CheckingInputCreateUser(input: UserInput):Promise<void>{
    const usernameSizeMinimum = 3;
    const passwordSizeMinimum = 8;
    const regex = /^(?=(?:.*?[A-Z]){1})(?=(?:.*?[0-9]){1})(?!.*\s)[0-9a-zA-Z!@#$%;*(){}_+^&]*$/;

    if(input.username.length < usernameSizeMinimum){
        throw new Error("Nome do usuário deve ter pelo menos 3 caracteres");
    } 
    if(input.password.length < passwordSizeMinimum) {
        throw new Error("A senha deve ter pelo menos 8 caracteres");
    }   
    if(!regex.exec(input.password)) {
        throw new Error("A senha deve ter pelo menos 1 número e 1 letra maiúscula");
    }
    return;
}

