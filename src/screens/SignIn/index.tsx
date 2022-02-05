import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Inputs } from '../../components/Inputs';
import { Button } from '../../components/Button';


import {
    Container,
    Content
} from './styles';

export function SignIn(){

    return(
        <Container>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <Inputs placeholder='E-mail' type='secondary' autoCorrect={false} autoCapitalize='none'/>
                <Inputs placeholder='Senha' type='secondary' secureTextEntry/>

                <Button type='secondary' isLoading={false} title='Enviar'/>
            </KeyboardAvoidingView>
        </Container>
    )
}