import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NotFoundScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>404 - Page Not Found</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'orange',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default NotFoundScreen;