import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  StyleSheet,
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import sheets from './axios/axios';

function Login() {
  const navigation = useNavigation();
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");

  function handleRegister(){
    navigation.navigate('Register')
  }

  async function handleLogin(){

    if (cpf === "" || senha === "") {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    // Verificação específica para acesso como administrador
    if (cpf === "12345678910" && senha === "1234@hhh") {
      navigation.navigate('HomeAdm');
      return;
    }

    try {
      const response = await sheets.signInUser(cpf, senha);
      if (response.status === 200) {
        // Verificação geral para outros usuários
        Alert.alert("Sucesso", response.data.message);
        navigation.navigate('Tabs');
      }
    } catch (error) {
      if (error.response) {
        // Erros retornados do servidor
        Alert.alert("Erro no login", error.response.data.error);
      } else {
        // Erros de rede ou desconhecidos
        Alert.alert("Erro de Conexão", "Erro ao conectar ao servidor.");
      }
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.containerTextWelcome}>
        <Text style={styles.textEntrar}>Entrar</Text>
        <Text style={styles.textWelcome}>Bem vindo novamente, sentimos sua falta!</Text>
      </View>
      <View style={styles.containerInput}>
        <TextInput 
        style={styles.input}
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
        />
        <TextInput
            style={styles.input}
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={true}
            keyboardType="default"
        />
        <TouchableOpacity>
          <Text style={styles.textEsqueceuSenha}>Esqueceu sua senha?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerButton}>
        <TouchableOpacity style={styles.button}onPress={handleLogin}>
          <Text style={styles.textButton}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.textCriarConta} onPress={handleRegister}>Criar nova conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    height: "100%",
    width: "100%",
    flex: 1,
    display: 'flex'
  },
  containerTextWelcome:{
    marginTop: 125,
    flex: 1,
    alignItems: 'center'
  },
  textEntrar:{
    fontSize: 32,
    color: "#0499D2",
    fontFamily: "Poppins-ExtraBold"
  },
  textWelcome:{
    fontSize: 20,
    textAlign: 'center',
    width: 275,
    marginTop: 5,
    fontFamily: "Poppins-SemiBold"
  },
  containerInput: {
    flex: 1,
    alignItems: 'center', 
    backgroundColor: '#FFF',
    marginTop: -35
  },
  input: {
    backgroundColor: '#E2E9EA',
    width: 325,
    height: 50,
    borderRadius: 10,
    marginTop: 20,
    paddingHorizontal: 10
  },
  textEsqueceuSenha: {
    color: "#0499D2",
    textDecorationLine: "underline",
    marginLeft: 210,
    marginTop: 10,
    fontFamily: "Roboto-Bold",
    fontSize: 12,
  },
  containerButton: {
    flex: 1, 
    alignItems: 'center', 
    marginTop: 50
  },
  button: {
    width: 325,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#0E2ED9',
    marginTop: 0
  },
  textButton: {
    color: "#FFF",
    fontFamily: "Poppins-ExtraBold",
    fontSize: 22,
    textAlign: 'center',
    paddingVertical: 15
  },
  textCriarConta: {
    color: "#0499D2",
    fontFamily: "Roboto-Bold",
    fontSize: 17,
    marginTop: 20,
  },

});

export default Login;
