import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import {
    Container,
    Description,
    Image,
    Name,
    StatusContainer,
    StatusLabel,
    StatusTypesProps,
} from './styles';

type Props = TouchableOpacityProps & {
    index: number,
}

export function OrderCard({ index, ...rest }: Props) {
    return (
        <Container index={index} {...rest}>
            <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/gopizza-6c572.appspot.com/o/pizzas%2F1648043701771.png?alt=media&token=08f236be-52f9-419c-a5fa-84ee4e993914' }} />

            <Name>4 Queijos</Name>
            <Description>Mesa 5 ⚬ Qnt: 1</Description>

            <StatusContainer status='Pronto'>
                <StatusLabel status='Pronto'>Pronto</StatusLabel>
            </StatusContainer>
        </Container>
    );
}