import React from 'react';
import { View, StyleSheet } from 'react-native';
import TabNavigator from '../../components/Basics/TabNavigator';
import ProfilCard from '../../components/Profil/ProfilCard';

function Profil({ navigation }) {
  return (
    <View style={styles.container}>
      <ProfilCard navigation={navigation} />
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

export default Profil;
