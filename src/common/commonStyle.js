import styled from 'styled-components/native';

export const ButtonText = styled.Text`
  color: red;
`;

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  margin: 10px;
`;

export const MapHeaderText = styled.Text`
  color: ${props => (props.disable ? 'gray' : 'black')};
`;
