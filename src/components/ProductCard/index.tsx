import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { TouchableOpacityProps } from 'react-native';

import {
    Container,
    Content,
    Description,
    Details,
    Image,
    Line,
    Name,
    Identificator,
} from './styles';

export type ProductProps = {
    id: string,
    photo_url: string,
    name: string,
    description: string,
}


type Props = TouchableOpacityProps & {
    data: ProductProps,
}

export function ProductCard({ data, ...rest }: Props) {

    const theme = useTheme();

    return (
        <Container>
            <Content {...rest}>
                <Image source={{ uri: data.photo_url }} />

                <Details>
                    <Identificator>
                        <Name>{data.name}</Name>
                        <Feather name='chevron-left' size={18} color={theme.COLORS.SHAPE} />
                    </Identificator>

                    <Description>{data.description}</Description>
                </Details>
            </Content>

            <Line />
        </Container>
    );
}