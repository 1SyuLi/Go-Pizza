import React, { useState, useCallback, } from 'react';
import { Alert, TouchableOpacity, FlatList } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from 'styled-components';

import happyEmoji from '../../assets/happy.png';

import { Search } from '../../components/Search';
import { ProductCard, ProductProps } from '../../components/ProductCard';


import firestore from '@react-native-firebase/firestore';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';



import {
    Container,
    Header,
    Greeting,
    GreetingEmoji,
    GreetingText,
    MenuHeader,
    Title,
    MenuItemsNumber,
    NewProductButton,
} from './styles';


export function Home() {


    const theme = useTheme();
    const [pizzas, setPizzas] = useState<ProductProps[]>([]);
    const [search, setSearch] = useState('');
    const navigation = useNavigation();

    const { signOut, user } = useAuth();

    async function fetchPizza(value: string) {
        const formattedValue = value.toLocaleLowerCase().trim();

        await firestore()
            .collection('pizzas')
            .orderBy('name_insensivite')
            .startAt(formattedValue)
            .endAt(`${formattedValue}\uf8ff`)
            .get()
            .then(response => {
                const data = response.docs.map(doc => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                }) as ProductProps[];

                setPizzas(data);
            }).catch(() => Alert.alert('Consulta', 'Não foi possível realizar a consulta'));
    }

    function handleSearch() {
        fetchPizza(search)
    }

    function handleSearchClear() {
        setSearch('');
        fetchPizza('');
    }

    function handleOPen(id: string) {
        navigation.navigate('product', { id })
    }

    function handleAdd() {
        navigation.navigate('product', {})
    }



    useFocusEffect(
        useCallback(() => {
            fetchPizza('');
        }, [])
    )



    return (
        <Container>
            <StatusBar translucent style='light' />

            <Header>
                <Greeting>
                    <GreetingEmoji source={happyEmoji} />
                    <GreetingText>Olá, Admin</GreetingText>
                </Greeting>

                <TouchableOpacity onPress={signOut}>
                    <MaterialIcons name="logout" color={theme.COLORS.TITLE} size={24} />
                </TouchableOpacity>
            </Header>

            <Search
                onChangeText={setSearch}
                value={search}
                onSearch={handleSearch}
                onClear={handleSearchClear}
            />

            <MenuHeader>
                <Title>Cardápio</Title>
                <MenuItemsNumber>{pizzas.length} pizzas</MenuItemsNumber>
            </MenuHeader>

            <FlatList
                data={pizzas}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <ProductCard
                        data={item}
                        onPress={() => handleOPen(item.id)}
                    />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingTop: 20,
                    paddingBottom: 125,
                    marginHorizontal: 24,
                }}
            />

            {
                user.isAdmin &&
                <NewProductButton
                    title='Cadastrar Pizza'
                    type='primary'
                    onPress={handleAdd}
                />
            }

        </Container>
    );
}