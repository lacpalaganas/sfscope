import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import styles from "./popularjobs.style";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import useFetch from "../../../hook/useFetch";
import axios from 'axios'
const Popularjobs = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch();
  const [selectedJob, setSelectedJob] = useState();
  const [searchResult, setSearchResult] = useState([]);
  
  const handleAds = async () => {
    setSearchResult([])

    try {
        const options = {
            method: "GET",
            url: `https://myneighborhoodscope.com/zipAdsJson.php`,
        };

        const response = await axios.request(options);
        setSearchResult(response.data);
       
    } catch (error) {
        console.log(error);
    } finally {
  
    }
};
  const handleCardPress = (item) => {
    router.push(`/nhood-details/${item.nhoodid}`);
    setSelectedJob(item.nhoodid);
  };
  useEffect(() => {
    handleAds()
}, [])
console.log(searchResult);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Text style={styles.headerTitle}>Popular Neighborhood</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity> */}
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={searchResult}
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                selectedJob={selectedJob}
                handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
