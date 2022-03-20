import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { Alert } from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
    signOut: () => Promise<void>,
}


const USER_COLLECTION = '@gopizza:users';

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
                    .then(async (profile) => {
                        const { name, isAdmin, } = profile.data() as UserProps;

                        if (profile.exists) {
                            const userData = {
                                id: account.user.uid,
                                name: name,
                                isAdmin: isAdmin,
                            };

                            await AsyncStorage.setItem('USER_COLLECTION', JSON.stringify(userData))
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

    async function loadUserStorageData() {
        setIsLogging(true);

        const storedUser = await AsyncStorage.getItem(USER_COLLECTION);

        if (storedUser != null) {
            const userData = JSON.parse(storedUser) as UserProps;
            console.log(userData);
            setUser(userData);
        }


        setIsLogging(false);
    }

    async function signOut() {
        await auth().signOut();
        await AsyncStorage.removeItem(USER_COLLECTION);
        setUser(null);
    }

    useEffect(() => {
        loadUserStorageData();
    }, [])


    return (
        <AuthContext.Provider value={{
            user,
            isLogging,
            signIn,
            signOut,
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