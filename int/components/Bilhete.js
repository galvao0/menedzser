import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import escudos from '../json/images/team.json'

export default function Bilhete () {

    const [iconHeader, setIconHeader] = useState('chevron-down')
    const [open, setOpen] = useState(false)

    const openBilhete = () => {
        setIconHeader('chevron-up')
        setOpen(!open)
    }

    const clubeEscudo = (es) => {
        return { uri: escudos[es] || escudos["senza"] };
    }

    return (
        <View style={styles.bilhete}>
            <TouchableOpacity style={styles.header} onPress={openBilhete}>
                <View style={styles.extremoCont}>
                    <Ionicons name='ticket-outline' size={17} />
                    <Text>Multipla</Text>
                    <Text style={styles.qtd}>3</Text>
                </View>
                <View style={styles.extremoCont}>
                    <Text style={styles.odds}>3.5</Text>
                    <Ionicons name={iconHeader} size={17} />
                </View>
            </TouchableOpacity>
            {open && (
                <View style={styles.palpites}>
                    <View style={styles.jogo}>
                        <View style={styles.time}>
                            <Image source={ clubeEscudo('Cusco') } style={styles.escudo} />
                            <Text style={styles.timeTxt}>Cusco</Text>
                        </View>
                        <Text style={styles.timeTxt}>-</Text>
                        <View style={styles.time}>
                            <Image source={ clubeEscudo('Flamengo') } style={styles.escudo} />
                            <Text style={styles.timeTxt}>Flamengo</Text>
                        </View>
                    </View>
                    <View style={styles.selecoes}>
                        <View style={styles.palpite}>
                            <Text style={{ fontWeight: 'bold' }}>1.5+ gols</Text>
                            <Ionicons name='checkmark' size={13} color='#048600' />
                        </View>
                    </View>
                    <View style={styles.footer}>
                        <View style={styles.info}>
                            <Text style={styles.cabInfo}>aposta</Text>
                            <Text style={styles.vInfo}>R$ 30</Text>
                        </View>
                        <TouchableOpacity style={styles.cashout}>
                            <Text style={styles.btnTxt}>Cash out</Text>
                        </TouchableOpacity>
                        <View style={styles.info}>
                            <Text style={styles.cabInfo}>estimativa</Text>
                            <Text style={styles.vInfo}>R$ 30</Text>
                        </View>
                    </View>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    bilhete: {
        padding: 17,
        backgroundColor: '#fff',
        borderRadius: 20,
        gap: 27
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    extremoCont: {
        flexDirection: 'row',
        gap: 7,
        alignItems: 'center'
    },
    odds: {
        fontWeight: 'bold',
    },
    qtd: {
        backgroundColor: '#353535',
        borderRadius: 17,
        width: 21,
        height: 18,
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
    },
    jogo: {
        flexDirection: 'row',
        gap: 5
    },
    timeTxt: {
        fontSize: 12,
        fontWeight: '500'
    },
    palpites: {
        padding: 7,
        gap: 7
    },
    escudo: {
        width: 13,
        height: 13
    },
    time: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2
    },
    selecoes: {
        marginLeft: 10
    },
    palpite: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3
    },
    cashout: {
        padding: 10,
        backgroundColor: '#242424',
        borderRadius: 20,
        width: 88,
        alignItems: 'center',
    },
    btnTxt: {
        color: '#fff',
        fontWeight: 'bold',
    },
    footer: {
        marginTop: 17,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cabInfo: {
        fontSize: 12,
        color: '#585858'
    },
    vInfo: {
        fontWeight: '500'
    }
})