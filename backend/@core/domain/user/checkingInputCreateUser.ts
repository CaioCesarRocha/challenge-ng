export async function CheckingUsername(username: string):Promise<boolean>{
    const usernameSizeMinimum = 3;
    if(username.length < usernameSizeMinimum) return false;
    return true;
}

export async function CheckingPassword(password: string):Promise<boolean>{
    const passwordSizeMinimum = 8;
    if(password.length < passwordSizeMinimum) return false;
    return true;
}

export async function CheckingCharacters(password: string):Promise<boolean>{
    var regex = /^(?=(?:.*?[A-Z]){1})(?=(?:.*?[0-9]){1})(?!.*\s)[0-9a-zA-Z!@#$%;*(){}_+^&]*$/; 
    if(!regex.exec(password)) return false;
    return true;
}
