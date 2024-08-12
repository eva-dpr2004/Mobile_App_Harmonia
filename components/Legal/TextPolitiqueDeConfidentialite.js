import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

function TextPolitiqueDeConfidentialite() {
  return (
    <ScrollView contentContainerStyle={styles.LegalContainer}>
      <Text style={styles.title}>Politique de Confidentialité</Text>
      <Text style={styles.paragraph}>
        Introduction : Votre vie privée est importante pour nous. Cette politique de confidentialité explique quelles données personnelles nous collectons, pourquoi nous les collectons et comment nous les utilisons. En utilisant notre application mobile et notre site web consacrés aux animaux, vous acceptez les termes de cette politique.
      </Text>

      <Text style={styles.subtitle}>Données collectées :</Text>
      <Text style={styles.paragraph}>Nous collectons les données suivantes :</Text>
      <Text style={styles.listItem}>- Informations d'inscription : nom, email, mot de passe.</Text>
      <Text style={styles.listItem}>- Informations sur les animaux : nom, date de naissance, espèce, race, poids, habitat, etc.</Text>
      <Text style={styles.listItem}>- Informations d'activité : durée, type, fréquence des activités de vos animaux.</Text>
      <Text style={styles.listItem}>- Données techniques : adresse IP, type de navigateur, temps de visite, etc.</Text>

      <Text style={styles.subtitle}>Utilisation des données :</Text>
      <Text style={styles.paragraph}>Nous utilisons vos données pour :</Text>
      <Text style={styles.listItem}>- Fournir et améliorer nos services.</Text>
      <Text style={styles.listItem}>- Personnaliser votre expérience utilisateur.</Text>
      <Text style={styles.listItem}>- Gérer votre compte et vos préférences.</Text>
      <Text style={styles.listItem}>- Communiquer avec vous à propos de nos services.</Text>
      <Text style={styles.listItem}>- Analyser l'utilisation de notre site et de notre application.</Text>

      <Text style={styles.subtitle}>Partage des données :</Text>
      <Text style={styles.paragraph}>Nous ne vendons ni ne louons vos données personnelles à des tiers. Nous pouvons partager vos données avec :</Text>
      <Text style={styles.listItem}>- Des prestataires de services qui nous aident à fournir nos services.</Text>
      <Text style={styles.listItem}>- Des autorités légales si cela est requis par la loi.</Text>

      <Text style={styles.subtitle}>Sécurité des données :</Text>
      <Text style={styles.paragraph}>
        Nous mettons en œuvre des mesures de sécurité pour protéger vos données contre tout accès non autorisé, modification, divulgation ou destruction.
      </Text>

      <Text style={styles.subtitle}>Vos droits :</Text>
      <Text style={styles.paragraph}>Conformément au RGPD, vous avez le droit :</Text>
      <Text style={styles.listItem}>- D'accéder à vos données personnelles.</Text>
      <Text style={styles.listItem}>- De rectifier vos données si elles sont inexactes ou incomplètes.</Text>
      <Text style={styles.listItem}>- De demander la suppression de vos données.</Text>
      <Text style={styles.listItem}>- De limiter le traitement de vos données.</Text>
      <Text style={styles.listItem}>- De vous opposer au traitement de vos données.</Text>
      <Text style={styles.listItem}>- De la portabilité de vos données.</Text>
      <Text style={styles.paragraph}>Pour exercer ces droits, veuillez nous contacter à : privacy@harmonia.com</Text>

      <Text style={styles.subtitle}>Modification de la politique :</Text>
      <Text style={styles.paragraph}>
        Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Toute modification sera publiée sur cette page.
      </Text>

      <Text style={styles.subtitle}>Contact :</Text>
      <Text style={styles.paragraph}>
        Pour toute question concernant cette politique de confidentialité, vous pouvez nous contacter à : privacy@harmonia.com
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  LegalContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 5,
    paddingLeft: 20,
  },
});

export default TextPolitiqueDeConfidentialite;
