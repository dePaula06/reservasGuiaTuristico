import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from '@react-navigation/native'

function Home(){
    return(
        <View style={styles.container}>
            <Text style={styles.textWelcome}>Bem vindo ao RGT!</Text>
            <Text style={styles.textWelcome2}>
                O RGT (Reserva de Guia Turístico para Viagem) é uma plataforma projetada para facilitar a contratação de serviços de guias turísticos em diferentes destinos, oferecendo uma experiência enriquecedora e personalizada para os viajantes.
            </Text>
        </View>
    )
};

const styles = StyleSheet.create({
container: {
    backgroundColor: '#FFF',
    flex: 1,
},
textWelcome: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    marginTop: 80
},
textWelcome2: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
}

});

export default Home;