import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const StyledView = styled.View`
  flex: 1;
  padding: 0 30px;
  padding-top: 50px;
`;

export const StyledCard = styled.View`
  flex: 0.4;
  margin-top: 10px;
  background: #fff;
  border-radius: 8px;
  padding: 20px;
`;

export const StyledError = styled.View`
  margin-top: 10px;
  height: 80px;
  justify-content: center;
  background: #fff;
  border-radius: 8px;
`;

export const StyledTextError = styled.Text`
  font-size: 15px;
  font-weight: bold;
  align-self: center;
  color: red;
`;

export const StyledTextCep = styled.Text`
  font-weight: bold;
  color: #fff;
  font-size: 16px;
  text-align: center;
`;

export const StyledBtnCep = styled(RectButton)`
  border-color: #7159c1;
  height: 60px;
  justify-content: center;
  border-radius: 8px;
  border-width: 1;
  margin-top: 10px;
  margin: 0 30px;
  background: #0dab76;
  color: #fff;
`;

// btnCep: {
//   borderColor: '#7159c1',
//   height: 60,
//   justifyContent: 'center',
//   borderRadius: 8,
//   borderWidth: 1,
//   marginTop: 10,
//   marginHorizontal: 30,
//   backgroundColor: '#0DAB76',
//   color: '#fff',
// },
// });
