import React from 'react';
import CustomHeader from "../../components/CustomElements/CustomHeader";
import CloseImg from "../../media/Icons/Close.svg";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import ContentView from "../../components/ContentView";
import SvgUri from "react-native-svg-uri";
import EditImage from "../../media/Icons/EditImage.svg";
import Edit from "../../media/Icons/Edit.svg";
import CustomButton from "../../components/CustomElements/CustomButton";

function UserPicture({navigation},props) {
    return (
        <View style={{flex: 1, backgroundColor: "white"}}>
            <CustomHeader goBackAction={navigation.goBack} backIconHeight={14} style={{borderBottomWidth: 0}}
                          backIconWidth={14} backButtonImg={CloseImg} hasBackButton={true}/>
            <ContentView>
                <View style={styles.centeredImage}>
                    <View style={styles.userImageWrapper} onPress={()=>{navigation.navigate("userPicture")}}>
                            <View style={styles.svgUriWrapper}>
                                <SvgUri style={styles.userImage} width={120} height={120} source={EditImage}/>
                            </View>
                    </View>
                    <Text style={styles.userPictureText}>
                        Требуется доступ к фотогалерее
                        и камере
                    </Text>
                    <CustomButton style={{marginTop:50, width:230}} title={"Перейти в настройки"}/>
                </View>
            </ContentView>
        </View>
    );
}

const styles = StyleSheet.create({
    userPictureText:{
      marginTop:40,
        fontSize:18,
        width:"79%",
        textAlign:"center"
    },
    svgUriWrapper: {
        borderRadius: 10000,
        width: 120,
        height: 120,
        overflow: "hidden"
    },
    centeredImage: {
        alignItems: "center",
        marginTop: 20
    },
    editProfileImage: {
        position: "absolute",
        bottom: 5,
        right: 5
    }
})

export default UserPicture;