import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, Button, TouchableOpacity } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

const Card = ({article_id,  img, title, author}) => {
const navigation = useNavigation();
  const onPress = (id,) => {
    navigation.navigate('Article', {'id': id});
  };

  return (
    <TouchableOpacity onPress={() => onPress(article_id)}>
    <View style={styles.card}>
      <Image style={styles.image} source={{ uri: img }}/>
      <Text style={styles.heading}>{title}</Text>
      <Text style={styles.author}>{author}</Text>
    </View>
    </TouchableOpacity>
    
  );
};
const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        
        padding: 10,
    
    },
    image: {
        width: screenWidth - 30,
        height: 200,
        alignSelf: "center",
        borderRadius: 20,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      },
    heading: {
        fontSize: 24,
        fontWeight: "bold"
    },
    author: {
        fontSize: 14,
        textAlign: 'left'
    }
});

export default Card;
