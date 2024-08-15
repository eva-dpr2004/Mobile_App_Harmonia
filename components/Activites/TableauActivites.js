import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Alert, Picker } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

function TableauActivites() {
  const { authState } = useContext(AuthContext);
  const [activities, setActivities] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState('');
  const [showCard, setShowCard] = useState(false);
  const [showWeeklyCard, setShowWeeklyCard] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [totalWeeklyTime, setTotalWeeklyTime] = useState(0);

  const fetchActivities = useCallback(() => {
    if (authState.isAuthenticated && authState.user?.Id_Utilisateur) {
      const url = `http://localhost:3001/activities/getActivitesByUserId/${authState.user.Id_Utilisateur}`;
      axios.get(url, { withCredentials: true })
        .then(response => {
          setActivities(response.data);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des activités:', error);
        });
    }
  }, [authState]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const handleDelete = (id) => {
    Alert.alert(
      'Suppression de l\'activité',
      'Appuyer sur OK pour confirmer',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'OK', onPress: () => deleteActivity(id) }
      ]
    );
  };

  const deleteActivity = (id) => {
    axios.delete(`http://localhost:3001/activities/deleteActivites/${id}`, { withCredentials: true })
      .then((response) => {
        console.log('Réponse de suppression:', response);
        fetchActivities();
      })
      .catch(error => {
        console.error('Erreur lors de la suppression de l\'activité:', error);
      });
  };

  const handleAnimalChange = (value) => {
    setSelectedAnimal(value);
    setShowCard(false);
    setShowWeeklyCard(false);
  };

  const animalsWithActivities = [...new Set(activities.map(activity => activity.Nom_Animal))];

  const filteredActivities = selectedAnimal
    ? activities.filter(activity => activity.Nom_Animal === selectedAnimal)
    : [];

  const today = new Date().toISOString().split('T')[0];
  const todaysActivities = filteredActivities.filter(activity => activity.Date === today);

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const lastWeekActivities = filteredActivities.filter(activity => new Date(activity.Date) > weekAgo);

  const hasEnoughActivities = todaysActivities.length >= 2;

  const convertMinutesToHoursAndMinutes = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
  };

  const calculateTotalTime = () => {
    const totalMinutes = todaysActivities.reduce((total, activity) => {
      const match = activity.Duree_Activite.match(/(\d+)h\s(\d+)min/);
      const hours = match ? parseInt(match[1], 10) : 0;
      const minutes = match ? parseInt(match[2], 10) : 0;
      return total + (hours * 60) + minutes;
    }, 0);
    setTotalTime(totalMinutes);
    setShowCard(true);
  };

  const calculateTotalWeeklyTime = () => {
    const totalMinutes = lastWeekActivities.reduce((total, activity) => {
      const match = activity.Duree_Activite.match(/(\d+)h\s(\d+)min/);
      const hours = match ? parseInt(match[1], 10) : 0;
      const minutes = match ? parseInt(match[2], 10) : 0;
      return total + (hours * 60) + minutes;
    }, 0);
    setTotalWeeklyTime(totalMinutes);
    setShowWeeklyCard(true);
  };

  const checkWeeklyActivities = () => {
    const daysWithActivities = new Set(lastWeekActivities.map(activity => activity.Date));
    return daysWithActivities.size >= 1; 
  };

  return (
    <View style={styles.container}>
      {activities.length > 0 ? (
        <View>
          <Text style={styles.title}>Tableau des Activités</Text>
          <Picker
            selectedValue={selectedAnimal}
            style={styles.picker}
            onValueChange={(itemValue) => handleAnimalChange(itemValue)}
          >
            <Picker.Item label="Aucun" value="" />
            {animalsWithActivities.map((animal, index) => (
              <Picker.Item key={index} label={animal} value={animal} />
            ))}
          </Picker>

          <FlatList
            data={filteredActivities}
            keyExtractor={item => item.Id_Activite.toString()}
            ListEmptyComponent={() => (
              <Text style={styles.noData}>Sélectionnez un animal pour voir ses activités.</Text>
            )}
            renderItem={({ item }) => (
              <View style={styles.activityRow}>
                <Text>{item.Nom_Animal}</Text>
                <Text>{item.Date}</Text>
                <Text>{item.Debut_Activite}</Text>
                <Text>{item.Fin_Activite}</Text>
                <Text>{item.Duree_Activite}</Text>
                <Button title="Supprimer" onPress={() => handleDelete(item.Id_Activite)} />
              </View>
            )}
          />

          <View style={styles.buttonContainer}>
            {hasEnoughActivities && (
              <Button title="Calculer la durée totale quotidienne" onPress={calculateTotalTime} />
            )}
            {checkWeeklyActivities() && (
              <Button title="Calculer la durée totale des 7 derniers jours" onPress={calculateTotalWeeklyTime} />
            )}
          </View>

          {showCard && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Total de temps d'activité pour aujourd'hui</Text>
              <Text>{convertMinutesToHoursAndMinutes(totalTime)} aujourd'hui</Text>
            </View>
          )}

          {showWeeklyCard && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Total de temps d'activité pour les 7 derniers jours</Text>
              <Text>{convertMinutesToHoursAndMinutes(totalWeeklyTime)} cette semaine</Text>
            </View>
          )}
        </View>
      ) : (
        <Text>Aucune activité enregistrée pour vos animaux.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  noData: {
    textAlign: 'center',
    marginVertical: 20,
  },
  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  buttonContainer: {
    marginVertical: 20,
  },
  card: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginVertical: 10,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default TableauActivites;
