import React, { useState, useEffect } from 'react';
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
import { ProductProps } from '../../components/ProductCard';

import { useNavigation, useRoute } from '@react-navigation/native';
import { ProductNavigationProps } from '../../@types/navigation';


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



type PizzaResponseProps = ProductProps & {
    photo_path: string,
    prices_sizes: {
        p: string,
        m: string
        g: string,
    }
}


export function Product() {

    const navigation = useNavigation();

    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [priceSizeP, setPriceSizeP] = useState('');
    const [priceSizeM, setPriceSizeM] = useState('');
    const [priceSizeG, setPriceSizeG] = useState('');
    const [ísLoading, setIsLoading] = useState(false);
    const [photoPath, setPhotoPath] = useState('');

    const route = useRoute();
    const { id } = route.params as ProductNavigationProps;


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
        const fileName = String(new Date().getTime());
        const reference = storage().ref(`/pizzas/${fileName}.png`);
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
            }).then(() => navigation.navigate('home'))
            .catch(() => setIsLoading(false));

    }

    async function handleUpdate(id: string) {
        // if (!name.trim()) {
        //     return Alert.alert('Cadastro', 'Informe o nome da pizza.');
        // }

        // if (!description.trim()) {
        //     return Alert.alert('Cadastro', 'Informe a description da pizza.');
        // }

        // if (!image) {
        //     return Alert.alert('Cadastro', 'Selecione a imagem da pizza.');
        // }

        // if (!priceSizeP || !priceSizeM || !priceSizeG) {
        //     return Alert.alert('Cadastro', 'Informe o preço de todos os tamanhos da pizza.');
        // }

        // setIsLoading(true);

        // const fileName = String(new Date().getTime());
        // const reference = storage().ref(`/pizzas/${fileName}.png`);
        // await reference.putFile(image);
        // const photo_url = await reference.getDownloadURL();

        // console.log(id);

        // const userUpdate = await firestore().collection('pizzas').doc(id).get();
        // const userData = userUpdate.data();
        // await userData.update({
        //     name,
        //     name_insensivite: name.toLowerCase().trim(),
        //     description,
        //     prices_sizes: {
        //         p: priceSizeP,
        //         m: priceSizeM,
        //         g: priceSizeG,
        //     },
        //     photo_url: '',
        //     photo_path: '',
        // }).then(() => Alert.alert('Aualização', 'Pizza atualizada')).catch(() => Alert.alert('Atualização', 'deu ruim 😯'))

        // setIsLoading(false);
        // navigation.goBack();
    }

    function handleDelete() {
        firestore()
            .collection('pizzas')
            .doc(id)
            .delete()
            .then(() => {
                storage()
                    .ref(photoPath)
                    .delete()
                    .then(() => navigation.navigate('home'))
            })
    }

    function handleGoBack() {
        navigation.goBack();
    }

    useEffect(() => {
        if (id) {
            firestore()
                .collection('pizzas')
                .doc(id)
                .get()
                .then(response => {
                    const product = response.data() as PizzaResponseProps;

                    setName(product.name);
                    setImage(product.photo_url);
                    setDescription(product.description);
                    setPriceSizeP(product.prices_sizes.p);
                    setPriceSizeM(product.prices_sizes.m);
                    setPriceSizeG(product.prices_sizes.g);
                    setPhotoPath(product.photo_path)
                })
        }
    }, [id]);

    return (
        <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <StatusBar translucent style='light' />

            <ScrollView showsVerticalScrollIndicator={false}>
                <Header>

                    <BackButton onPress={handleGoBack} />

                    <Title>Cadastrar</Title>

                    <TouchableOpacity onPress={handleDelete}>
                        {id && <DeleteLabel>Deletar</DeleteLabel>}
                    </TouchableOpacity>
                </Header>


                <Upload>
                    <Photo uri={image} />
                    {!id && <PickImageButton title='Carregar' onPress={handleImagePicker} />}
                </Upload>

                <Form>

                    <InputGroup>
                        <Label>Nome</Label>
                        <Input onChangeText={setName} value={name} autoCorrect={false} />
                    </InputGroup>

                    <InputGroup>
                        <InputGroupHeader>
                            <Label>Descrição</Label>
                            <MaxCharacters >0 de 60 caracteres</MaxCharacters>
                        </InputGroupHeader>

                        <Input
                            multiline
                            maxLength={60}
                            style={{ height: 80 }}
                            onChangeText={setDescription}
                            value={description}
                            autoCorrect={false}
                        />
                    </InputGroup>

                    <InputGroup>
                        <Label>Tamanhos e preços</Label>

                        <InputPrice size='P' onChangeText={setPriceSizeP} value={priceSizeP} autoCorrect={false} />
                        <InputPrice size='M' onChangeText={setPriceSizeM} value={priceSizeM} autoCorrect={false} />
                        <InputPrice size='G' onChangeText={setPriceSizeG} value={priceSizeG} autoCorrect={false} />
                    </InputGroup>

                    {
                        !id &&
                        <Button
                            title='Cadastrar Pizza'
                            type='secondary'
                            isLoading={ísLoading}
                            onPress={handleAdd}
                        />
                    }

                </Form>

            </ScrollView>
        </Container>
    );
}