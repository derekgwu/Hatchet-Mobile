import React, { useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, ActivityIndicator, Button, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';


const Main = ({navigation, route}) => {
  const {link} = route.params
  const [isJavaScriptInjected, setIsJavaScriptInjected] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const mainUrl = link;
  const [current_link] = useState(link)
  const webViewRef = useRef(null);
  const goback = () => {
    if(webViewRef == null){
      console.log("here")
    }
    webViewRef.current.goBack();
  };
  const [isLoading, setIsLoading] = useState(true);

  const inject = `
    (function() {
      const section = document.getElementsByClassName('sno-footer-credit-inner')
      section[0].style.display = "none"

      const section2 = document.getElementsByClassName('sno-designer-area-row sno-designer-area-row-mobile-1')
      section2[0].style.display = "none"

      const hide4 = document.getElementById('mobilehomepage')
      const sections = hide4.querySelectorAll('section')
      
      sections[6].style.display = "none"
      sections[7].style.display = "none"

  
    })();
    true;
  `;

  

  const navigateBack = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
    } else {
      webViewRef.current.loadUrl(mainUrl);
    }
  };


  const onNavigationStateChange = (navState) => {
    // Reset the JavaScript injected state when navigation changes
    setIsJavaScriptInjected(false);
    setIsLoading(true);
    if (navState.nativeEvent.url === mainUrl) {
      setCanGoBack(false); 
    } else {

      setCanGoBack(true); 
    }
    
  };

  const navigate_to_page = (screenName) => {
    navigation.navigate(screenName)
  };



  const onPageLoad = () => {
    // JavaScript injection is complete
    setIsJavaScriptInjected(true);
    
    // Show content after a brief delay
    setTimeout(() => {
      setIsLoading(false);
    }, 500); // Adjust the delay as needed
  };
  const back_text = "<"

  return (
    <View style={styles.main}>
      <View style={styles.banner}>
        <View style={styles.backButtonContainer}>
        {canGoBack && (
          <TouchableOpacity onPress={goback}>
            <Image source={require('./images/back_arrow.png')} style={styles.back} />
          </TouchableOpacity>
        )}
            
     
        </View>
        <Image source={require('./images/hatchet_logo.png')} style={styles.logo} />
      </View>
      {!isJavaScriptInjected && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="256" color="#033b59" />
          <Text>Loading...</Text>
        </View>
      )}
      <WebView
        ref={webViewRef}
        source={{ uri: mainUrl }}
        injectedJavaScript={inject}
        onLoad={onPageLoad}
        onLoadProgress={onNavigationStateChange}

        style={{ flex: isJavaScriptInjected ? 1 : 0, opacity: isJavaScriptInjected ? 1 : 0 }}
      />
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
  }
});

export default Main;
