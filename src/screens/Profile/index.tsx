import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    Button,
    TextInput
} from 'react-native';



export function Profile() {
    return (
        <View>
            <Text>Profile</Text>

            <TextInput
                placeholder='Nome'
                autoCorrect={false}
            />

            <TextInput
                placeholder='Sobrenome'
                autoCorrect={false}
            />

            <Button
                title='Salvar'
                onPress={() => { }}
            />
        </View>
    )
}