/* eslint-disable no-use-before-define */
import React, { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-community/async-storage';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import api from '../../service/api';

const CepSearch = () => {
  const [cep, setCep] = useState('');
  const navigation = useNavigation();

  const handleSubmit = useCallback(async () => {
    if (cep !== '') {
      const validacep = /^[0-9]{8}$/;
      if (validacep.test(cep)) {
        const { data } = await api.get(`${cep}/json`);
        navigation.navigate('Address', data);
      } else {
        Alert.alert(
          '🤭 Ops, Você tentou usar um CEP Invalido! Tenta novamente.'
        );
      }
    } else {
      Alert.alert('🖐 Informe pelo o menos o CEP, antes de Buscar!');
    }
  }, [cep]);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.inputTitle}>Procure seu endereço</Text>
        <TextInput
          onChangeText={setCep}
          value={cep}
          keyboardType="numeric"
          placeholder="Digite o CEP"
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.btnCep}>
          <Text style={styles.textCep}>Buscar</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CepSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  inputTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
  },
  input: {
    height: 55,
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 20,
    marginHorizontal: 30,
    fontSize: 16,
  },
  textCep: {
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },

  btnCep: {
    borderColor: '#7159c1',
    height: 60,
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 10,
    marginHorizontal: 30,
    backgroundColor: '#0DAB76',
    color: '#fff',
  },
});
