import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

function TextPolitiqueDeCookies() {
  return (
    <ScrollView contentContainerStyle={styles.LegalContainer}>
      <Text style={styles.title}>Politique de Cookies</Text>
      <Text style={styles.paragraph}>
        Cette politique de cookies explique comment Harmonia utilise des cookies et des technologies similaires pour vous reconnaître lorsque vous visitez notre site Web. Elle explique ce que sont ces technologies et pourquoi nous les utilisons, ainsi que vos droits de contrôler notre utilisation de celles-ci.
      </Text>

      <Text style={styles.subtitle}>Qu'est-ce qu'un cookie ?</Text>
      <Text style={styles.paragraph}>
        Un cookie est un petit fichier texte qui est stocké sur votre ordinateur ou appareil mobile lorsque vous visitez un site Web. Les cookies sont largement utilisés pour faire fonctionner les sites Web, ou pour les faire fonctionner plus efficacement, ainsi que pour fournir des informations aux propriétaires du site.
      </Text>

      <Text style={styles.subtitle}>Pourquoi utilisons-nous des cookies ?</Text>
      <Text style={styles.paragraph}>Nous utilisons des cookies pour :</Text>
      <Text style={styles.listItem}>- Vous authentifier et vous identifier sur notre site Web.</Text>
      <Text style={styles.listItem}>- Améliorer la sécurité de notre site Web.</Text>
      <Text style={styles.listItem}>- Mémoriser vos préférences et paramètres de navigation.</Text>
      <Text style={styles.listItem}>- Analyser l'utilisation de notre site Web pour améliorer nos services.</Text>

      <Text style={styles.subtitle}>Types de cookies que nous utilisons :</Text>
      <Text style={styles.paragraph}>Nous utilisons les types de cookies suivants :</Text>
      <Text style={styles.listItem}>- Cookies strictement nécessaires : Ces cookies sont indispensables pour vous permettre de naviguer sur notre site Web et d'en utiliser les fonctionnalités.</Text>
      <Text style={styles.listItem}>- Cookies de performance : Ces cookies collectent des informations sur la manière dont les visiteurs utilisent notre site Web.</Text>
      <Text style={styles.listItem}>- Cookies de fonctionnalité : Ces cookies permettent à notre site Web de se souvenir des choix que vous faites.</Text>
      <Text style={styles.listItem}>- Cookies de ciblage/publicité : Ces cookies sont utilisés pour diffuser des publicités plus pertinentes pour vous et vos intérêts.</Text>

      <Text style={styles.subtitle}>Comment pouvez-vous contrôler les cookies ?</Text>
      <Text style={styles.paragraph}>
        Vous pouvez contrôler et/ou supprimer les cookies comme vous le souhaitez. Vous pouvez supprimer tous les cookies qui sont déjà sur votre ordinateur et vous pouvez configurer la plupart des navigateurs pour empêcher leur placement. Toutefois, si vous faites cela, vous devrez peut-être ajuster manuellement certaines préférences chaque fois que vous visitez un site et certains services et fonctionnalités peuvent ne pas fonctionner.
      </Text>

      <Text style={styles.subtitle}>Modification de la politique de cookies :</Text>
      <Text style={styles.paragraph}>
        Nous pouvons mettre à jour cette politique de cookies de temps à autre afin de refléter, par exemple, les changements apportés à nos pratiques ou pour d'autres raisons opérationnelles, légales ou réglementaires. Veuillez donc la consulter régulièrement pour vous tenir informé de notre utilisation des cookies et des technologies associées.
      </Text>

      <Text style={styles.subtitle}>Contact :</Text>
      <Text style={styles.paragraph}>
        Pour toute question concernant notre utilisation des cookies, veuillez nous contacter à : harmonia.contactus@gmail.com
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

export default TextPolitiqueDeCookies;
