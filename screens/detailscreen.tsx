import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, Share, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { RouteProp } from '@react-navigation/native';

interface Product {
    id: string;
    thumbnail: string;
    brand: string;
    price: number;
    description: string;
}

type ProductDetailScreenProps = {
    route: {
        params: {
            productId: number;
        };
    };
};

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ route }) => {
    const { productId } = route.params;
    const [productData, setProductData] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    const getSingleProduct = async () => {
        try {
            const result = await axios.get(`https://dummyjson.com/products/${productId}`);
            const data: Product = result.data;
            setProductData(data);
            setLoading(false);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    useEffect(() => {
        getSingleProduct();
    }, []);

    const generateLink = async () => {
        try {
            const link = await dynamicLinks().buildShortLink({
                link: `https://reactnativedeeplink97.page.link/H3Ed?productId=${productId}`,
                domainUriPrefix: 'https://reactnativedeeplink97.page.link',
                social: {
                    title: 'Sale on ' + productData?.brand,
                    descriptionText: productData?.description,
                    imageUrl: productData?.thumbnail,
                },
                android: {
                    packageName: 'com.firebasedynamiclinks',
                },
                ios: {
                    appStoreId: '123456789',
                    bundleId: 'com.firebasedynamiclinks',
                },
            }, dynamicLinks.ShortLinkType.DEFAULT);
            console.log('link:', link);
            return link;
        } catch (error) {
            console.log('Generating Link Error:', error);
        }
    };

    const shareProduct = async () => {
        const getLink = await generateLink();
        try {
            Share.share({
                message: getLink ?? '',
                title: "Sale on " + productData?.brand,
                url: getLink
            });
        } catch (error) {
            console.log('Sharing Error:', error);
        }
    };

    return (
        <>
            {loading ? (
                <ActivityIndicator />
            ) : (
                <View style={styles.container}>
                    <View style={styles.flatStyle}>
                        <Image style={styles.imgStyle} source={{ uri: productData?.thumbnail }} />
                        <View style={styles.bodyStyle}>
                            <View style={styles.innerBox}>
                                <Text style={styles.textTitle}>{productData?.brand}</Text>
                                <Text style={styles.textStyle}>{productData?.price}$</Text>
                            </View>
                            <Text style={styles.textStyle}>{productData?.description}</Text>
                        </View>
                        <View style={styles.footer}>
                            <Pressable onPress={shareProduct} style={styles.btn}>
                                <Text style={styles.btnTitle}>Share Product</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            )}
        </>
    );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    imgStyle: {
        width: '100%',
        height: 250,
        resizeMode: 'cover'
    },
    bodyStyle: {
        justifyContent: 'space-between',
        marginVertical: 10,
        marginHorizontal: 20
    },
    innerBox: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#797ee6'
    },
    textStyle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#797ee6'
    },
    footer: {
        marginVertical: 20,
        marginHorizontal: 20
    },
    btn: {
        backgroundColor: '#797ee630',
        padding: 20,
        borderRadius: 10
    },
    btnTitle: {
        color: '#797ee6',
        fontSize: 20,
        textAlign: 'center'
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
});
