import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, ScrollView, ActivityIndicator, TouchableOpacity} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';



const Article = ({route, navigation}) => {
  const {article, id} = route.params;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);




  const fetchData = async () => {
    try {
      var address = 'http://192.168.86.57:5000/article/' + id;
      console.log(address)
      const response = await fetch(address);
      const jsonData = await response.json();
      setData(jsonData);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
 
  

  if(data != null){
    var authors = "By "
    for(let i = 0; i < data.authors.length; i++){
      if(i == data.authors.length - 1 && i == 0){
        authors += data.authors[i]
      }
      else if(i == data.authors.length - 1){
        authors += " and " + data.authors[i]
      } 
      else if(i == 0){
        authors += data.authors[i]
      }
      else{
        authors += ", " + data.authors[i]
      }
    }
  }

  const story = []
  if(data != null){
    const formattedStory = data.story.join('\n\n\n');

  story.push(
    <Text key={0} style={styles.paragraph}>
      {formattedStory}
    </Text>
  )
  }
  var back_arrow = "<"

  const onPress = () => {
    navigation.navigate('Home');
  };
  


  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Image source={require('./images/hatchet_logo.png')} style={styles.banner_img} />
      </View>
     
        {loading ? (
          <View style={styles.loading_container}>
            <ActivityIndicator size={64} color="#043C5B" style={styles.loadingIndicator} />
            <Text>Loading...</Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.articlepage}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{ uri: data.front_img }}
              />
            </View>
            <View style={styles.textView}>
              <Text style={styles.title}>{data.title}</Text>
              <Text>{authors}</Text>
              <Text>{data.date}</Text>
            </View>
            <View style={styles.textView}>
              {story}
            </View>
          </View>
          </ScrollView>
        )}
      
    </View>
  );
};
const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    alignItems: 'center',
    backgroundColor: '#fff',
 
  },
  backButton: {
    position: 'absolute',
    left: 20, // Adjust the position as needed
    color: "white",
    fontSize: 64
  },
  loadingIndicator: {
    transform: [{ rotate: '90deg' }], // Rotate the loading indicator
    color:  "#043C5B",
    size: "large"
  },
  banner : {
    width: "100%",
    height: '10%',
    backgroundColor: "#043C5B",
    flexDirection: "row", 
    alignItems: "center",
    justifyContent: "center",
 
  },
  banner_img : {
    resizeMode: 'contain',
    width: '100%',
    height : '100%'
  },
  loading_container: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    padding: "5%",
    paddingTop: "10%",
    alignItems: 'center',
    backgroundColor: '#fff',
 
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  articlepage: {
    fontFamily: 'Times New Roman',
    flexDirection: "column",
    overflow: "scroll"
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
  },
  imageContainer: {
    padding: 0,
    width: '100%', // Make the image container occupy the full width
    aspectRatio: 16 / 9, // Set aspect ratio to maintain image proportions
  },
  image: {
    flex: 1,
    resizeMode: 'cover', // Adjust the image's resizeMode as needed
  },
  textView : {
    padding: "5%",
    flexDirection: "column",
  },
  paragraph : {
    fontSize: 14, 
    marginBottom: 20,
    padding: 10
  }
  
  
});

export default Article;
