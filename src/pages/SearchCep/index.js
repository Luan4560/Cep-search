/* eslint-disable no-use-before-define */
import React, { useState, useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-community/async-storage';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import api from '../../service/api';
import ListCepItem from '../../components/ListCepItem';

const CepSearch = () => {
  const [cep, setCep] = useState('');
  const [listCep, setlistCep] = useState([]);
  const [filteredList, setfilteredList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    async function loadList() {
      const dataSaved = await AsyncStorage.getItem('dataSaved');
      if (dataSaved) {
        const jsonDataSaved = JSON.parse(dataSaved);

        setlistCep(jsonDataSaved);
      }
    }

    loadList();
  }, []);

  useEffect(() => {
    async function filterListCep() {
      if (cep) {
        const arrayFiltered = listCep.filter((item) => {
          return item.cep.replace('-', '').indexOf(cep) >= 0;
        });

        setfilteredList(arrayFiltered);
      } else {
        setfilteredList(listCep);
      }
    }

    filterListCep();
  }, [cep, listCep]);

  const handleSubmit = useCallback(async () => {
    if (cep !== '') {
      const validacep = /^[0-9]{8}$/;
      if (validacep.test(cep)) {
        const { data } = await api.get(`${cep}/json`);
        navigation.replace('Address', data);
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

        <FlatList
          data={filteredList}
          keyExtractor={(cepItem) => cepItem.cep}
          renderItem={({ item }) => (
            <ListCepItem
              dataItem={item}
              onPress={() => {
                navigation.navigate('Address', item);
              }}
            />
          )}
        />
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
    marginBottom: 20,
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 10,
    marginHorizontal: 30,
    backgroundColor: '#0DAB76',
    color: '#fff',
  },
});
