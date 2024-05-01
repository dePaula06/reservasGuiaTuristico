import React, {useState, useEffect} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, FlatList, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import sheets from '../axios/axios';

function Home(){
    const [locais, setLocais] = useState([]);
    const [atracoes, setAtracoes] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        fetchLocais();
        fetchAtracoes();
    }, []);

    const fetchLocais = async () => {
        try {
            const response = await sheets.getLocais();
            setLocais(response.data.local); 
        } catch (error) {
            console.error("Erro ao buscar locais", error);
        }
    };

    const fetchAtracoes = async () => {
        try {
            const response = await sheets.getAtracoes();
            setAtracoes(response.data.atracao); 
        } catch (error) {
            console.error("Erro ao buscar locais", error);
        }
    };

    function verGuias(){
        navigation.navigate('Guias')
    }

    return(
        <View style={styles.container}>
            <Text style={styles.textWelcome}>Bem vindo ao RGT!</Text>
            <Text style={styles.textWelcome2}>
                O RGT (Reserva de Guia Turístico para Viagem) é uma plataforma projetada para facilitar a contratação de serviços de guias turísticos em diferentes destinos, oferecendo uma experiência enriquecedora e personalizada para os viajantes.
            </Text>
            <Text style={styles.textLocais}>Locais populares</Text>
            <FlatList
                data={locais}
                keyExtractor={(item) => item.idLocal.toString()}
                showsHorizontalScrollIndicator={false}
                horizontal
                snapToAlignment="start"
                scrollEventThrottle={16}
                decelerationRate="fast"        
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.buttonLocal} >
                        <Image source={{ uri: item.fotoLocal }} style={styles.imageLocal} />
                            <Text style={styles.nameLocal}>{item.cidade}</Text>
                    </TouchableOpacity>
                )}
            />
            <Text style={styles.textAtracoes}>Atrações</Text>
            <FlatList
                data={atracoes}
                keyExtractor={(item) => item.idAtracao.toString()}
                showsHorizontalScrollIndicator={false}
                horizontal
                snapToAlignment="start"
                scrollEventThrottle={16}
                decelerationRate="fast"        
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.buttonAtracao} >
                        <Image source={{ uri: item.fotoAtracao }} style={styles.imageAtracao} />
                    </TouchableOpacity>
                )}
            />
            <View style={{flex: 1, alignItems: 'center', marginBottom: 20}}>
            <TouchableOpacity style={styles.buttonVerGuias} onPress={verGuias}>
                <Text style={styles.textVerGuias}>Ver guias</Text>
            </TouchableOpacity>
            </View>
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
    marginHorizontal: 20,
    marginTop: 10
},
textLocais: {
    marginLeft: 20,
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#0499D2',
    marginTop: 20
},
buttonLocal: {
    width: 200, 
    height: 150, 
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#A6A39F',
    marginLeft: 20,
    marginTop: 20
},
imageLocal:{
    flex: 1,
    marginHorizontal: 10,
    marginTop: 10,
    width: 180,
    height: 120,
    borderRadius: 10
},
nameLocal: {
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#2A3236',
},
textAtracoes: {
    marginLeft: 20, 
    marginTop: -25,
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#0499D2',
},
buttonAtracao: {
    width: 75,
    height: 75,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#A6A39F',
    marginTop: 5,
    marginLeft: 20
},
imageAtracao: {
    width: 65,
    height: 65,
    margin: 4,
    borderRadius: 10
},
buttonVerGuias: {
    width: 275,
    height: 50, borderRadius: 10,
    borderWidth: 2,
    borderColor: '#0499D2',
    paddingVertical: 7,
},
textVerGuias: {
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#0499D2'
}
});

export default Home;