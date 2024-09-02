import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import TextPolitiqueDeConfidentialite from '../../components/Legal/TextPolitiqueDeConfidentialite';
import TabNavigator from '../../components/Basics/TabNavigator';

function PolitiqueDeConfidentialite({ navigation }) {
  return (
    <LinearGradient
      colors={['#e0c3fc', '#8ec5fc']}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <TextPolitiqueDeConfidentialite navigation={navigation} />
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

export default PolitiqueDeConfidentialite;
