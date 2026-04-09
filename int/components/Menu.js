import { Text, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons'
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import conf from '../app.json'
import { TouchableOpacity } from "react-native";
import { navigate } from "../Navigation";
import userIcon from '../assets/user.png'
import { Image } from "react-native";

export default function Menu () {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.logo}>
                    <Ionicons name='football' size={37} />
                    <Text style={styles.logoTxt}>{conf.expo.name}</Text>
                </View>
                <TouchableOpacity onPress={() => navigate('Home')}>
                    <Ionicons name='chevron-back' size={21} />
                </TouchableOpacity>
            </View>
            <View style={styles.torzs}>
                <View style={styles.item}>
                    <Ionicons name='analytics' size={21} />
                    <Text style={styles.itemTxt}>Dashboard</Text>
                </View>
                <View style={styles.item}>
                    <Ionicons name='ticket-outline' size={21} />
                    <Text style={styles.itemTxt}>Montar Bilhete</Text>
                </View>
                <View style={styles.item}>
                    <Ionicons name='wallet-outline' size={21} />
                    <Text style={styles.itemTxt}>Casa de aposta</Text>
                </View>
                <View style={styles.item}>
                    <Ionicons name='stats-chart' size={21} />
                    <Text style={styles.itemTxt}>Dashboard</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <View style={styles.divUser}>
                    <View style={styles.userIcon}>
                        <Image source={userIcon} style={{ height: 25, width: 25 }} />
                    </View>
                    <View>
                        <Text style={styles.user}>User</Text>
                        <Text style={styles.email}>pedro@gmail.com</Text>
                    </View>
                </View>
                <Ionicons name='log-out-outline' size={21} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 17,
        flex: 1
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 11
    },
    logo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7
    },
    logoTxt: {
        fontWeight: 'bold',
        fontSize: 17
    },
    userIcon: {
        backgroundColor: '#2c2c2c',
        padding: 10,
        borderRadius: 50,
        width: 45,
        elevation: 10
    },
    divUser: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7
    },
    torzs: {
        flex: 1,
        padding: 17,
        gap: 21,
        paddingTop: 50
    },
    item: {
        flexDirection: 'row',
        gap: 17,
        alignItems: 'center'
    },
    itemTxt: {
        fontSize: 17,
    },
    footer: {
        flexDirection: 'row',
        padding: 11,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    user: {
        fontWeight: 'bold'
    },
    email: {
        fontSize: 12
    }
})