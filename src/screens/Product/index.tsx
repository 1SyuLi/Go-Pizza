import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import { Platform, TouchableOpacity, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';


import { BackButton } from '../../components/BackButton';
import { Photo } from '../../components/Photo';
import { InputPrice } from '../../components/InputPrice';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';


import {
    Container,
    Header,
    Title,
    DeleteLabel,
    Upload,
    PickImageButton,
    Form,
    InputGroup,
    InputGroupHeader,
    Label,
    MaxCharacters
} from './styles';

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

            <ScrollView showsVerticalScrollIndicator={false}>
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

                <Form>

                    <InputGroup>
                        <Label>Nome</Label>
                        <Input />
                    </InputGroup>

                    <InputGroup>
                        <InputGroupHeader>
                            <Label>Descrição</Label>
                            <MaxCharacters>0 de 60 caracteres</MaxCharacters>
                        </InputGroupHeader>

                        <Input multiline maxLength={60} style={{ height: 80 }} />
                    </InputGroup>

                    <InputGroup>
                        <Label>Tamanhos e preços</Label>

                        <InputPrice size='P' />
                        <InputPrice size='M' />
                        <InputPrice size='G' />
                    </InputGroup>

                    <Button title='Cadastrar Pizza' type='secondary' />
                </Form>

            </ScrollView>
        </Container>
    );
}