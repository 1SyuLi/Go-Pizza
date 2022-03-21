import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import { Platform, TouchableOpacity, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

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
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [priceSizeP, setPriceSizeP] = useState('');
    const [priceSizeM, setPriceSizeM] = useState('');
    const [priceSizeG, setPriceSizeG] = useState('');
    const [ísLoading, setIsLoading] = useState(false);

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

    async function handleAdd() {
        if (!name.trim()) {
            return Alert.alert('Cadastro', 'Informe o nome da pizza.');
        }

        if (!description.trim()) {
            return Alert.alert('Cadastro', 'Informe a description da pizza.');
        }

        if (!image) {
            return Alert.alert('Cadastro', 'Selecione a imagem da pizzas.');
        }

        if (!priceSizeP || !priceSizeM || !priceSizeG) {
            return Alert.alert('Cadastro', 'Informe o preço de todos os tamanhos da pizza.');
        }

        setIsLoading(true);

        //Armazenando imagem no storage firebase
        const fileName = new Date().getTime();
        const reference = storage().ref(`/pizzas/${fileName}.png`)
        await reference.putFile(image);

        const photo_url = await reference.getDownloadURL();

        firestore()
            .collection('pizzas')
            .add({
                name,
                name_insensivite: name.toLowerCase().trim(),
                description,
                prices_sizes: {
                    p: priceSizeP,
                    m: priceSizeM,
                    g: priceSizeG,
                },
                photo_url,
                photo_path: reference.fullPath,
            }).then(() => Alert.alert('Cadastro', 'pizza cadastrada com sucesso'))
            .catch(() => Alert.alert('Cadastro', 'Não foi possivel cadastrar a pizza'))

        setImage('');
        setName('');
        setDescription('');
        setPriceSizeP('');
        setPriceSizeM('');
        setPriceSizeG('');

        setIsLoading(false);
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
                        <Input onChangeText={setName} value={name} />
                    </InputGroup>

                    <InputGroup>
                        <InputGroupHeader>
                            <Label>Descrição</Label>
                            <MaxCharacters>0 de 60 caracteres</MaxCharacters>
                        </InputGroupHeader>

                        <Input
                            multiline
                            maxLength={60}
                            style={{ height: 80 }}
                            onChangeText={setDescription}
                            value={description}
                        />
                    </InputGroup>

                    <InputGroup>
                        <Label>Tamanhos e preços</Label>

                        <InputPrice size='P' onChangeText={setPriceSizeP} value={priceSizeP} />
                        <InputPrice size='M' onChangeText={setPriceSizeM} value={priceSizeM} />
                        <InputPrice size='G' onChangeText={setPriceSizeG} value={priceSizeG} />
                    </InputGroup>

                    <Button
                        title='Cadastrar Pizza'
                        type='secondary'
                        isLoading={ísLoading}
                        onPress={handleAdd}
                    />
                </Form>

            </ScrollView>
        </Container>
    );
}