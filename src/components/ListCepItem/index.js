import React, { memo } from 'react';
import { Container, Title } from './styles';

const ListCepItem = ({ dataItem, onPress }) => {
  return (
    <Container onPress={onPress}>
      <Title>{dataItem.localidade}</Title>
      <Title>{dataItem.cep}</Title>
    </Container>
  );
};

export default memo(ListCepItem);
