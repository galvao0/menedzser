const { StyleSheet } = require("react-native");

const style = StyleSheet.create({
    osszeallito: {
        padding: 17,
        gap: 10,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#1f1f1f', 
        borderRadius: 21,
        marginBottom: 12
    },
    qntSelecoes: {
        backgroundColor: '#fff',
        height: 20,
        width: 20,
        borderRadius: 10,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    odds: {
        color: '#fff',
        textAlign: 'right',
        flex: 1
    }
})

module.exports=style