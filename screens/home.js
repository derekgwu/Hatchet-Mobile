import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, Button, TouchableOpacity, ScrollView  } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Card from './components/article_card.js'

const Stack = createNativeStackNavigator();

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);



  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.86.57:5000/api');
      const jsonData = await response.json();
      setData(jsonData);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  const elements = [];
  if(data != null){
    for(let i = 0; i < data.articles.length; i++){

      var authors = "By "
      for(let j = 0; j < data.articles[i]['author'].length; j++){
        if(j == data.articles[i]['author'].length - 1 && j == 0){
          authors += data.articles[i]['author'][j]
        }
        else if(j == data.articles[i]['author'].length - 1){
          authors += " and " + data.articles[i]['author'][j]
        } 
        else if(j == 0){
          authors += data.articles[i]['author'][j]
        }
        else{
          authors += ", " + data.articles[i]['author'][j]
        }
      }

      elements.push(
        <Card article_id={data.articles[i]['id']} img={data.articles[i]['img']} title={data.articles[i]['title']} 
        author = {authors}></Card>
      )
    }
  }

  const navigation = useNavigation();
  const onPress = (id) => {
    navigation.navigate('Article', {'id': id});
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
      {loading ? (
        <View style={styles.container}>
          <Image source={require('./images/hatchet_logo.png')} style={styles.loading_img}/>
          <Text >Loading...</Text>
        </View>
      ) : (
        <View style={styles.homepage}>
          
          <Image style={styles.header} source={require('./images/hatchet_header.png')}/>
          <View style={styles.cards}>
          {elements}
          </View>

          
        </View>
      )}
    </View>
    </ScrollView>
    
  );
};
const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  loading_img: {
    borderRadius: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  header:{
    width: screenWidth, 
    height: screenWidth * (9 / 16) ,
    resizeMode: 'contain'
  },
  homepage: {
    flexDirection: 'column',
    backgroundColor: '#F7F7F7',
    minHeight: '100%',
    height: 'auto',
  }
});

export default Home;
