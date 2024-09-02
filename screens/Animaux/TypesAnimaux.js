import React from 'react';
import TypesAnimauxList from '../../components/Animaux/TypesAnimauxList';
import TabNavigator from '../../components/Basics/TabNavigator';
import { ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function TypesAnimaux({ navigation }) {
  return (
    <LinearGradient
      colors={['#e0c3fc', '#8ec5fc']}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <TypesAnimauxList navigation={navigation} />
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
  },
});

export default TypesAnimaux;

