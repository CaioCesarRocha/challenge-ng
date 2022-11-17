import { useState, useEffect } from "react"
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom";
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { User, LockKey } from 'phosphor-react';
import { ContainerInput, DeliveryContainer, DeliveryContent } from "./styles";
import { VerifyInputForm } from "../../services/utils/verifyInputForm";
import useAuth from "../../hooks/useAuth";

const newFormUserSchema = z.object({
    username: z.string(),
    password: z.string(),
    confirmPassword: z.string().optional(),
  })

type NewUserFormInputs = z.infer<typeof newFormUserSchema>

export function AuthenticateUser() {
    const [screen, setScreen] = useState<'Login'|'Register'>('Login');
    const { login, registerUser, error, user, setErrorForm} = useAuth();
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<NewUserFormInputs>({
        resolver: zodResolver(newFormUserSchema),
    })

    useEffect(() => {
        if (user.username !== '') navigate('/')
    }, [user, navigate])

    useEffect(() => {
        if(error?.active) alert(error.msg);
    }, [error])

    async function handleLogin(data: NewUserFormInputs) {
        if (screen === 'Login') { 
            await login(data);
            return;
        }     
        const verifyInputForm = await VerifyInputForm(data);
        if(verifyInputForm) {
            await setErrorForm(verifyInputForm)
            return;
        }
        if(screen === 'Register') {
            await registerUser(data);
            return;
        }; 
    }

    return (
        <DeliveryContainer>
            <DeliveryContent>
                <h1> {screen === 'Login' ? 'Login' : 'Cadastrar Usuário'}</h1>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <ContainerInput >
                        <i><User size={25}/></i>
                        <input
                            type="text"
                            placeholder="Nome do usuário"
                            required
                            {...register('username')}
                        />          
                    </ContainerInput>
                    <ContainerInput >
                        <i><LockKey size={25}/></i>
                        <input
                            type="password"
                            placeholder="Senha"
                            required
                            {...register('password')}
                        />          
                    </ContainerInput>
                    { screen === 'Register' ? 
                        <>
                            <ContainerInput >
                                <i><LockKey size={25}/></i>
                                <input
                                    type="password"
                                    placeholder="Confirme a senha"
                                    required
                                    {...register('confirmPassword')}
                                />          
                            </ContainerInput> 
                            <p>
                                Já possui Conta?
                                <a href="#/" onClick={() => {setScreen('Login') }}>
                                    Fazer login aqui.
                                </a>
                            </p> 
                        </> 
                    :
                        <p>
                            Ainda não possui Conta?
                            <a href="#/" onClick={() => {setScreen('Register') }}>
                                Cadastrar aqui.
                            </a>
                        </p>
                    }                 
                    <button type="submit" disabled={isSubmitting}>
                        {screen === 'Login' ? 'Entrar' : 'Cadastrar'}
                    </button>
                </form>
            </DeliveryContent>
        </DeliveryContainer>
    )
}