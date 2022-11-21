import {User, UserProps } from './user.entity';

describe('Testing User Entity', () =>{      
    it('testing constructor',() =>{
        const userProps: UserProps ={
            username: 'Silver',
            password: '12345'
        }
        const newUser = User.create(userProps)
        expect(newUser.id).toBeDefined()
        expect(newUser.props).toHaveProperty('accountId')
        expect(newUser.props.username).toStrictEqual('Silver')
        expect(newUser.props.password).toStrictEqual('12345')
})

    it('Testing Update Username',() =>{
        const userProps: UserProps ={
            username: 'Silver',
            password: '12345'
        }
        const newUser = User.create(userProps)
        newUser.updateUsername('Scopper')
        expect(newUser.id).toBeDefined()
        expect(newUser.props.username).toStrictEqual('Scopper')
    })
})