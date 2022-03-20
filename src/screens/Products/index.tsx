import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { Platform, TouchableOpacity } from 'react-native';

import {
    Container,
    Header,
    Title,
    DeleteLabel,
    Upload,
    PickImageButton
} from './styles';

import { BackButton } from '../../components/BackButton';
import { Photo } from '../../components/Photo';

export function Products() {
    return (
        <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <StatusBar translucent style='light' />
            <Header>

                <BackButton />

                <Title>Cadastrar</Title>

                <TouchableOpacity>
                    <DeleteLabel>Deletar</DeleteLabel>
                </TouchableOpacity>
            </Header>


            <Upload>
                <Photo uri="" />
                <PickImageButton title='Carregar' />
            </Upload>


        </Container>
    );
}