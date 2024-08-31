import React from 'react';
import { View, StyleSheet } from 'react-native';
import TextPolitiqueDeCookies from '../../components/Legal/TextPolitiqueDeCookies';
import TabNavigator from '../../components/Basics/TabNavigator';

function PolitiqueDeCookies({ navigation }) {
  return (
    <View style={styles.container}>
      <TextPolitiqueDeCookies navigation={navigation} />
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

export default PolitiqueDeCookies;
