import { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, Image, Text, View, TextInput } from "react-native";

import styles from "./styles/General";
import stylesCriar from "./styles/Criar";
import escudoLigas from '../json/images/leagues.json'
import team from '../json/images/team.json'

import * as matches from '../api/fut/matches'
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Criar () {

    const princLigas = ['Brasileirão', 'Copa do Brasa', 'Champions', 'Libertadores', 'La Liga', 'Bundesliga', 'Serie A', 'Sudamericana']

    const [matchesEnLinea, setMatchesEnLinea] = useState([])
    const [matchesToday, setMatchesToday] = useState([])
    const [ligat, setLigat] = useState(0)
    const [inputPrinc, setInputPrinc] = useState('') 
    const [bilhete, setBilhete] = useState([])
    const [odds, setOdds] = useState(1)

    useEffect(() => {
        const getMatchesLinea = async () => {
            const m = await matches.enLinea()
            setMatchesEnLinea(m)
            //m.results.forEach((l) => {
                //console.log(`"${l.home_team}": "",`)
                //console.log(`"${l.away_team}": "",`)
            //})
        }

        getMatchesLinea()

        const getMatchesToday = async () => {
            const m = await matches.today(ligat)
            const mfilter = m.results.filter(m => m.status === 'notstarted')
            setMatchesToday(mfilter)
        }

        getMatchesToday()
    }, [ligat])

    const statusMatch = (s) => {
        switch (s.status) {
            case 'halftime':
                return 'INT'
            case 'finish':
                return 'TERM'
            case 'notstarted':
                const date = new Date(s.event_date)
                const df = date.toLocaleTimeString('pt-BR').slice(0,5)
                return df
            default:
                return null
        }
    }

    const teamEsc = (es) => {
        if (team[es]) {
            return team[es]
        } else {
            return team['senza']
        }
    }

    const changeMatchesLeague = (l) => {
        if (l === princLigas[0]) {
            setLigat(9)
        }
        if (l === princLigas[4]) {
            setLigat(3)
        }
    }

    const osszeallito = (conf, selec) => {
        let palpite
        let odd
        if (selec === 'x') {
            palpite = 'empate'
            odd = conf.odds_draw ?? 1
        } else {
            palpite = 'vitória: ' + selec
            if (conf.home_team === selec) {
                odd = conf.odds_home ?? 1
            } else {
                odd = conf.odds_away ?? 1
            }
        }
        const selecao = conf.home_team + ' x ' + conf.away_team
        const bc =  { selecao: selecao, palpite: palpite, odd: odd }
        setBilhete(b => [...b, bc ])
        const calcf = (odd * odds).toFixed(2)
        setOdds(calcf)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.search}>
                <TextInput style={{ flex: 1 }}
                    placeholder='search'
                    placeholderTextColor='#fff'
                    value={inputPrinc}
                    onChangeText={setInputPrinc}
                />
                <TouchableOpacity>
                    <Ionicons name='search' color='#fff' size={20} />
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={{ paddingBottom: 133 }}>
                <ScrollView horizontal={true} style={{ marginTop: 20 }} pagingEnabled={true}>
                    {princLigas.map((l, index) => (
                        <TouchableOpacity onPress={() => changeMatchesLeague(l)} key={index} style={[styles.caixa, styles.caixaScrollH, styles.caixaScrollBrasa]}>
                            <Image source={{ uri: escudoLigas[l] }} style={styles.icon} />
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>{l}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                {matchesEnLinea?.results?.length > 0 &&
                    <View>
                        <View style={styles.selecaoDivisoria}>
                            <Text style={styles.txtSelecaoDivisoria}>Ao Vivo</Text>
                            <Text style={{ color: '#838383' }}>Ver Tudo</Text>
                        </View>
                        <View style={styles.contMatches}>
                            {matchesEnLinea.results.map((m, key) => (
                                <View key={key} style={[styles.boxMatches, styles.box]}>
                                    <View style={styles.headerMatches}>
                                        <Text style={{ color: '#9c9c9c' }}>{m.league.name}</Text>
                                        <Text style={{ color: '#5e0d0d', fontSize: 12, fontWeight: 'bold' }}>{m.period}</Text>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
                                        <View>
                                            <View style={styles.team}>
                                                <Image source={{ uri: teamEsc(m.home_team) }} style={styles.icon} />
                                                <Text style={[styles.txtMatches, m.home_score > m.away_score ?  styles.txtMatchesVant : {}]}>{m.home_team}</Text>
                                            </View>
                                            <View style={styles.team}>
                                                <Image source={{ uri: teamEsc(m.away_team) }} style={styles.icon} />
                                                <Text style={[styles.txtMatches, m.away_score > m.home_score ? styles.txtMatchesVant : {}]}>{m.away_team}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.middle}>
                                            <Text style={{ color: '#3a4442', fontWeight: 'bold' }}>{statusMatch(m) || m.current_minute}</Text>
                                        </View>
                                        <View>
                                            <Text style={[styles.txtMatches, m.home_score > m.away_score ?  styles.txtMatchesVant : {}]}>{m.home_score}</Text>
                                            <Text style={[styles.txtMatches, m.away_score > m.home_score ? styles.txtMatchesVant : {}]}>{m.away_score}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.contPalpite}>
                                        <TouchableOpacity style={styles.palpite}>
                                            <Text style={styles.txtBtn}>1</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.palpite}>
                                            <Text style={styles.txtBtn}>X</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.palpite}>
                                            <Text style={styles.txtBtn}>2</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                }
                {matchesToday?.length > 0 && 
                    <View style={styles.contMatches}>
                        <View style={styles.selecaoDivisoria}>
                            <Text style={styles.txtSelecaoDivisoria}>Hoje</Text>
                            <Text style={{ color: '#838383' }}>Ver Tudo</Text>
                        </View>
                        {matchesToday.map((m, key) => (
                            <View key={key} style={styles.boxMatches}>
                                <View style={styles.headerMatches}>
                                    <Text style={{ color: '#9c9c9c' }}>{m.league.name}</Text>
                                    {m.status === 'notstarted' && <Text style={{ color: '#bebebe', fontSize: 12, fontWeight: 'bold' }}>{statusMatch(m)}</Text>}
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
                                    <View style={{ display: 'flex', gap: 3 }}>
                                        <View style={styles.team}>
                                            <Image source={{ uri: teamEsc(m.home_team) }} style={styles.icon} />
                                            <Text style={[styles.txtMatches, m.home_score > m.away_score ?  styles.txtMatchesVant : {}]}>{m.home_team}</Text>
                                        </View>
                                        <View style={styles.team}>
                                            <Image source={{ uri: teamEsc(m.away_team) }} style={styles.icon} />
                                            <Text style={[styles.txtMatches, m.away_score > m.home_score ? styles.txtMatchesVant : {}]}>{m.away_team}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.middle}>
                                        <Text style={{ color: '#3a4442', fontWeight: 'bold' }}>{m.status ? statusMatch(m.status) : `${m.current_minute}'`}</Text>
                                    </View>
                                    <View>
                                        <Text style={[styles.txtMatches, m.home_score > m.away_score ?  styles.txtMatchesVant : {}]}>{m.home_score}</Text>
                                        <Text style={[styles.txtMatches, m.away_score > m.home_score ? styles.txtMatchesVant : {}]}>{m.away_score}</Text>
                                    </View>
                                </View>
                                <View style={styles.contPalpite}>
                                    <TouchableOpacity style={styles.palpite} onPress={() => m && osszeallito(m, m.home_team)}>
                                        <Text style={styles.txtBtn}>{m.odds_home || '1'}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.palpite} onPress={() => m && osszeallito(m, 'x')}>
                                        <Text style={styles.txtBtn}>{m.odds_draw || 'x'}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.palpite} onPress={() => m && osszeallito(m, m.away_team)}>
                                        <Text style={styles.txtBtn}>{m.odds_away || '2'}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>
                }
            </ScrollView>
            {bilhete.length > 0 &&
                <TouchableOpacity style={stylesCriar.osszeallito}>
                    <Text style={stylesCriar.qntSelecoes}>{bilhete.length}</Text>
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Bilhete de aposta</Text>
                    <Text style={stylesCriar.odds}>{odds}</Text>
                </TouchableOpacity>
            }
        </SafeAreaView>
    )
}