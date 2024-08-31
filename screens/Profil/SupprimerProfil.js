import React from 'react';
import { View, StyleSheet } from 'react-native';
import TabNavigator from '../../components/Basics/TabNavigator';
import SupprimerProfilForm from '../../components/Profil/SupprimerProfilForm';

function SupprimerProfil({ navigation }) {
  return (
    <View style={styles.container}>
      <SupprimerProfilForm navigation={navigation} />
      <TabNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SupprimerProfil;
