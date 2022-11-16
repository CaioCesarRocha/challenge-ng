type UserInput={
    username: string;
    password: string;
}

export async function CheckingInputCreateUser(input: UserInput):Promise<void>{
    const usernameSizeMinimum = 3;
    const passwordSizeMinimum = 8;
    const regex = /^(?=(?:.*?[A-Z]){1})(?=(?:.*?[0-9]){1})(?!.*\s)[0-9a-zA-Z!@#$%;*(){}_+^&]*$/;

    if(input.username.length < usernameSizeMinimum){
        throw new Error("Username should has at least 3 characters");
    } 
    if(input.password.length < passwordSizeMinimum) {
        throw new Error("Password should has at least 8 characters");
    }   
    if(!regex.exec(input.password)) {
        throw new Error("Password should has at least 1 number and 1 capital letter");
    }
    return;
}

