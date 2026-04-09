import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View, TextInput, ScrollView, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import casas from '../json/logo_casas.json'
import { useEffect, useState } from "react";
import apiCasa from '../api/apiCasa'
import styles from "./styles/General";
import { navigate } from "../RootNavigation";

export default function Home () {

    const [add, setadd] = useState(false)
    const [open, setOpen] = useState(false)
    const [nome_container, setNomeContainer] = useState('Apostas')
    const [icon, setIcon] = useState('add')
    const [viewN, setViewN] = useState('')
    const [inputPrinc, setInputPrinc] = useState('') 
    const [place, setPlace] = useState('') 
    const [funcFloating, setFuncFloating] = useState('add')
    const [casasaposta, setcasasaposta] = useState([])
    const [selectTransf, setSelectTranf] = useState('')
    const [banca, setBanca] = useState(0)
    const [bancaInput, setBancaInput] = useState(0)
    const [greens, setGreens] = useState(0)
    const [reds, setReds] = useState(0)
    const [teclado, setTeclado] = useState(false)
    const [iconMsgName, setIconMsgName] = useState('')
    const [msg, setMsg] = useState('')
    const [barco, setBarco] = useState(true)
    const [casaSelect, setCasaSelect] = useState('')

    const atBancaGeral = async () => {
        const b = await apiCasa.getall()
        const atB = b.reduce((banca, bancaCasas) => Number(banca) + Number(bancaCasas.banca), 0)
        setBanca(atB)
    }

    useEffect(() => {

        const fetchCasas = async () => {
            const data = await apiCasa.getall()
            setcasasaposta(data)
        }
        fetchCasas()

        atBancaGeral()

        const abertoTeclado = Keyboard.addListener('keyboardDidShow', () => { setTeclado(true) })
        const fechadoTeclado = Keyboard.addListener('keyboardDidHide', () => { setTeclado(false) })
        
        const clearMsg = setTimeout(() => {
            setIconMsgName('')
            setMsg('')
        }, 5000)

        if (teclado === true) {
            setBarco(false)
        }  
        if (teclado === false) {
            setBarco(true)
        } else {
            setBarco(false)
        }

        return () => {
            abertoTeclado.remove()
            fechadoTeclado.remove()
            clearMsg
            if (nome_container === '' && casasaposta.length > 0) {
                setNomeContainer('Apostas')
            } 
            
        }

    }, [funcFloating, nome_container, teclado])

    const casaFormatada = () => {
        const casaf = inputPrinc.replace(/\s/g, '').toLowerCase()
        return casaf
    }

    const openView = (n) => {
        setOpen(!open)
        if (icon === 'add') {
            setadd(!add)
        }
        setInputPrinc('')
        let nome = ''
        switch (n) {
            case 'c': 
                nome = 'Casa de Aposta'
                setPlace('Nome')
                break
            case 'a':
                navigate('Criar')
                break
            case 'b':
                nome = 'Transferências'
                setPlace(0)
        }
        setNomeContainer(nome)
        if (n !== '' && n !== 'a') {
            setIcon('checkmark')
            setFuncFloating('ok')
        } else {
            setIcon('add')
            setFuncFloating('add')
        }
        setViewN(n)
    }

    const floating = async (f) => {
        if (f === 'add') {
            setadd(!add)
            console.log(viewN)
        }
        if (f === 'ok') {
            if (viewN === 'c') {
                const getCasas = await apiCasa.getall()
                const verifCadCasa = getCasas.find(c => c.nome === casaFormatada())
                if (!inputPrinc|| !bancaInput) {
                    setMsg('Preencha todos os campos para continuar.')
                    console.log(banca)
                    setIconMsgName('err')
                
                } else if (verifCadCasa) {
                    setMsg('Casa ja cadastrada no app.')
                    setIconMsgName('err')
                } else {
                    if (!casas[casaFormatada()]) {
                        setMsg('Nao é possível cadastrar essa casa.')
                        setIconMsgName('err')
                        return
                    }

                    const addBanco = await apiCasa.add(casaFormatada(), casas[casaFormatada()], bancaInput)
                    setIconMsgName('add')
                        
                    setMsg(addBanco)

                    openView('')

                }
                
            }
            if (viewN === 'b') {
                efeTransf(selectTransf, Number(bancaInput))
            }
            if (viewN === 'a') {
                console.log(viewN)
                openView('')
            }
        }
    }

    const masStyleC = (mas) => {
        if ('b' === mas) {
            return true
        }
    }

    const chanceBtnSelectTransf = (btn) => {
        setSelectTranf(btn)
    }

    const styleBtnTransfSelect = (btn) => ({
        backgroundColor: btn === selectTransf ? '#610000' : '#111111',
    })

    const cancel = () => {
        openView('')
        setIcon('add')
        setFuncFloating('add')
        masStyleC('')
        setBarco(true)
    }

    const setIconG = (i) => {
        const icons = {
            err: require('../assets/error.png'),
            add: require('../assets/add.png'),
            logo: require('../assets/alligator.png'),
            bc: require('../assets/back.png'),
            saque: require('../assets/saque.png'),
            deposito: require('../assets/deposit.png')
        }
        return icons[i]
    }

    const setBancaCasa = async (nome) => {
        console.log(nome)
        const casa = await apiCasa.get(nome)
        
        setBanca(Number(casa.banca))
        setCasaSelect(nome)
    }

    const efeTransf = async (tipo, valor) => {

        if (casaSelect === '') {
            setMsg('Selecione uma casa de aposta.')
            setIconMsgName('err')
            return
        }

        if (tipo === '') {
            setMsg('Selecione uma opçao para transferência.')
            setIconMsgName('err')
            return
        }
        if (valor === 0) {
            setMsg('Informe um valor para ' + tipo + '.')
            setIconMsgName('err')
            return
        }

        const casa = await apiCasa.get(casaSelect)

        if (tipo === 'saque') {
            if (valor > banca) {
                setMsg('Saldo Insuficiente.')
                setIconMsgName('err')
                return
            }
            apiCasa.atBanca(casaSelect, (casa.banca - valor))
            setMsg('Transferência efetuada com sucesso.')
            setIconMsgName('saque')
            setCasaSelect('')
            openView('')
            return
        }
        apiCasa.atBanca(casaSelect, (Number(casa.banca) + valor))
        setMsg('Transferência efetuada com sucesso.')
        setIconMsgName('deposito')
        setCasaSelect('')
        openView('')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.bar}>
                <TouchableOpacity onPress={!barco ? cancel : null}>
                    <Image style={!barco ? { width: 17, height: 17, marginRight: 20 } : { width: 40, height: 40 }} source={ !barco ? setIconG('bc') : setIconG('logo') } />
                </TouchableOpacity>
                <Text style={styles.logo}>{barco ? 'menedzser' : nome_container}</Text>
            </View>
            {barco && 
                <View style={{
                    height: 245,
                    display: 'flex',
                    gap: 10
                }}>
                    <TouchableOpacity onPress={atBancaGeral} style={styles.btnall}>
                        <Text style={styles.txtBtn}>all</Text>
                    </TouchableOpacity>
                    <View style={styles.caixas}>
                        <View style={styles.caixa}>
                            <Text style={styles.txtInfoCaixa}>Bancas</Text>
                            <View style={styles.txtBanca}>
                                <Text style={{ color: '#fff' }}>R$</Text>
                                <Text style={[styles.v, { fontSize: 40 }]}>{banca}</Text>
                            </View>
                        </View>
                        <View style={{ display: 'flex', gap: 5 }}>
                            <View style={styles.caixa}>
                                <Text style={styles.txtInfoCaixa}>Greens</Text>
                                <Text style={styles.v}>R$ {greens}</Text>
                            </View>
                            <View style={styles.caixa}>
                                <Text style={styles.txtInfoCaixa}>Reds</Text>
                                <Text style={styles.v}>R$ {reds}</Text>
                            </View>
                        </View>
                    </View>
                    <ScrollView horizontal={true} style={{ maxHeight: 60 }}>
                        {casasaposta.map((c, index) => (
                            <TouchableOpacity onPress={() => setBancaCasa(c.nome)} key={index} style={[styles.caixa, styles.caixaScrollH]}>
                                <Image style={[styles.casa, c.nome === 'reidopitaco' ? { height: 100, width: 100 } : null]} source={{ uri: c.imagem }} />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                </View>
            }
            {add &&
                <View style={styles.opsadd}>
                    <TouchableOpacity style={styles.opadd} onPress={e => openView('c')}>
                        <Image style={styles.opImg} source={require('../assets/casino.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.opadd} onPress={e => navigate('Criar')}>
                        <Image style={styles.opImg} source={require('../assets/tips.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.opadd} onPress={e => openView('b')}>
                        <Image style={styles.opImg} source={require('../assets/banca.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.opadd}>
                        <Image style={styles.opImg} source={require('../assets/alligator-green.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.opadd}>
                        <Image style={styles.opImg} source={require('../assets/red.png')} />
                    </TouchableOpacity>
                </View>
            }
            {!barco === false && <Text style={[styles.header]}>{nome_container}</Text>}
            {casasaposta.length === 0 && open === false &&
                <Text
                    style={{
                        color: '#505050',
                        fontWeight: 'bold',
                        fontSize: 20,
                        textAlign: 'center'
                    }}
                >Nada por aqui ainda...</Text>
            }
            {open &&
                <View style={[styles.containeradd, teclado && viewN !== 'a' ? { flex: 0.2, justifyContent: 'center' } : null]}>
                    {barco && viewN !== 'a' && <TouchableOpacity onPress={cancel} style={!masStyleC(viewN) ? { position: 'absolute', right: 10, top: -60 } : {}}>
                        <Image source={require('../assets/cancel.png')} style={styles.iconTransf} />
                    </TouchableOpacity>}
                    {(viewN === 'b' || viewN === 'c') &&
                        <View>
                            {viewN === 'c' &&
                                <Image
                                    style={[styles.casa, {
                                        resizeMode: 'contain',
                                        alignSelf: 'flex-start'
                                    }]}
                                source={{ uri: casas[casaFormatada()] }} />
                            }
                            <View style={styles.bancaInput}>
                                <Text style={styles.realS}>R$</Text>
                                <TextInput style={[styles.bancaInputInter, { color: '#fff' }, teclado ? { fontSize: 77 } : null]} 
                                    placeholder='0'
                                    placeholderTextColor='#fff'
                                    value={bancaInput}
                                    onChangeText={setBancaInput}
                                    keyboardType="decimal-pad"
                                />
                            </View>
                            {masStyleC(viewN) &&
                                <View style={styles.containerTransf}>
                                <TouchableOpacity style={[styles.transf, styleBtnTransfSelect('deposito')]} onPress={e => chanceBtnSelectTransf('deposito')}>
                                    <Image source={require('../assets/deposit.png')} style={styles.iconTransf} />
                                    <Text style={styles.txtTransf}>Depósito</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.transf, styleBtnTransfSelect('saque')]} onPress={e => chanceBtnSelectTransf('saque')}>
                                    <Image source={require('../assets/saque.png')} style={styles.iconTransf} />
                                    <Text style={styles.txtTransf}>Saque</Text>
                                </TouchableOpacity>
                            </View>
                            }
                        </View>
                    }
                    {viewN === 'c'  && 
                    <View>
                        <Text style={styles.label}>Nome</Text>
                        <TextInput style={styles.input}
                            placeholder={place}
                            placeholderTextColor='#fff'
                            value={inputPrinc}
                            onChangeText={setInputPrinc}
                        />
                    </View>}
                    {msg !== '' &&
                        <View style={[styles.msg, iconMsgName === 'err' ? styles.error : null]}>
                            <Image source={setIconG(iconMsgName)} style={styles.icon} />
                            <Text style={styles.txtError}>{msg}</Text>
                        </View>
                    }
                </View>
            }
            {barco && <TouchableOpacity style={styles.float} onPress={() => { 
                floating(funcFloating)
            }}>
                <Ionicons name={`${icon}`} size={30} color='white' />
            </TouchableOpacity>}
        </SafeAreaView>
    )
}