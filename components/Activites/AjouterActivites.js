import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, TextInput, Picker, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { getAnimauxByUserId, addActivite } from '../../services/Activites';

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

  const fetchAnimaux = useCallback(async () => {
    if (authState.isAuthenticated && authState.user?.Id_Utilisateur) {
      try {
        const data = await getAnimauxByUserId(authState.user.Id_Utilisateur);
        setAnimaux(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des animaux:', error);
      }
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
    const debutDate = new Date(`1970-01-01T${debutActivite}:00Z`);
    let finDate = new Date(`1970-01-01T${finActivite}:00Z`);
    
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
      const response = await addActivite({
        ...activity,
        dureeActivite,
        animalNom
      });

      if (response.status === 201) {
        Alert.alert('Succès', 'Activité ajoutée avec succès');
        setActivity({
          animalId: '',
          date: getCurrentDate(),
          debutActivite: '',
          finActivite: '',
          dureeActivite: ''
        });
        setError('');
      } else {
        Alert.alert('Erreur', 'Erreur lors de l\'ajout de l\'activité');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data.error);
      } else {
        Alert.alert('Erreur', 'Erreur lors de l\'ajout de l\'activité');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activités</Text>
      <View style={styles.form}>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Animal</Text>
          <Picker
            selectedValue={activity.animalId}
            onValueChange={(value) => handleChange('animalId', value)}
            style={styles.picker}
          >
            <Picker.Item label="Sélectionner un animal" value="" />
            {animaux.map(animal => (
              <Picker.Item key={animal.Id_Animal} label={animal.Nom} value={animal.Id_Animal} />
            ))}
          </Picker>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date de l'activité</Text>
          <TextInput
            style={styles.input}
            value={activity.date}
            onChangeText={(value) => handleChange('date', value)}
            placeholder="AAAA-MM-JJ"
            maxLength={10}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Début de l'activité</Text>
          <TextInput
            style={styles.input}
            value={activity.debutActivite}
            onChangeText={(value) => handleChange('debutActivite', value)}
            placeholder="HH:MM"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Fin de l'activité</Text>
          <TextInput
            style={styles.input}
            value={activity.finActivite}
            onChangeText={(value) => handleChange('finActivite', value)}
            placeholder="HH:MM"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Ajouter l'Activité</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginBottom: 225,
  },
  title: {
    color: 'rgb(24, 50, 87)',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  form: {
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
});

export default AjouterActivites;
