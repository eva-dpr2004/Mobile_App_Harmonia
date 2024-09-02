import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function TextPolitiqueDeConfidentialite() {
  return (
    <View style={styles.legalContainer}>
      <Text style={styles.title}>Politique de Confidentialité</Text>
      <Text style={styles.introductionParagraphe}>
        Introduction : Votre vie privée est importante pour nous. Cette politique de confidentialité explique quelles données personnelles nous collectons, pourquoi nous les collectons et comment nous les utilisons. En utilisant notre application mobile et notre site web consacrés aux animaux, vous acceptez les termes de cette politique.
      </Text>

      <Text style={styles.subtitle}>Données collectées :</Text>
      <Text>Nous collectons les données suivantes :</Text>
      <Text>- Informations d'inscription : nom, email, mot de passe.</Text>
      <Text>- Informations sur les animaux : nom, date de naissance, espèce, race, poids, habitat, etc.</Text>
      <Text>- Informations d'activité : durée, type, fréquence des activités de vos animaux.</Text>
      <Text>- Données techniques : adresse IP, type de navigateur, temps de visite, etc.</Text>

      <Text style={styles.subtitle}>Utilisation des données :</Text>
      <Text>Nous utilisons vos données pour :</Text>
      <Text>- Fournir et améliorer nos services.</Text>
      <Text>- Personnaliser votre expérience utilisateur.</Text>
      <Text>- Gérer votre compte et vos préférences.</Text>
      <Text>- Communiquer avec vous à propos de nos services.</Text>
      <Text>- Analyser l'utilisation de notre site et de notre application.</Text>

      <Text style={styles.subtitle}>Partage des données :</Text>
      <Text>Nous ne vendons ni ne louons vos données personnelles à des tiers. Nous pouvons partager vos données avec :</Text>
      <Text>- Des prestataires de services qui nous aident à fournir nos services.</Text>
      <Text>- Des autorités légales si cela est requis par la loi.</Text>

      <Text style={styles.subtitle}>Sécurité des données :</Text>
      <Text>Nous mettons en œuvre des mesures de sécurité pour protéger vos données contre tout accès non autorisé, modification, divulgation ou destruction.</Text>

      <Text style={styles.subtitle}>Vos droits :</Text>
      <Text>Conformément au RGPD, vous avez le droit :</Text>
      <Text>- D'accéder à vos données personnelles.</Text>
      <Text>- De rectifier vos données si elles sont inexactes ou incomplètes.</Text>
      <Text>- De demander la suppression de vos données.</Text>
      <Text>- De limiter le traitement de vos données.</Text>
      <Text>- De vous opposer au traitement de vos données.</Text>
      <Text>- De la portabilité de vos données.</Text>
      <Text>Pour exercer ces droits, veuillez nous contacter à : privacy@harmonia.com</Text>

      <Text style={styles.subtitle}>Modification de la politique :</Text>
      <Text>Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Toute modification sera publiée sur cette page.</Text>

      <Text style={styles.subtitle}>Contact :</Text>
      <Text>Pour toute question concernant cette politique de confidentialité, vous pouvez nous contacter à : privacy@harmonia.com</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  legalContainer: {
    padding: 20,
  },
  title: {
    color: 'rgb(24, 50, 87)',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  introductionParagraphe: {
    marginBottom: 15,
    fontSize: 16,
  },
});

export default TextPolitiqueDeConfidentialite;
