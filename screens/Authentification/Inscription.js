import React from 'react';
import { View, StyleSheet } from 'react-native';
import InscriptionForm from '../../components/Authentification/InscriptionForm';

function Inscription({ navigation }) {
  return (
    <View style={styles.container}>
      <InscriptionForm navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
});

export default Inscription;
