import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, ScrollView, Image, View, Modal, Pressable, TouchableOpacity, RefreshControl, TextInput } from 'react-native';
import { Icon, LinearProgress, Overlay } from 'react-native-elements';
import Card from "./components/Card";
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import styles from "./styles/AppStyle";

function HomeScreen() {

  const [countryCode, setCountryCode] = useState('in');
  const [countryName, setCountryName] = useState("India");
  const [categoryType, setCategoryType] = useState('general');

  // variables
  const API_KEY = "Your api key here";  // Get it from https://newsapi.org/
  const url = `https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=${API_KEY}`;
  const url2 = `https://newsapi.org/v2/top-headlines?country=${countryCode}&category=${categoryType}&apiKey=${API_KEY}`;
  const defaultImg = "https://cdn.pixabay.com/photo/2019/04/29/16/11/new-4166472_960_720.png";

  // Objects
  const categories = [
    { category: "business" },
    { category: "entertainment" },
    { category: "general" },
    { category: "health" },
    { category: "science" },
    { category: "sports" },
    { category: "technology" }
  ]

  const country = {
    countries: [
      { name: "Argentina", code: "ar" },
      { name: "Australia", code: "au" },
      { name: "Austria", code: "at" },
      { name: "Belgium", code: "be" },
      { name: "Brazil", code: "br" },
      { name: "Bulgaria", code: "bg" },
      { name: "Canada", code: "ca" },
      { name: "China", code: "ch" },
      { name: "Egypt", code: "eg" },
      { name: "France", code: "fr" },
      { name: "Germany", code: "gr" },
      { name: "Hong Kong", code: "hk" },
      { name: "Hungary", code: "hu" },
      { name: "India", code: "in" },
      { name: "Indonesia", code: "id" },
      { name: "Ireland", code: "ie" },
      { name: "Italy", code: "it" },
      { name: "Japan", code: "jp" },
      { name: "Korea", code: "kp" },
      { name: "Malaysia", code: "my" },
      { name: "Mexico", code: "mx" },
      { name: "Netherland", code: "nl" },
      { name: "Nigeria", code: "ng" },
      { name: "Philippines", code: "ph" },
      { name: "Poland", code: "pl" },
      { name: "Portugal", code: "pt" },
      { name: "Russia", code: "ru" },
      { name: "Saudi Arabia", code: "sa" },
      { name: "Singapore", code: "sg" },
      { name: "South Africa", code: "za" },
      { name: "Switzerland", code: "ch" },
      { name: "Thailand", code: "th" },
      { name: "Turkey", code: "tr" },
      { name: "UAE", code: "ae" },
      { name: "United Kingdom", code: "gb" },
      { name: "USA", code: "us" },
    ]
  }

  // States
  const [refreshing, setRefreshing] = useState(false);
  const [postData, setpostData] = useState([]);
  const [savedPostData, setSavedPostData] = useState([]);
  const [countryModalVisible, setcountryModalVisible] = useState(false);
  const [categoryModalVisible, setcategoryModalVisible] = useState(false);
  const [netCheck, setNetCheck] = useState(false);
  const [isContentFetched, setisContentFetched] = useState(false);

  // Functions
  useEffect(() => {
    axios.get(url)
      .then(res => {
        setpostData(res.data['articles']);
        setSavedPostData(res.data['articles']);
      })
      .catch(err => {
        setpostData(savedPostData);
        console.log(err);
      })
  }, [countryCode]);

  useEffect(() => {
    axios.get(url2)
      .then(res => {
        setpostData(res.data['articles']);
      })
      .catch(err => {
        console.log(err);
      })
  }, [categoryType]);

  // check Internet status
  useEffect(() => {
    axios.get("https://www.google.com/")
      .then(res => {
        if (res.status === 200) {
          setNetCheck(false);
        }
      })
      .catch(err => {
        if (err.status !== 200) {
          setNetCheck(true);
        }
        console.log(err);
      });
  }, [])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setisContentFetched(true);
    setTimeout(() => setRefreshing(false), 5000);
    setTimeout(() => setisContentFetched(false), 5000);
  }, [countryCode]);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', borderWidth: 3, borderBottomColor: '#fff', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: "row", justifyContent: 'flex-start' }}>
          <Image source={require("./assets/icon.png")} style={{ height: 60, width: 60, marginLeft: 10, marginTop: 25 }} />
          <View style={styles.country}>
            <Text style={styles.appName}> Newsly </Text>
            <Text style={{ color: 'ghostwhite', fontSize: 15, fontFamily: "serif", alignSelf: "flex-start", paddingHorizontal: 20, paddingBottom: 10 }}> ({countryName})</Text>
          </View>
        </View>
        <View style={styles.topBtn}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Icon
              name='category'
              type='materialicon'
              color='#fff'
              size={35}
              style={{ marginHorizontal: 10 }}
              onPress={() => { setcategoryModalVisible(!categoryModalVisible) }}
            />
            <Icon
              name='globe-outline'
              type='ionicon'
              color='#fff'
              size={35}
              onPress={() => { setcountryModalVisible(!countryModalVisible) }} />
          </View>
        </View>

        {/* Internet status Overlay */}
        <Overlay backdropStyle={{ backgroundColor: "rgba(0,0,0,0.8)" }} isVisible={netCheck}>
          <View style={{ borderRadius: 20, backgroundColor: '#ffffff', padding: 20 }}>
            <Text style={{ color: 'red', fontSize: 30, alignSelf: 'center' }}>Oops!</Text>
            <Image style={{ height: 200, width: 200, alignSelf: 'center' }} source={require("./assets/noInternet.gif")} />
            <Text style={{ color: 'red', fontSize: 20 }}>No Internet Connection!</Text>
          </View>
        </Overlay>

        {/* Content Not Fetched */}
        <Overlay isVisible={isContentFetched}>
          <View style={{ borderRadius: 20, backgroundColor: '#ffffff', padding: 20 }}>
            <Image style={{ height: 200, width: 200, alignSelf: 'center' }} source={require("./assets/fetching.gif")} />
          </View>
        </Overlay>

        {/* country Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={countryModalVisible}
          onRequestClose={() => {
            setcountryModalVisible(!countryModalVisible);
          }}
        >
          <View>
            <View style={styles.modalView}>
              <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 20 }}>
                <Text style={{ color: "#fff", fontSize: 25, paddingStart: 12, fontFamily: 'monospace', fontWeight: 'bold' }}>Select Country</Text>
                <Pressable
                  onPress={() => setcountryModalVisible(!countryModalVisible)}
                >
                  <Icon name="close-circle-outline" type="ionicon" color="white" size={35} />
                </Pressable>
              </View>
              <View style={{ backgroundColor: "rgba(0,0,0,0.6)", borderRadius: 30 }}>
                <ScrollView>
                  {country['countries'].map((item, index) => {

                    const handleCountrySelect = () => {
                      setCountryCode(item.code);
                      setCountryName(item.name);
                      setcountryModalVisible(!countryModalVisible);
                      onRefresh();
                    };

                    return (
                      <TouchableOpacity key={index} onPress={() => handleCountrySelect()}>
                        <View style={styles.countryList}>
                          <Text style={styles.countryName}>{item.name}</Text>
                        </View>
                      </TouchableOpacity>
                    )
                  })}
                  <View style={{ paddingBottom: 100, paddingTop: 50, marginHorizontal: 20 }}>
                    <Text style={{ color: "gold", fontSize: 20 }}>...</Text>
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>
        </Modal>

        {/* category Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={categoryModalVisible}
          onRequestClose={() => {
            setcategoryModalVisible(!categoryModalVisible);
          }}
        >
          <View>
            <View style={styles.modalView}>
              <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 20 }}>
                <Text style={{ color: "#fff", fontSize: 25, paddingStart: 12, fontFamily: 'monospace', fontWeight: 'bold' }}>Select Category</Text>
                <Pressable
                  onPress={() => setcategoryModalVisible(!categoryModalVisible)}
                >
                  <Icon name="close-circle-outline" type="ionicon" color="white" size={35} />
                </Pressable>
              </View>
              <View style={{ backgroundColor: "rgba(0,0,0,0.6)", borderRadius: 30 }}>
                <ScrollView>
                  {categories.map((item, index) => {

                    const handleCategorySelect = () => {
                      setCategoryType(item.category);
                      setcategoryModalVisible(!categoryModalVisible);
                      onRefresh();
                    };

                    return (
                      <TouchableOpacity key={index} onPress={() => handleCategorySelect()}>
                        <View style={styles.categoryList}>
                          <Text style={styles.categoryName}>{item.category.toLocaleUpperCase()}</Text>
                        </View>
                      </TouchableOpacity>
                    )
                  })}
                  <View style={{ paddingBottom: 100, paddingTop: 50, marginHorizontal: 20 }}>
                    <Text style={{ color: "gold", fontSize: 20 }}>...</Text>
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>
        </Modal>

      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh()}
          />
        }
      >
        <View style={{ paddingHorizontal: 10, paddingTop: 5 }}>
          <Text style={{ color: 'gold', fontSize: 25, fontFamily: "serif" }}>Today's Top Headlines</Text>
        </View>
        {postData.map((item, index) => (
          <Card key={index}
            title={item.title}
            description={item.description === null ? item.title : item.description}
            imgUrl={item.urlToImage === null ? defaultImg : item.urlToImage}
            date={item.publishedAt.slice(0, 10)}
            source={item.source.name}
            sourceUrl={item.url === null ? "https://news.google.com/" : item.url}
            sharingUrl={item.url}
          />
        ))}
      </ScrollView>
      <StatusBar style="light" />
    </View>
  );
}

function SearchScreen() {

  const [search, setSearch] = useState('');
  const [inputFocusColor, setinputFocusColor] = useState('#1a75ff');
  const [searchData, setSearchData] = useState([]);
  const [searchSubmit, setsearchSubmit] = useState(false);
  const [textDisplay, setTextDisplay] = useState('none');
  const [loadingDisplay, setLoadingDisplay] = useState('none');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filter, setFilter] = useState('publishedAt');

  const url = `https://newsapi.org/v2/everything?q=${search}&sortBy=${filter}&apiKey=${API_KEY}`;
  const url2 = `https://newsapi.org/v2/everything?q=${search}&sortBy=${filter}&apiKey=${API_KEY}`;

  const defaultImg = "https://cdn.pixabay.com/photo/2013/07/12/19/16/newspaper-154444_960_720.png";
  const unsplashImg = "https://source.unsplash.com/800x800/?news,newspaper";

  const filters = [
    { type: "relevancy" },
    { type: "popularity" },
    { type: "publishedAt" }
  ]

  useEffect(() => {
    axios.get(url)
      .then(res => {
        setSearchData(res.data['articles']);
      })
      .catch(err => {
        console.log(err);
      })
  }, [searchSubmit]);

  useEffect(() => {
    axios.get(url2)
      .then(res => {
        setSearchData(res.data['articles']);
      })
      .catch(err => {
        console.log(err);
      })
  }, [filter]);

  const OnSubmitSearch = () => {
    setsearchSubmit(true);
    setTextDisplay('flex');
    setLoadingDisplay('flex');
    setTimeout(() => setLoadingDisplay('none'), 4000);
  };

  const focusHandling = () => {
    setinputFocusColor('limegreen');
    setTextDisplay('none');
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', borderWidth: 3, borderBottomColor: '#fff', justifyContent: 'space-between' }}>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.appName}> Newsly </Text>
        </View>
        <View style={styles.topBtn}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Icon
              name='filter'
              type='ionicon'
              color='#fff'
              size={35}
              style={{ marginHorizontal: 10 }}
              onPress={() => { setFilterModalVisible(!filterModalVisible) }}
            />
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={filterModalVisible}
            onRequestClose={() => {
              setFilterModalVisible(!filterModalVisible);
            }}
          >
            <View>
              <View style={styles.filterModalView}>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 20 }}>
                  <Text style={{ color: "#fff", fontSize: 25, paddingStart: 12, fontFamily: 'monospace', fontWeight: 'bold' }}>Filter Search By</Text>
                  <Pressable
                    onPress={() => setFilterModalVisible(!filterModalVisible)}
                  >
                    <Icon name="close-circle-outline" type="ionicon" color="white" size={35} />
                  </Pressable>
                </View>
                <View style={{ backgroundColor: "rgba(0,0,0,0.6)", borderRadius: 30 }}>
                  <ScrollView>
                    {filters.map((item, index) => {

                      const handleFilterSelect = () => {
                        setFilter(item.type);
                        setFilterModalVisible(!filterModalVisible);
                      };

                      return (
                        <TouchableOpacity key={index} onPress={() => handleFilterSelect()}>
                          <View style={styles.countryList}>
                            <Text style={styles.countryName}>{item.type.toLocaleUpperCase()}</Text>
                          </View>
                        </TouchableOpacity>
                      )
                    })}
                    <View style={{ paddingBottom: 50, paddingTop: 50, marginHorizontal: 20 }}>
                    </View>
                  </ScrollView>
                </View>
              </View>
            </View>
          </Modal>
        </View>

      </View>
      <ScrollView>
        <View style={{ margin: 10 }}>
          <TextInput
            placeholder="Search for articles..."
            onChangeText={(text) => setSearch(text)}
            value={search}
            maxLength={30}
            style={[styles.input, { borderColor: inputFocusColor }]}
            returnKeyType="search"
            onFocus={focusHandling}
            onBlur={() => setinputFocusColor('#1a75ff')}
            autoCorrect={true}
            onSubmitEditing={OnSubmitSearch}
          />
        </View>
        <View>
          <LinearProgress color="primary" style={{ display: loadingDisplay }} />
        </View>
        <View style={{ paddingHorizontal: 15, display: textDisplay }}>
          <Text style={{ color: '#1a75ff', fontSize: 20, fontFamily: "serif" }}>Search Results for '{search}'</Text>
        </View>
        {searchData.map((item, index) => (
          <Card key={index}
            title={item.title}
            description={item.description === null ? item.title : item.description}
            imgUrl={item.urlToImage === null ? defaultImg : item.urlToImage}
            date={item.publishedAt.slice(0, 10)}
            source={item.source.name}
            sourceUrl={item.url === null ? "https://news.google.com/" : item.url}
            sharingUrl={item.url}
          />
        ))}
        <Image style={styles.defaultSearchImage} source={{ uri: unsplashImg }} />
        <View style={styles.defaultImageText}>
          <Text style={styles.searchNow}>“A good newspaper, I suppose, is a nation talking to itself.”</Text>
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </View>
  );
}

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        barStyle={{ backgroundColor: 'rgba(10,10,10,1)', borderTopColor: 'ghostwhite', borderTopWidth: 3 }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search';
            } else if (route.name === 'Video') {
              iconName = focused ? 'tv' : 'tv-outline';
            }
            // You can return any component that you like here!
            return <Icon name={iconName} type="ionicon" size={20} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
