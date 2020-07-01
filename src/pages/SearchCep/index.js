/* eslint-disable no-use-before-define */
import React, { useState, useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-community/async-storage';
import { Alert, FlatList } from 'react-native';
import {
  StyleContainer,
  StyleText,
  StyleTextInput,
  StyleTouchableOpacity,
  StyleTextBuscar,
} from './style';

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
      <StyleContainer>
        <StyleText>Procure seu CEP</StyleText>
        <StyleTextInput
          onChangeText={setCep}
          value={cep}
          keyboardType="numeric"
          placeholder="Digite o CEP"
        />
        <StyleTouchableOpacity onPress={handleSubmit}>
          <StyleTextBuscar>Buscar</StyleTextBuscar>
        </StyleTouchableOpacity>

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
      </StyleContainer>
    </>
  );
};

export default CepSearch;
