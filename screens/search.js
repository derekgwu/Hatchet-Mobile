import React, { useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, ActivityIndicator, Button, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';


const SearchPage = ({navigation}) => {

  const webViewRef = useRef(null);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const handleButtonPress = () => {
    console.log(inputValue);
    const link = "https://gwhatchet.com/?s=" + inputValue
    navigation.navigate("Custom", {link: link})
  };
  

  const navigate_to_page = (screenName) => {
    navigation.navigate(screenName)
  };




  return (
    <View style={styles.main}>
      <View style={styles.banner}>
        <Image source={require('./images/hatchet_logo.png')} style={styles.logo} />
      </View>
      <ScrollView style={styles.search}>
        <Text style={styles.heading}>Search</Text>
        <TextInput
        style={styles.input}
        placeholder="Search By Topic"
        value={inputValue}
        onSubmitEditing={handleButtonPress}
        onChangeText={handleInputChange}
      />
      </ScrollView>

      
      
      <View style={styles.footer}>
      <TouchableOpacity onPress={() => navigate_to_page("Main")}>
          <View style={styles.footer_btn}>
            <Image source={require('./images/home.png')} style={styles.footer_img}></Image>
            <Text style={styles.footer_text}>Home</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigate_to_page("News")}>
          <View style={styles.footer_btn}>
            <Image source={require('./images/newspaper.png')} style={styles.footer_img}></Image>
            <Text style={styles.footer_text}>News</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigate_to_page("Multimedia")}>
          <View style={styles.footer_btn}>
            <Image source={require('./images/video.png')} style={styles.footer_img}></Image>
            <Text style={styles.footer_text}>Multimedia</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigate_to_page("Podcasts")}>
          <View style={styles.footer_btn}>
            <Image source={require('./images/headphones.png')} style={styles.footer_img}></Image>
            <Text style={styles.footer_text}>Podcasts</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.footer_btn}>
            <Image source={require('./images/search.png')} style={styles.footer_img}></Image>
            <Text style={styles.footer_text}>Search</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    width: '100%',
    height: '10%',
    backgroundColor: "#043C5B",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: '100%',
    height: '7%',
    padding: "1%",
    backgroundColor: "#043C5B",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row"
  },
  footer_btn:{
    resizeMode: "contain",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  back_text:{
    color: "white"
  },
  footer_img:{
    flex: 1,
    width: 40,
    height: 40,
    resizeMode: "contain"
  },
  footer_text: {
    color: "white"
  },
  backButton: {
    color: "#043C5B",
    backgroundColor: "white"
  },
  backButtonContainer: {
    position: 'absolute',
    alignItems: "center",
    justifyContent: "center",
    left: 25,
    top: 70,
    transform: [{ translateY: -50 }],
  },
  logo: {
    resizeMode: 'contain',
    width: '40%',
    height: '100%',
  },
  webView: {
    flex: 1,
  },
  back: {
    resizeMode: "contain",
    width: 40,
    height: 40,
  },
  search : { 
    width: "90%",
    padding: "5%",
  },
  input : {
    backgroundColor: "gray",
    padding: 5,
    borderRadius: 10
  },
  heading : {
    fontSize: 24,
    marginBottom: "5%",
    fontWeight: "bold"
  }
});

export default SearchPage;
