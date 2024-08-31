import React from 'react';
import { View, StyleSheet } from 'react-native';
import TextMentionsLegales from '../../components/Legal/TextMentionsLegales';
import TabNavigator from '../../components/Basics/TabNavigator';

function MentionsLegales({ navigation }) {
  return (
    <View style={styles.container}>
      <TextMentionsLegales navigation={navigation} />
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

export default MentionsLegales;
