import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import { useAuth } from '../../hooks/auth';

import { Inputs } from '../../components/Inputs';
import { Button } from '../../components/Button';

import brandImg from '../../assets/brand.png';

import {
    Container,
    Content,
    Title,
    Brand,
    ForgotPasswordButton,
    ForgotPasswordLabel
} from './styles';

export function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signIn, isLogging, forgotPassword } = useAuth();

    function handleSignIn() {

        signIn(email, password);
    }

    function handleForgotPassword() {
        forgotPassword(email)
    }
    return (
        <Container>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <Content>

                    <Brand source={brandImg} />

                    <Title>Login</Title>

                    <Inputs placeholder='E-mail' type='secondary' autoCorrect={false} autoCapitalize='none'
                        onChangeText={setEmail}
                    />
                    <Inputs placeholder='Senha' type='secondary' secureTextEntry
                        onChangeText={setPassword}
                    />

                    <ForgotPasswordButton onPress={handleForgotPassword}>
                        <ForgotPasswordLabel>
                            Esqueci minha senha
                        </ForgotPasswordLabel>
                    </ForgotPasswordButton>

                    <Button type='secondary' isLoading={isLogging} title='Enviar'
                        onPress={handleSignIn}
                    />
                </Content>
            </KeyboardAvoidingView>
        </Container>
    )
}