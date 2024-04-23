import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from '@react-navigation/native'

const Home = () => {

    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <Text>HOME</Text>
        </View>
    );
};

const styles = StyleSheet.create({

});

export default Home;