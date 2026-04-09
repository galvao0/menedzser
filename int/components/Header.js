import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import userIcon from '../assets/user.png'
import changeIcon from '../assets/change.png'

import logoCasa from '../json/images/logo_casas.json'
import casasapi from '../api/apiCasa'

import { useEffect, useState } from "react";
import Ionicons from '@expo/vector-icons/Ionicons'

import { navigate } from '../Navigation'

export default function Header ({ setCasaSelect }) {

    const [open, setOpen] = useState(false)
    const [casas, setCasas] = useState([])
    const [casaS, setCasaS] = useState('Todas')

    useEffect(() => {
        const getall = async () => {
            const c = await casasapi.getall()
            setCasas(c)
        }
        getall()
    }, [])

    const openCasas = () => {
        setOpen(!open)
    }

    const setCasa = (casa) => {
        setCasaSelect(casa)
        setOpen(!open)
        setCasaS(casa)
    }

    return (
        <View style={styles.header}>
            <View style={styles.leftCont}>
                <TouchableOpacity onPress={() => navigate('Menu')}>
                    <Ionicons name='reorder-four' size={30} />
                </TouchableOpacity>
                <View style={styles.divUser}>
                    <View style={styles.userIcon}>
                        <Image source={userIcon} style={{ height: 25, width: 25 }} />
                    </View>
                    <Text style={styles.user}>User</Text>
                </View>
            </View>
            <View>
                <TouchableOpacity style={[open ? styles.casaContOpen : styles.casaCont]} onPress={openCasas}>
                    <View style={styles.casaSelect}>
                        {casaS === 'Todas' && (
                            <Text style={styles.todos}>Todas</Text>
                        )}
                        {casaS !== 'Todas' && (
                            <Image style={styles.casaIcon} source={{ uri: logoCasa[casaS] }} />
                        )}
                        <Image source={changeIcon} style={styles.icon} />
                    </View>
                    {open && (
                        <View style={styles.casasOp}>
                            {casaS !== 'Todas' && (
                                <TouchableOpacity onPress={() => setCasa('Todas')}>
                                    <Text style={styles.todos}>Todas</Text>
                                </TouchableOpacity>
                            )}
                            {casas.map((c, k) => (
                                (c.nome !== casaS && (
                                    <TouchableOpacity key={k} style={styles.casa} onPress={() => setCasa(c.nome)}>
                                        <Image style={styles.casaIcon} source={{ uri: logoCasa[c.nome] }} />
                                    </TouchableOpacity>
                                ))
                            ))}
                        </View>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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
    casaIcon: {
        height: 14,
        width: 80,
        resizeMode: 'contain',
    },
    casaCont: {
        backgroundColor: '#000000',
        alignItems: 'center',
        gap: 10,
        padding: 12,
        borderRadius: 50,
        elevation: 10
    },
    icon: {
        height: 12, 
        width: 12
    },
    user: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    leftCont: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7
    },
    casaSelect: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    casaContOpen: {
        backgroundColor: '#161616',
        alignItems: 'center',
        gap: 10,
        padding: 12,
        borderRadius: 12,
        elevation: 10,
        paddingBottom: 21
    },
    casasOp: {
        marginTop: 20,
        gap: 17
    },
    todos: {
        color: '#fff',
        fontWeight: 'bold'
    }
})