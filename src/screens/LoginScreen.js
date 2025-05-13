import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        navigation.replace('Home');
      }
    };
    checkSession();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        await AsyncStorage.setItem('token', data.token);
        await AsyncStorage.setItem('user', JSON.stringify({ email }));

        Alert.alert('Sucesso', 'Login realizado com sucesso!');
        navigation.replace('Home');
      } else {
        Alert.alert('Erro', 'Email ou senha inválidos');
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao realizar login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bem-vindo de volta!</Text>
      <Text style={styles.subheader}>Faça seu login</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgot}>Esqueceu a senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Entrar</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('RegisterStep1')}>
        <Text style={styles.signup}>
          Ainda não tem uma conta? <Text style={styles.signupBold}>Faça seu cadastro</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2d2d2d',
    marginBottom: 4,
  },
  subheader: {
    fontSize: 16,
    color: '#555',
    marginBottom: 24,
  },
  input: {
    height: 52,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  forgot: {
    textAlign: 'right',
    color: '#333',
    fontSize: 14,
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#F26C28',
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signup: {
    textAlign: 'center',
    color: '#333',
    fontSize: 14,
  },
  signupBold: {
    color: '#F26C28',
    fontWeight: 'bold',
  },
});
