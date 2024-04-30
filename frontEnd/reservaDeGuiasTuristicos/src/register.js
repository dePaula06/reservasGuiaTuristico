import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image, TextInput, Alert } from "react-native"; 
import { useNavigation } from "@react-navigation/native";
import sheets from "./axios/axios";

const Register = () => {
  const navigation = useNavigation();
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");

  function handleLogin(){
    navigation.navigate('Login')
  }

  async function handleRegister(){

    if (cpf === "" || nome === "" || email === "" || telefone === "" || senha === "") {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await sheets.createUser(cpf, nome, email, telefone, senha);
      if (response.status === 201) {
        Alert.alert("Sucesso", response.data.message);
        navigation.navigate('Tabs');
      }
    } catch (error) {
      if (error.response) {
        Alert.alert("Erro no cadastro", error.response.data.error);
      } else {
        Alert.alert("Erro de Conexão", "Erro ao conectar ao servidor.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerTextWelcome}>
        <Text style={styles.titleCadastrar}>Cadastrar</Text>
        <Text style={styles.textWelcome}>
          Crie uma conta e desfrute de nossos serviços!
        </Text>
      </View>
      <View style={styles.containerForm}>
        <TextInput
          style={styles.input}
          placeholder="CPF"
          value={cpf}
          onChangeText={(text) => setCpf(text)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={(text) => setNome(text)}
          keyboardType="default"
        />
        <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
        />
        <TextInput
              style={styles.input}
              placeholder="Telefone"
              value={telefone}
              onChangeText={(text) => setTelefone(text)}
              keyboardType="phone-pad"
        />
        <TextInput
              style={styles.input}
              placeholder="Senha"
              value={senha}
              onChangeText={(text) => setSenha(text)}
              keyboardType="default"
            />
        <TouchableOpacity style={styles.buttonCadastrar} onPress={handleRegister}>
            <Text style={styles.textButtonCadastrar}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.textJaTenhoConta}>Já tem uma conta?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#FFF'
  },
  containerTextWelcome: {
    flex: 1,
    alignItems: "center",
    marginTop: 70,
  },
  titleCadastrar: {
    fontSize: 36,
    textAlign: "center",
    fontFamily: "Poppins-ExtraBold",
    color: "#0499D2",
  },
  textWelcome: {
    fontSize: 20,
    textAlign: "center",
    width: 275,
    fontFamily: "Poppins-SemiBold",
  },
  containerForm: {
    backgroundColor: "#FFF",
    flex: 1,
    alignItems: "center",
    marginTop: -380
  },
  input: {
    backgroundColor: '#E2E9EA',
    width: 325,
    height: 50,
    borderRadius: 10,
    marginTop: 20,
    paddingHorizontal: 10
  },
  buttonCadastrar: {
    marginTop: 20,
    width: 325,
    height: 60,
    backgroundColor: '#0A22A1',
    borderRadius: 10
  },
  textButtonCadastrar: {
    fontSize: 24,
    fontFamily: 'Poppins-ExtraBold',
    color: '#FFF',
    textAlign: 'center',
    paddingVertical: 10
  },
  textJaTenhoConta: {
    marginTop: 20,
    color: '#0499D2',
    fontSize: 18,
    fontFamily: 'Roboto-Bold'
  }
});

export default Register;
