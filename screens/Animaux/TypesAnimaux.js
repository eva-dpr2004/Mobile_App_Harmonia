import React from 'react';
import { View, StyleSheet } from 'react-native';
import TabNavigator from '../../components/Basics/TabNavigator';
import TypesAnimauxList from '../../components/Animaux/TypesAnimauxList';

function TypesAnimaux({ navigation }) {
  return (
    <View style={styles.container}>
      <TypesAnimauxList navigation={navigation} />
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

export default TypesAnimaux;
