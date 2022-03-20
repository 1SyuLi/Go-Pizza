import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { Platform } from 'react-native';

import {
    Container
} from './styles';

export function Products() {
    return (
        <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <StatusBar translucent style='dark' />



        </Container>
    );
}