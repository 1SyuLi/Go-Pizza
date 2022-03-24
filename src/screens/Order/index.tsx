import React, { useState, useEffect } from 'react';
import { Alert, Platform, ScrollView } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { RadioButton } from '../../components/RadioButton';
import { ProductProps } from '../../components/ProductCard';
import { PIZZAS_TYPES } from '../../utils/pizzaTypes';

import firestore from '@react-native-firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';
import { OrderNavigationProps } from '../../@types/navigation';

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


type PizzaResponse = ProductProps & {
    prices_sizes: {
        [key: string]: number;
    }
}

export function Order() {

    const [size, setSize] = useState('');
    const [pizza, setPizza] = useState<PizzaResponse>({} as PizzaResponse);
    const navigation = useNavigation();

    const route = useRoute();
    const { id } = route.params as OrderNavigationProps;

    function handleBackButton() {
        navigation.goBack();
    }

    useEffect(() => {
        if (id) {
            firestore()
                .collection('pizzas')
                .doc(id)
                .get()
                .then(response => setPizza(response.data() as PizzaResponse))
                .catch(() => Alert.alert('Pedido', 'Não foi possível carregar o produto'))
        }

    }, [id])

    return (
        <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <StatusBar translucent style='light' />
            <ContentScroll>
                <Header>
                    <BackButton
                        onPress={handleBackButton}
                        style={{ marginBottom: 108 }}
                    />
                </Header>

                <Photo source={{ uri: pizza.photo_url }} />

                <Form>

                    <Title>{pizza.name}</Title>
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