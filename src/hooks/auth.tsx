import React, { createContext, useContext, ReactNode, useState } from 'react';
import { Alert } from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


type AuthProviderProps = {
    children: ReactNode;
}

type UserProps = {
    id: string,
    name: string,
    isAdmin: boolean,
}

type AuthContextData = {
    signIn: (email: string, password: string) => Promise<void>,
    isLogging: boolean,
    user: UserProps | null,
}




export const AuthContext = createContext({} as AuthContextData);


function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<UserProps | null>(null);
    const [isLogging, setIsLogging] = useState(false);

    async function signIn(email: string, password: string) {
        if (!email || !password) {
            return Alert.alert('Login', 'Informe o e-mail e a senha')
        }

        setIsLogging(true);

        await auth().signInWithEmailAndPassword(email, password)
            .then(account => {

                firestore()
                    .collection('users')
                    .doc(account.user.uid)
                    .get()
                    .then(profile => {
                        const { name, isAdmin, } = profile.data() as UserProps;

                        if (profile.exists) {
                            const userData = {
                                id: account.user.uid,
                                name: name,
                                isAdmin: isAdmin,
                            };

                            console.log(userData);
                            setUser(userData);
                        }
                    }).catch(() => Alert.alert('Login', 'Não foi possível buscar os dados de perfil do usuário'))


            })
            .catch(error => {
                const { code } = error;
                if (code === 'auth/user-not-found' || code === 'auth/wrong-password') {
                    return Alert.alert('login', 'email e/ou senha inválida')
                } else {
                    return Alert.alert('login', 'Não foi possível realizar o login')
                }
            })
            .finally(() => setIsLogging(false))
    }


    return (
        <AuthContext.Provider value={{
            isLogging,
            signIn,
            user,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);

    return context
}

export { useAuth, AuthProvider }