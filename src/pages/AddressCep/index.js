/* eslint-disable no-use-before-define */
import React, { useCallback, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { RectButton } from 'react-native-gesture-handler';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

Icon.loadFont();

const AddressCep = () => {
  const navigation = useNavigation();
  const routes = useRoute();
  const dataCep = routes.params;
  const [loading, setLoading] = useState(false);

  function handleNavigateBack() {
    navigation.goBack();
  }

  const handleSubmit = useCallback(async () => {
    setLoading(true);

    const dataSaved = await AsyncStorage.getItem('dataSaved');
    console.log(dataSaved);
    if (dataSaved) {
      const jsonDataSaved = JSON.parse(dataSaved);
      jsonDataSaved.push(dataCep);
      await AsyncStorage.setItem('dataSaved', JSON.stringify(jsonDataSaved));
    } else {
      await AsyncStorage.setItem('dataSaved', JSON.stringify([dataCep]));
    }
    setLoading(false);
  }, [dataCep]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleNavigateBack}>
        <Icon name="arrow-left" size={25} color="#FFFF" />
      </TouchableOpacity>
      {!dataCep.erro ? (
        <>
          <View style={styles.card}>
            <Text>{dataCep.cep}</Text>
            <Text>{dataCep.bairro}</Text>
            <Text>{dataCep.logradouro}</Text>
            <Text>{dataCep.localidade}</Text>
          </View>

          <RectButton
            enabled={!loading}
            onPress={handleSubmit}
            style={{
              ...styles.btnCep,
              backgroundColor: !loading ? '#0DAB76' : '#000',
            }}
          >
            <Text style={styles.textCep}>Salvar</Text>
          </RectButton>
        </>
      ) : (
        <View style={styles.error}>
          <Text style={styles.textError}>
            Endereço não localizado, tenta novamente!
          </Text>
        </View>
      )}
    </View>
  );
};

export default AddressCep;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 50,
  },
  card: {
    flex: 0.4,
    marginTop: 10,
    backgroundColor: '#FFFF',
    borderRadius: 8,
    padding: 20,
  },
  error: {
    marginTop: 10,
    height: 80,
    justifyContent: 'center',
    backgroundColor: '#FFFF',
    borderRadius: 8,
  },
  textError: {
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'red',
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
    // Tranferir para style-components
    color: '#fff',
  },
});
