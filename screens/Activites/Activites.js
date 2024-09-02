import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AjouterActivites from '../../components/Activites/AjouterActivites'; 
import TableauActivites from '../../components/Activites/TableauActivites'; 
import TabNavigator from '../../components/Basics/TabNavigator';

const Activites = () => {
  return (
    <LinearGradient
      colors={['#e0c3fc', '#8ec5fc']}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <AjouterActivites />  
        <TableauActivites />  
      </ScrollView>
      <TabNavigator />
    </LinearGradient>
  );
};

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

export default Activites;
