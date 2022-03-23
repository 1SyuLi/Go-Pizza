import React from 'react';
import { Platform } from 'react-native';


import { BackButton } from '../../components/BackButton';

import {
    Container,
    Header,
} from './styles';

export function Order() {
    return (
        <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <Header>
                <BackButton onPress={() => { }} style={{ marginBottom: 108 }} />
            </Header>

        </Container>
    );
}