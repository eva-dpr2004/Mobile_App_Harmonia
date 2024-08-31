import React from 'react';
import { View, StyleSheet } from 'react-native';
import TextConditionsUtilisations from '../../components/Legal/TextConditionsUtilisations';
import TabNavigator from '../../components/Basics/TabNavigator';

function ConditionsUtilisations({ navigation }) {
  return (
    <View style={styles.container}>
      <TextConditionsUtilisations navigation={navigation} />
      <TabNavigator/>
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

export default ConditionsUtilisations;
