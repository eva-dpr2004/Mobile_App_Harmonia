import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function ChoixFeedback() {
    const navigation = useNavigation();

    const handleAnomalyReport = () => {
        navigation.navigate('Anomalies'); 
    };

    const handleGeneralFeedback = () => {
        navigation.navigate('AvisGlobal'); 
    };

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>Besoin d'aide ?</Text>
                <Text style={styles.paragraph}>
                    Vous avez besoin d'aide ? Envie de partager vos idées pour Harmonia ?
                </Text>
                <Text style={styles.paragraph}>
                    Remplissez les formulaires ci-dessous, ainsi nous pourrons lire vos retours et améliorer la qualité de l'expérience qu'Harmonia propose.
                </Text>
                <Button title="Signalement d'Anomalies" onPress={handleAnomalyReport} />
                <Button title="Feedback Global" onPress={handleGeneralFeedback} />
            </View>
            <Image source={require('../../assets/img/Question.png')} style={styles.image} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    textContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    paragraph: {
        fontSize: 16,
        marginBottom: 10,
    },
    image: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginTop: 20,
    },
});

export default ChoixFeedback;
