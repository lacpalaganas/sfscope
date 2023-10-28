import React from "react";
import axios from 'axios'
import {Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl} from 'react-native'
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { useCallback, useState, useEffect } from "react";

import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from "../../components";
import { COLORS, icons, SIZES} from '../../constants'

import useFetch from "../../hook/useFetch";

const tabs = ["About", "Arts", "Restaurants", "Groceries", "Cafes", "Shopping","Night Life"];
const JobDetails = () => { 

    const params = useLocalSearchParams();
    const router = useRouter();
    const { data, isLoading, error } = useFetch();

    const [refreshing, setRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [filtered, setFiltered] = useState([]);

    // useEffect(()=>{
    //     axios.get("https://lacpalaganas.github.io/VS/neighborhood.json").then(response => {setFiltered(response.data)})
    //     .catch(error => {});
    //     console.log(filtered);
	// }, []);
    //const nhoodData = filtered.filter(item => item.nhoodID === params.id);
    const nhoodData = params.id -1;
    const onRefresh = () => {}

    const displayTabContent = () => {
        switch (activeTab){
            case "About":
                return <JobAbout
                info={data[nhoodData].desc ?? "No data"} />
                break;
            case "Arts":
                return <Specifics 
                title="Arts"
                points={data[nhoodData].arts ?? ['N/A']} />        
                break;
            case "Restaurants":
                return <Specifics 
                title="Restaurants"
                points={data[nhoodData].restaurants ?? ['N/A']} />  
                break;   
            case "Groceries":
                return <Specifics 
                title="Groceries"
                points={data[nhoodData].groceries ?? ['N/A']} />  
                break;   
            case "Cafes":
                return <Specifics 
                title="Cafes"
                points={data[nhoodData].cafes?? ['N/A']} />  
                break;   
            case "Shopping":
                return <Specifics 
                title="Shopping"
                points={data[nhoodData].shopping ?? ['N/A']} />  
                break;   
            case "Night Life":
                return <Specifics 
                title="Night Life"
                points={data[nhoodData].nightLife ?? ['N/A']} />  
                break;   
            default:
                break;
            
        }
    }
    //console.log(nhoodData);
    return (
       <SafeAreaView style= {{flex: 1, backgroundColor: COLORS.lightWhite}}>
        <Stack.Screen
        options={{
            headerStyle: {backgroundColor: COLORS.lightWhite},
            headerShadowVisible: false,
            headerLeft: () => (<ScreenHeaderBtn iconUrl={icons.left} dimension="60%" handlePress={() => router.back()}/>),
            headerTitle:"Details"
        }}/>
        <>
        <ScrollView showsVerticalScrollIndicator={false} 
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        >
            {isLoading ?
            (<ActivityIndicator  size="large" color={COLORS.primary}/>) 
            : error ? (<Text>Something went wrong.</Text>)
            : data.length === 0 ? (<Text>No Data.</Text>) : 
            (
                <View style={{padding: SIZES.medium, paddingBottom: 100}}>
                    <Company 
                    title={data[nhoodData].nhood}
                    rent = {data[nhoodData].rent}
                    >

                    </Company>
                    <JobTabs
                    tabs={tabs}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    >

                    </JobTabs>
                    {displayTabContent()}
                </View>
            )
        }
        </ScrollView>
        </>
       </SafeAreaView>
    )
}

export default JobDetails