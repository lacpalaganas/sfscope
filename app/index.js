import {View, Text, ScrollView, SafeAreaView} from 'react-native'
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';


import {COLORS, icons, images, SIZES} from '../constants'
import{Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome, Carousel} from '../components'
const Home = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState(""); 
    return (
        <SafeAreaView style={{flex: 1 ,backgroundColor:COLORS.lightWhite}}> 
          <Stack.Screen
          options={{headerStyle: {backgroundColor: COLORS.lightWhite},
        headerShadowVisible:false, 
        // headerLeft: () => (<ScreenHeaderBtn iconUrl={icons.menu} dimension="60%"/>),
        // headerRight: () => (<ScreenHeaderBtn iconUrl={images.profile} dimension="100%"/>),
    headerTitle:"SFScope"}}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flex:1,padding: SIZES.medium}}>
        {/* <Popularjobs/> */}
        <Carousel/>
            <Welcome searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleClick={() => {
              if(searchTerm){
                router.push(`/search/${searchTerm}`)
              }
            }} />
            
            <Nearbyjobs/>
        </View>
          </ScrollView>
        </SafeAreaView> 
    )
}

export default Home;