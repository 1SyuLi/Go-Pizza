import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';

import {
    Container,
    Load,
    TypeProps,
    Title,
} from './styles';

type Props = TouchableOpacityProps & {
    title: string,
    type?: TypeProps,
    isLoading?: boolean,
    enabled?: boolean,
}


export function Button({ title, type = 'primary', isLoading = false, ...rest }: Props) {

    return (
        <Container type={type} enabled={!isLoading} {...rest}>
            {isLoading ? <Load /> : <Title>{title}</Title>}
        </Container>
    )
}