import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

interface Product {
    id: string;
    thumbnail: string;
    brand: string;
    price: number;
    description: string;
}



export type ProductDetailParams = {
    productId: string;
};

type HomeScreenProps = {
    navigation: NavigationProp<any>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const [data, setData] = useState<Product[]>([]);

    const getApiData = () => {
        fetch(`https://dummyjson.com/products?skip=0&limit=12`)
            .then(res => res.json())
            .then((json: { products: Product[] }) => {
                setData(prevData => [...prevData, ...json.products]);
            })
            .catch(error => {
                console.log('Error:', error);
            });
    };

    useEffect(() => {
        getApiData();
    }, []);

    const keyExtractor = (item: Product) => `${item.id}`;

    const renderItem = ({ item }: { item: Product }) => {
        return (
            <Pressable
                onPress={() => navigation.navigate('ProductDetail', { productId: item.id } as ProductDetailParams)}
                style={styles.flatStyle}>
                <Image style={styles.imgStyle} source={{ uri: item.thumbnail }} />
                <View style={styles.footerStyle}>
                    <Text style={styles.textStyle}>{item.brand}</Text>
                    <Text style={styles.textStyle}>{item.price}$</Text>
                </View>
                <Text style={styles.textStyle}>{item.description}</Text>
            </Pressable>
        );
    };

    const itemSeparatorComponent = () => {
        return <View style={{ height: 20 }} />;
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                ItemSeparatorComponent={itemSeparatorComponent}
            />
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    flatStyle: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 2,
        backgroundColor: 'white',
        margin: 2,
        borderRadius: 8,
        padding: 8,
    },
    imgStyle: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    footerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    textStyle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#797ee6',
    },
});
