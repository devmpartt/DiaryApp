import React, { Component } from 'react';
import { ScrollView ,Text, TouchableOpacity, StyleSheet, View, Alert } from 'react-native';
import {GetData} from '../config/GetData'

export default class Content extends Component{
    constructor(props){
        super(props);
        this.state ={
            content:[]
        }     
    }

    //Saadaan aloitussivulta halutun merkinnän päivämäärä sekä käyttääteiedot
    //Haetaan sisältö 
    //Jos sisältö null/undefined -> Alert
    componentDidMount = async() =>{
        const {navigation} = this.props;
        const date = await navigation.getParam('date')
        const user = await navigation.getParam('user')

        const contentData = await new GetData().getContent(date,user)
        switch (contentData) {
            case null:
                Alert.alert('Sisällön haussa tapahtui virhe!')
                break;
            case undefined:
                Alert.alert('Sisällön haussa tapahtui virhe!')
                break;
            default:
                this.setState({content: contentData})
                break;
        }
        

    }
    share(){
        //siirrytään merkinnän lisäämiseen
        alert('Button pressed');
    };

    render(){
        return(
            <View style={styles.container}>
                {
                    
                    this.state.content.map((item, index) => (
                        <ScrollView key={index}>
                            <Text style={styles.headline}>{item.headline}</Text>
                            <Text style={styles.content}>{item.content}</Text>
                        </ScrollView>
                    ))
                    
                }
                <View style={styles.btnContainer}>
                    <TouchableOpacity     
                        onPress={() => this.share()}
                        style={styles.btn}
                    >
                        <Text>Jaa</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        paddingTop: 20,
        paddingHorizontal: 10,
        flex: 1,        
    },
    headline:{
        fontSize: 20,
        fontWeight: 'bold'
    },
    content:{
        fontSize: 18,
    },
    btnContainer:{
        width: '100%',
        bottom: 0,
    },
    btn:{
        alignItems: 'center',
        paddingVertical: 20,
    }
})