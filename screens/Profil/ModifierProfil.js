import React from 'react';
import { View, StyleSheet } from 'react-native';
import TabNavigator from '../../components/Basics/TabNavigator';
import ModifierProfilForm from '../../components/Profil/ModifierProfilForm';

function ModifierProfil({ navigation }) {
  return (
    <View style={styles.container}>
      <ModifierProfilForm navigation={navigation} />
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

export default ModifierProfil;
