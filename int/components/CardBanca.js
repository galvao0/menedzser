import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import saqueIcon from '../assets/saque.png'
import depositoIcon from '../assets/deposit.png'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from "react";
import { navigate } from '../Navigation'

export default function CardBanca ({ casa }) {

    const [banca, setBanca] = useState(0)
    const [iconEye, setIconEye] = useState('eye-off')
    const [bancaV, setBancaV] = useState('')

    useEffect(() => {
        const atBanca = () => {
            if (!casa) return
            if (Array.isArray(casa)) {
                const t = casa.reduce((ac, c) => ac + Number(c.banca), 0)
                setBanca(t.toFixed(2))
                return
            }
            setBanca(casa.banca)
        }
        atBanca()
    }, [casa, banca])

    const hideBanca = () => {
        if (iconEye === 'eye-off') {
            setIconEye('eye')
            setBancaV('***')
        } else {
            setIconEye('eye-off')
            setBancaV('')
        }
    }

    return (
        <View style={styles.banca}>
            <Text style={{ fontWeight: 'bold' }}>Banca</Text>
            <View style={styles.saldo}>
                <Text style={styles.sinfrao}>R$</Text>
                <View style={styles.dinEye}>
                    <Text style={styles.dinheiro}>{bancaV || banca}</Text>
                    <TouchableOpacity onPress={hideBanca}>
                        <Ionicons name={iconEye} size={30} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.opTransfCont}>
                <TouchableOpacity style={styles.opTransf} onPress={() => navigate('Transferencia', { op: 'deposito' })}>
                    <Image source={depositoIcon} style={styles.icon} />
                    <Text style={styles.txtBtn}>Depósito</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.opTransf} onPress={() => navigate('Transferencia', { op: 'saque' })}>
                    <Image source={saqueIcon} style={styles.icon} />
                    <Text style={styles.txtBtn}>Saque</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    opTransfCont: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    opTransf: {
        padding: 15,
        width: 127,
        backgroundColor: '#242424',
        borderRadius: 50,
        flexDirection: 'row',
        gap: 7,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
        elevation: 50
    },
    txtBtn: {
        color: '#fff',
        fontWeight: 'bold'
    },
    saldo: {
        display: 'flex',
        flexDirection: 'row',
        gap: 7,
    },
    banca: {
        padding: 27,
        gap: 10,
        backgroundColor: '#fff',
        borderRadius: 25,
        elevation: 7
    },
    sinfrao: {
        fontSize: 27
    },
    dinheiro: {
        fontSize: 47,
        fontWeight: 'bold',
    },
    icon: {
        width: 20,
        height: 20
    },
    dinEye: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 17,
        justifyContent: 'space-between',
        flex: 1
    }
})