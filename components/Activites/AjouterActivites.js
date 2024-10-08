import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, TextInput, Button, Picker, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

function AjouterActivites() {
  const { authState } = useContext(AuthContext);

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const [activity, setActivity] = useState({
    animalId: '',
    date: getCurrentDate(),
    debutActivite: '',
    finActivite: '',
    dureeActivite: ''
  });
  const [animaux, setAnimaux] = useState([]);
  const [error, setError] = useState('');

  const fetchAnimaux = useCallback(() => {
    if (authState.isAuthenticated && authState.user?.Id_Utilisateur) {
      const url = `http://localhost:3001/animals/byUserId/${authState.user.Id_Utilisateur}`;
      axios.get(url, { withCredentials: true })
        .then(response => {
          setAnimaux(response.data);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des animaux:', error);
        });
    }
  }, [authState]);

  useEffect(() => {
    fetchAnimaux();
  }, [fetchAnimaux]);

  const handleChange = (field, value) => {
    setActivity(prevActivity => ({
      ...prevActivity,
      [field]: value
    }));
  };

  const isFutureDateTime = (date, time) => {
    const now = new Date();
    const selectedDate = new Date(date);
    const [hours, minutes] = time.split(':').map(Number);

    selectedDate.setHours(hours, minutes, 0, 0);

    return selectedDate > now;
  };

  const handleSubmit = async () => {
    if (!activity.animalId || !activity.date || !activity.debutActivite || !activity.finActivite) {
      setError('Tous les champs doivent être remplis.');
      return;
    }

    if (isFutureDateTime(activity.date, activity.debutActivite) || isFutureDateTime(activity.date, activity.finActivite)) {
      setError('Les dates et heures ne peuvent pas être dans le futur.');
      return;
    }

    const { debutActivite, finActivite, animalId } = activity;
    const debutDate = new Date(`1970-01-01T${debutActivite}Z`);
    let finDate = new Date(`1970-01-01T${finActivite}Z`);
    
    if (finDate < debutDate) {
      finDate.setDate(finDate.getDate() + 1);
    }

    const diffMs = finDate - debutDate;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) {
      setError('La durée de l\'activité doit être d\'au moins 1 minute.');
      return;
    }

    const diffHrs = Math.floor(diffMins / 60);
    const remainingMins = diffMins % 60;
    const dureeActivite = `${diffHrs}h ${remainingMins}min`;

    const selectedAnimal = animaux.find(animal => animal.Id_Animal === parseInt(animalId));
    const animalNom = selectedAnimal ? selectedAnimal.Nom : '';

    try {
      const response = await axios.post('http://localhost:3001/activities/ajoutActivite', {
        ...activity,
        dureeActivite,
        animalNom
      }, { withCredentials: true });
      if (response.status === 201) {
        console.log('Activité ajoutée avec succès');
        setActivity({
          animalId: '',
          date: getCurrentDate(),
          debutActivite: '',
          finActivite: '',
          dureeActivite: ''
        });
        setError('');
        Alert.alert('Succès', 'Activité ajoutée avec succès', [{ text: 'OK' }]);
      } else {
        console.error('Erreur lors de l\'ajout de l\'activité');
      }
    } catch (error) {
      setError('Erreur lors de l\'ajout de l\'activité');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter une Activité</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <View style={styles.formGroup}>
        <Text>Animal:</Text>
        <Picker
          selectedValue={activity.animalId}
          onValueChange={(value) => handleChange('animalId', value)}
          style={styles.picker}
        >
          <Picker.Item label="Sélectionner un animal" value="" />
          {animaux.map(animal => (
            <Picker.Item key={animal.Id_Animal} label={animal.Nom} value={animal.Id_Animal.toString()} />
          ))}
        </Picker>
      </View>
      <View style={styles.formGroup}>
        <Text>Date:</Text>
        <TextInput
          value={activity.date}
          editable={false}
          style={styles.input}
        />
      </View>
      <View style={styles.formGroup}>
        <Text>Début de l'activité:</Text>
        <TextInput
          value={activity.debutActivite}
          onChangeText={(value) => handleChange('debutActivite', value)}
          style={styles.input}
          placeholder="HH:MM"
        />
      </View>
      <View style={styles.formGroup}>
        <Text>Fin de l'activité:</Text>
        <TextInput
          value={activity.finActivite}
          onChangeText={(value) => handleChange('finActivite', value)}
          style={styles.input}
          placeholder="HH:MM"
        />
      </View>
      <Button title="Ajouter l'Activité" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
});

export default AjouterActivites;
