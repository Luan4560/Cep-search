/* eslint-disable no-use-before-define */
import React, { useCallback, useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity, Text } from 'react-native';
import {
  StyledView,
  StyledCard,
  StyledError,
  StyledTextError,
  StyledTextCep,
  StyledBtnCep,
} from './style';

Icon.loadFont();

const AddressCep = () => {
  const navigation = useNavigation();
  const routes = useRoute();
  const dataCep = routes.params;
  const [loading, setLoading] = useState(false);
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    async function checkDataSaved() {
      const dataSaved = await AsyncStorage.getItem('dataSaved');

      if (dataSaved) {
        const jsonDataSaved = JSON.parse(dataSaved);
        const foundCep = jsonDataSaved.find((item) => {
          return item.cep === dataCep.cep;
        });

        if (foundCep) {
          setShowButton(false);
        }
      }
    }

    checkDataSaved();
  }, [dataCep]);

  function handleNavigateBack() {
    navigation.replace('Home');
  }

  const handleRemoveData = useCallback(async () => {
    const dataSaved = await AsyncStorage.getItem('dataSaved');
    const jsonDataSaved = JSON.parse(dataSaved);

    const filteredArray = jsonDataSaved.filter((item) => {
      return item.cep !== dataCep.cep;
    });

    await AsyncStorage.setItem('dataSaved', JSON.stringify(filteredArray));
    setShowButton(true);
  }, [dataCep]);

  const handleSubmit = useCallback(async () => {
    setLoading(true);

    const dataSaved = await AsyncStorage.getItem('dataSaved');

    if (dataSaved) {
      const jsonDataSaved = JSON.parse(dataSaved);
      const foundCep = jsonDataSaved.find((item) => {
        return item.cep === dataCep.cep;
      });

      if (!foundCep) {
        jsonDataSaved.push(dataCep);
        await AsyncStorage.setItem('dataSaved', JSON.stringify(jsonDataSaved));
      }
    } else {
      await AsyncStorage.setItem('dataSaved', JSON.stringify([dataCep]));
    }
    setShowButton(false);
    setLoading(false);
  }, [dataCep]);

  return (
    <StyledView>
      <TouchableOpacity onPress={handleNavigateBack}>
        <Icon name="arrow-left" size={25} color="#FFFF" />
      </TouchableOpacity>
      {!dataCep.erro ? (
        <>
          <StyledCard>
            <Text>{dataCep.cep}</Text>
            <Text>{dataCep.bairro}</Text>
            <Text>{dataCep.logradouro}</Text>
            <Text>{dataCep.localidade}</Text>
          </StyledCard>

          {showButton && (
            <StyledBtnCep enabled={!loading} onPress={handleSubmit}>
              <StyledTextCep>Salvar</StyledTextCep>
            </StyledBtnCep>
          )}

          {!showButton && (
            <StyledBtnCep enabled={!loading} onPress={handleRemoveData}>
              <StyledTextCep>Remover</StyledTextCep>
            </StyledBtnCep>
          )}
        </>
      ) : (
        <StyledError>
          <StyledTextError>
            Endereço não localizado, tenta novamente!
          </StyledTextError>
        </StyledError>
      )}
    </StyledView>
  );
};

export default AddressCep;
