import * as React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class App extends React.Component {

    constructor(){
        super();
        this.state = {
            hasCameraPermissions: null,
            scanned: false,
            buttonState: "normal",
            scannedData: "",
        }
    }

    handleBarCodeScanned=async({type: BarCodeScanner, data: data})=>{
        this.setState({
            scanned: true,
            scannedData: data,
            buttonState: "normal",
        })
    }

    getCameraPermissions=async()=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        
       this.setState({
            /* status==="granted" is True when user has granted permissions
            status==="granted" is False when user has not granted permissions */
            hasCameraPermissions: status==="granted",
            buttonState: "clicked",
            scanned: false,            
       })
    }

    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;
        if(buttonState==="clicked" && hasCameraPermissions){
            return(
              <View style={styles.container}>
                <Text style={styles.header}>BAR CODE SCANNER</Text>
                <Image source={require("./assets/img.jpg")} />
              <BarCodeScanner 
                onBarCodeScanned={scanned ?undefined :this.handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}/>  
              </View>                
            )
        }
        else if (buttonState==="normal"){
            return(
                <View style={styles.container}>
                <Text style={styles.header}>BAR CODE SCANNER</Text>
                  <Image source={require("./assets/img.jpg")} />
                    <Text style={styles.text}>
                        {hasCameraPermissions===true
                        ? this.state.scannedData
                        : "CLICK ON THE BUTTON BELOW TO REQUEST CAMERA PERMISSIONS AND START SCANNING!!"}
                    </Text>
                    <TouchableOpacity style={styles.scanButton} 
                    onPress={this.getCameraPermissions}>
                        <Text style={styles.displayText}>SCAN BAR CODE</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }
}

const styles=StyleSheet.create({
    scanButton: {
        backgroundColor: "#2196f3",
        padding: 10,
        margin: 10,
        borderRadius: 10,
        borderWidth: 3,
        width: 150,
        height: 80,
      marginTop: 20,
    },
    displayText: {
        fontSize:20,
        fontWeight: "bold",
        textDecorationLine: "underline",
        textAlign: "center",
        color: "#ff0",
    },
    text: {
      fontSize:20,
      fontWeight: "bold",
      textDecorationLine: "underline",
      textAlign: "center",
      color: "#ffffff",
      marginTop: 20,
  },
  header: {
    fontSize:30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000000",
},
    container: {
        flex: 1,
         justifyContent: "center", 
         alignItems: "center",
         backgroundColor: "#ff00ff",
    }
})