import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import CardBanca from "../components/CardBanca";
import Bilhete from "../components/Bilhete";
import { useEffect, useState } from "react";
import casa from '../api/apiCasa'

export default function Home () {

    const [casaSelect, setCasaSelect] = useState('Todas')
    const [casaSelectData, setCasaSelectData] = useState([])

    useEffect(() => {
        if (!casaSelect) return;
        const get = async () => {
            if (casaSelect !== 'Todas') {
                const c = await casa.get(casaSelect)
                setCasaSelectData(c)
            } else {
                const c = await casa.getall()
                setCasaSelectData(c)
            }
        }
        get()
    }, [casaSelect])

    return (
        <SafeAreaView style={styles.container}>
            <Header setCasaSelect={setCasaSelect} />
            <CardBanca casa={casaSelectData} />
            <Bilhete />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 17,
        paddingRight: 17,
        padding: 17,
        flex: 1,
        gap: 25
    }
})