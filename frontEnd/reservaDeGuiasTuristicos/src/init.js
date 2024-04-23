import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from '@react-navigation/native'

function Init() {

    const navigation = useNavigation();
    function sendToLogin(){
        navigation.navigate('Login')
    }

    return(
        <View style={styles.container}>
            <Image
                source={require('../assets/init2.jpg')}
                style={styles.backgroundImage}
            />
                <View style={styles.containerText}>
                <Text style={styles.textInicial}>Reserve seus <Text style={styles.guiaTuristico}>guias turísticos</Text> aqui</Text>
                </View>
                <View style={styles.containerButton}>
                    <TouchableOpacity style={styles.buttonComecar}>
                        <Text style={styles.buttonText} onPress={sendToLogin}>Começar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.blackOpacity}/>
        </View>
    );
}// Fim Init

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: -1, 
    },
    containerText: {
        width: 200,
        marginTop: 430, 
        marginLeft: 50,
        zIndex: 1
    },
    textInicial: {
        color: "#FFF",
        fontSize: 24, 
        marginTop: 60,
        fontFamily: 'Manrope-Bold',
        zIndex: 1
    },
    guiaTuristico: {
        fontFamily: 'Manrope-ExtraBold',
        zIndex: 1
    },
    containerButton: {
        flex: 1,
        alignItems: "center",
        zIndex: 1
    },
    buttonComecar: {
        width: 275,
        height: 50, 
        borderRadius: 25,
        marginTop: 10,
        backgroundColor: "#18A4D9", 
        justifyContent: "center",
        zIndex: 1
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16,
        textAlign: "center",
        fontFamily: 'Manrope-Bold',
        zIndex: 1
    },
    blackOpacity: {
        zIndex: 0,
        backgroundColor: "#000",
        opacity: 0.2,
        width: 375,
        height: 280,
        position: 'absolute',
        marginTop: 430,
        borderTopRightRadius: 200,
        borderTopLeftRadius: 200,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10
    }
}); //fim Style


export default Init;