import React, { useState } from 'react';
import { Platform, ScrollView } from 'react-native';


import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { RadioButton } from '../../components/RadioButton';
import { PIZZAS_TYPES } from '../../utils/pizzaTypes';

import {
    Container,
    ContentScroll,
    Header,
    Photo,
    Sizes,
    Form,
    FormRow,
    InputGroup,
    Label,
    Price,
    Title,
} from './styles';

export function Order() {

    const [size, setSize] = useState('');

    return (
        <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ContentScroll>
                <Header>
                    <BackButton
                        onPress={() => { }}
                        style={{ marginBottom: 108 }}
                    />
                </Header>

                <Photo source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/gopizza-6c572.appspot.com/o/pizzas%2F1648043701771.png?alt=media&token=08f236be-52f9-419c-a5fa-84ee4e993914' }} />

                <Form>

                    <Title>Nome da pizza</Title>
                    <Label>Selecione um tamanho</Label>

                    <Sizes>
                        {PIZZAS_TYPES.map(item => (
                            <RadioButton
                                key={item.id}
                                title={item.name}
                                selected={size === item.id}
                                onPress={() => setSize(item.id)}
                            />
                        ))}
                    </Sizes>

                    <FormRow>
                        <InputGroup>
                            <Label>Número da mesa</Label>
                            <Input keyboardType='numeric' />
                        </InputGroup>

                        <InputGroup>
                            <Label>Quantidade</Label>
                            <Input keyboardType='numeric' />
                        </InputGroup>
                    </FormRow>

                    <Price>Valor de R$ 00,00</Price>

                    <Button title='Confirmar Pedido' />

                </Form>
            </ContentScroll>
        </Container>
    );
}