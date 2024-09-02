import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import InscriptionForm from '../../components/Authentification/InscriptionForm';
import TabNavigator from '../../components/Basics/TabNavigator';

function Inscription({ navigation }) {
  return (
    <LinearGradient
      colors={['#e0c3fc', '#8ec5fc']}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <InscriptionForm navigation={navigation} />
      </ScrollView>
      <TabNavigator />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default Inscription;
