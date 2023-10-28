import React from "react";
import { View, Text, Image } from "react-native";

import styles from "./company.style";
import { icons } from "../../../constants";
import { checkImageURL } from "../../../utils";
import {images} from '../../../constants';
const Company = ({ companyLogo, title, rent, location }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image
           source={
            icons.location
          }
          style={styles.logoImage}
        />
      </View>

      <View style={styles.jobTitleBox}>
        <Text style={styles.jobTitle}>{title}</Text> 
      </View>

      <View style={styles.companyInfoBox}>
        <Text style={styles.companyName}>Median rent: {rent}</Text>
        {/* <View style={styles.locationBox}>
          <Image
            source={icons.location}
            resizeMode='contain'
            style={styles.locationImage}
          />
          <Text style={styles.locationName}>{location}</Text>
        </View> */}
      </View>
    </View>
  );
};

export default Company;
