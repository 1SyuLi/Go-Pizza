import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components';

import happyEmoji from '../../assets/happy.png';

import { Search } from '../../components/Search';


import {
    Container,
    Header,
    Greeting,
    GreetingEmoji,
    GreetingText,
    MenuHeader,
    Title,
    MenuItemsNumber,
} from './styles';


export function Home() {


    const theme = useTheme();


    return (
        <Container>
            <StatusBar translucent style='light' />

            <Header>
                <Greeting>
                    <GreetingEmoji source={happyEmoji} />
                    <GreetingText>Olá, Admin</GreetingText>
                </Greeting>

                <TouchableOpacity>
                    <MaterialIcons name="logout" color={theme.COLORS.TITLE} size={24} />
                </TouchableOpacity>
            </Header>

            <Search onSearch={() => { }} onClear={() => { }} />

            <MenuHeader>
                <Title>Cardápio</Title>
                <MenuItemsNumber>10 pizzas</MenuItemsNumber>
            </MenuHeader>
        </Container>
    );
}