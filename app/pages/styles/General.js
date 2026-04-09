const { StyleSheet } = require("react-native")

const styles = StyleSheet.create({
    container: {
        paddingRight: 20,
        paddingLeft: 20,
        backgroundColor: '#111111',
        flex: 1,
        gap: 10,
    },
    caixas: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        marginTop: 7
    },
    caixa: {
        padding: 10,
        paddingLeft: 15,
        backgroundColor: '#111111',
        borderRadius: 20,
        width: 150,
        shadowColor: '#ff0000',
        elevation: 10
    },
    v: {
        fontWeight: 'bold',
        color: '#fff'
    },
    txtBanca: {
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        flex: 1,
    },
    txtInfoCaixa: {
        fontSize: 11,
        color: '#a7a7a7'
    },
    btnall: {
        backgroundColor: '#27292b',
        padding: 3,
        width: 45,
        borderRadius: 20,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    bar: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        gap: 3,
        alignItems: 'center'
    },
    logo: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
    },
    float: {
        position: 'absolute',
        bottom: 25,
        right: 25,
        backgroundColor: '#1f1e1e',
        padding: 12,
        borderRadius: 10,
    },
    casa: {
        width: 100, 
        height: 20, 
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    opsadd: {
        position: 'absolute',
        bottom: 100,
        right: 25,
        gap: 7,
    },
    opadd: {
        padding: 7,
        borderRadius: 7,
        display: 'flex',
        flexDirection: 'row',
        gap: 3,
        justifyContent: 'center',
        alignSelf: 'center', 
        alignItems: 'center', 
        borderRadius: 50, 
        width: 50, 
        height: 50,  
        backgroundColor: '#1f1e1e',
        shadowColor: '#929090',
        elevation: 3
    },
    txtBtn: {
        color: '#fff', 
        fontWeight: 'bold', 
        fontFamily: 'monospace'
    },
    opImg: {
        width: 30, 
        height: 30
    },
    input: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#8f8f8f',
        color: '#fff',
        marginTop: 10,
        paddingLeft: 15,
    },
    bancaInput: {
        display: 'flex',
        flexDirection: 'row'
    },
    containeradd: {
        marginTop: 10
    },
    header: {
        fontSize: 20,
        color: '#fff',
        marginBottom: 20,
        fontWeight: 'bold'
    },
    realS: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff'
    },
    bancaInput: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bancaInputInter: {
        borderWidth: 0, 
        fontSize: 50,
        fontWeight: 'bold'
    },
    transf: {
        padding: 15,
        backgroundColor: '#111111',
        shadowColor: '#ff0000',
        elevation: 2,
        borderRadius: 20,
        flex: 1,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 5
    },
    txtTransf: {
        color: '#fff',
        fontWeight: 'bold'
    },
    containerTransf: {
        display: 'flex',
        flexDirection: 'row',
        gap: 17,
        marginTop: 25,
    },
    iconTransf: {
        width: 20,
        height: 20,
    },
    txtError: {
        color: '#ffffff',
        fontWeight: 'bold'
    }, 
    msg: {
        padding: 10,
        backgroundColor: '#111010',
        borderRadius: 10,
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10
    },
    error: {
        backgroundColor: '#200909',
    },
    icon: {
        width: 20,
        height: 20
    },
    label: {
        color: '#cfcfcf',
        marginLeft: 5
    },
    search: {
        display: 'flex', 
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
        padding: 20
    },
    caixaScrollH: {
        marginLeft: 5, 
        maxHeight: 45, 
        elevation: 5, 
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row',
        gap: 7,
        alignItems: 'center'
    },
    caixaScrollBrasa: {
        maxHeight: 60,
        padding: 20,
        marginBottom: 5,
        marginRight: 7,
        elevation: 2,
    },
    selecaoDivisoria: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20
    },
    txtSelecaoDivisoria: {
        color: '#fff',
        fontWeight: 'bold'
    },
    boxMatches: {
        padding: 17,
        justifyContent: 'space-between',
        backgroundColor: '#111010',
        borderRadius: 10,
        gap: 7,
        shadowColor: '#a00000',
        elevation: 7
    },
    txtMatchesVant: {
        color: '#d6d6d6',
        fontWeight: 'bold',
        fontSize: 15
    },
    middle: {
        display: 'flex',
        justifyContent: 'center',
        flex: 1,
        alignItems: 'flex-end',
        marginRight: 21
    },
    txtMatches: {
        color: '#f0f0f0'
    },
    contPalpite: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginTop: 20
    },
    palpite: {
        backgroundColor: '#141414',
        flex: 1,
        padding: 6,
        borderRadius: 7,
        alignItems: 'center'
    },
    contMatches: {
        display: 'flex', 
        gap: 15, 
        padding: 5
    },
    headerMatches: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    team: {
        display: 'flex',
        flexDirection: 'row',
        gap: 7
    }
})

module.exports=styles