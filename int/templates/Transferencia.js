import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from '@expo/vector-icons/Ionicons'
import { navigate } from "../Navigation";
import changeIcon from '../assets/change.png'
import backspaceIcon from '../assets/backspace.png'
import { useState } from "react";

export default function Transferencia ({ route }) {

    const [valor, setValor] = useState('0')
    const [openOpTransf, setOpenOpTransf] = useState(false)

    const cambi = (v) => {
        setValor(s => s + v)
    }

    const backspace = () => {
        const vf = valor.toString()
        const vb = vf.replace(vf[vf.length-1], '')
        setValor(vb)
    }

    const open = () => {
        setOpenOpTransf(!openOpTransf)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.primo}>
                    <TouchableOpacity onPress={() => navigate('Home')}>
                        <Ionicons name='chevron-back' size={21} />
                    </TouchableOpacity>
                    <Text style={styles.telaName}>Transferência</Text>
                </View>
                <TouchableOpacity style={styles.change} onPress={open}>
                    <View style={styles.opSelect}>
                        <Text style={styles.btnTxt}>{route.params.op}</Text>
                        <Image source={changeIcon} style={styles.icon} />
                    </View>
                    {openOpTransf && (
                        <TouchableOpacity onPress={() => { open(), route.params.op = route.params.op === 'saque' ? 'deposito' : 'saque'}}>
                            <Text style={styles.btnTxt}>{route.params.op === 'saque' ? 'deposito' :'saque'}</Text>
                        </TouchableOpacity>
                    )}
                </TouchableOpacity>
            </View>
            <View style={styles.divInputValor}>
                <View style={styles.compInputValor}>
                    <Text style={styles.sinfra}>R$</Text>
                    <Text
                        style={styles.inputValor} 
                    >{(Number(valor)/100) || '0.00'}</Text>
                </View>
            </View>
            <View style={styles.teclado}>
                <View style={styles.fila}>
                    <TouchableOpacity style={styles.btnNum} onPress={() => cambi('1')}>
                        <Text style={styles.num}>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnNum} onPress={() => cambi('2')}>
                        <Text style={styles.num}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnNum} onPress={() => cambi('3')}>
                        <Text style={styles.num}>3</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.fila}>
                    <TouchableOpacity style={styles.btnNum} onPress={() => cambi('4')}>
                        <Text style={styles.num}>4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnNum} onPress={() => cambi('5')}>
                        <Text style={styles.num}>5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnNum} onPress={() => cambi('6')}>
                        <Text style={styles.num}>6</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.fila}>
                    <TouchableOpacity style={styles.btnNum} onPress={() => cambi('7')}>
                        <Text style={styles.num}>7</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnNum} onPress={() => cambi('8')}>
                        <Text style={styles.num}>8</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnNum} onPress={() => cambi('9')}>
                        <Text style={styles.num}>9</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.fila}>
                    <TouchableOpacity style={[styles.btnNum, styles.btnDiverso]}>
                        <Text style={[styles.num, { color: '#000' }]}>,</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnNum} onPress={() => cambi('0')}>
                        <Text style={styles.num}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnNum, styles.btnDiverso]} onPress={() => backspace()}>
                        <Image source={backspaceIcon} style={{ width: 25, height: 25 }} />
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <TouchableOpacity style={styles.btnConfirm}>
                    <Text style={styles.btnTxt}>Transferir</Text>
                    <Ionicons name='chevron-forward' color='#fff' size={17} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'space-between'
    },
    header: {
        padding: 7,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    primo: {
        flexDirection: 'row',
        gap: 7,
        alignItems: 'center'
    },
    telaName: {
        fontWeight: 'bold',
        fontSize: 17
    },
    inputValor: {
        fontSize: 77,
        fontWeight: 'bold',
    },
    divInputValor: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        height: 12, 
        width: 12
    },
    change: {
        padding: 11,
        backgroundColor: '#252525',
        alignItems: 'center',
        gap: 7,
        borderRadius: 20
    },
    opSelect: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7
    },
    btnTxt: {
        color: '#fff',
        fontWeight: 'bold'
    },
    teclado: {
        flex: 1,
        padding: 17,
        paddingLeft: 27,
        paddingRight: 27,
        gap: 11
    },
    compInputValor: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    sinfra: {
        fontWeight: 'bold',
        fontSize: 21
    },
    fila: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 7
    },
    num: {
        fontSize: 21,
        fontWeight: 'bold',
        color: '#fff'
    },
    btnNum: {
        backgroundColor: '#252525',
        flex: 1,
        padding: 7,
        borderRadius: 7,
        alignItems: 'center',
        elevation: 5
    },
    btnDiverso: {
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    btnConfirm: {
        padding: 17,
        backgroundColor: '#252525',
        borderRadius: 20,
        alignSelf: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7
    }
})