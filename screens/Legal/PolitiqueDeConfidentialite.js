import React from 'react';
import { View, StyleSheet } from 'react-native';
import TextPolitiqueDeConfidentialite from '../../components/Legal/TextPolitiqueDeConfidentialite';
import TabNavigator from '../../components/Basics/TabNavigator';

function PolitiqueDeConfidentialite({ navigation }) {
  return (
    <View style={styles.container}>
      <TextPolitiqueDeConfidentialite navigation={navigation} />
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

export default PolitiqueDeConfidentialite;
