interface propsVerifyInputForm{
    username: string;
    password: string;
    confirmPassword?: string;
}

export const VerifyInputForm = (props: propsVerifyInputForm) =>{
    const usernameSizeMinimum = 3;
    const passwordSizeMinimum = 8;
    const regex = /^(?=(?:.*?[A-Z]){1})(?=(?:.*?[0-9]){1})(?!.*\s)[0-9a-zA-Z!@#$%;*(){}_+^&]*$/;
   
    if(props.username.length < usernameSizeMinimum){
        return 'Nome do usuário deve ter pelo menos 3 caracteres';
    } 
    if(props.password !== props?.confirmPassword){
        return 'Senhas não são iguais';
    }
    if(props.password.length < passwordSizeMinimum) {
        return 'Senha deve ter pelo menos 8 caracteres';
    }   
    if(!regex.exec(props.password)) {
        return 'Senha deve ter pelo menos 1 número e uma letra maiúscula';
    }
    return;
}