import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import { Platform, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import {
    Container,
    Header,
    Title,
    DeleteLabel,
    Upload,
    PickImageButton
} from './styles';

import { BackButton } from '../../components/BackButton';
import { Photo } from '../../components/Photo';
import { InputPrice } from '../../components/InputPrice';

export function Product() {

    const [image, setImage] = useState('');

    async function handleImagePicker() {

        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status === 'granted') {
            const result: any = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [4, 4],
            });


            if (!result.cancelled) {
                setImage(result.uri);
            }
        }
    }

    return (
        <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <StatusBar translucent style='light' />
            <Header>

                <BackButton />

                <Title>Cadastrar</Title>

                <TouchableOpacity>
                    <DeleteLabel>Deletar</DeleteLabel>
                </TouchableOpacity>
            </Header>


            <Upload>
                <Photo uri={image} />
                <PickImageButton title='Carregar' onPress={handleImagePicker} />
            </Upload>

            <InputPrice size='P' />
            <InputPrice size='M' />
            <InputPrice size='G' />
        </Container>
    );
}