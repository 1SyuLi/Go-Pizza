import React from 'react';
import { StatusBar } from 'expo-status-bar';

import {
    Container,
    Header,
    Title,
} from './styles';

export function Orders() {
    return (
        <Container>
            <StatusBar style='light' />

            <Header>
                <Title>Pedidos feitos</Title>
            </Header>
        </Container>
    );
}