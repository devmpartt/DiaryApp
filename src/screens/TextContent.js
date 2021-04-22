import React, { Component } from 'react';
import { ScrollView ,Text, TouchableOpacity, StyleSheet, View, Alert, ActivityIndicator } from 'react-native';
import {GetData} from '../config/GetData'
import {DeleteData} from '../config/DeleteData';
import styles from '../Style';

export default class TextContent extends Component{
    constructor(props){
        super(props);
        this.state ={
            content:[],
            user: null,
            loading: true
        }     
    }

    //Saadaan aloitussivulta halutun merkinnän päivämäärä sekä käyttääteiedot
    //Haetaan sisältö 
    //Jos sisältö null/undefined -> Alert
    componentDidMount = async() =>{
        const {navigation} = this.props;
        const date = await navigation.getParam('date')
        const username = await navigation.getParam('user')
        this.setState({user: username})

        const contentData = await new GetData().getTextContent(date,username)
        switch (contentData) {
            case null:
                Alert.alert('Sisällön haussa tapahtui virhe!','')
                break;
            case undefined:
                Alert.alert('Sisällön haussa tapahtui virhe!','')
                break;
            default:
                this.setState({content: contentData, loading: false})
                break;
        }
        
    }
    showAlert = (date) =>{
        Alert.alert('Haluatko varmasti poistaa merkinnän?','',
            [
                {text: 'Poista', onPress: () => {this.deleteContent(date);this.setState({loading: true})}, style: 'destructive'},
                {text: 'Peruuta', style: 'cancel'}
            ])
    }

    deleteContent = async (date) =>{
        const {navigate} = this.props.navigation
        try{
            await new DeleteData().deleteText(date,this.state.user)
            Alert.alert('Merkintä poistettu onnistuneesti')
            navigate('Home')
        }catch(error){
            console.log('Error: ' + error)
        }
        
    }
    share(){
        //siirrytään merkinnän lisäämiseen
        alert('Button pressed');
    };

    render(){
        const {loading, content} = this.state;
        return(
            <View style={styles.container}>
                {loading && 
                    <View style={styles.loading}>
                        <ActivityIndicator 
                        color='#e93766'
                        size='large'
                        animating={loading}/>
                    </View>
                }
                {
                    
                    content.map((item, index) => (
                        <View key={index}>
                            <TouchableOpacity style={styles.deleteBtn}  onPress={() => this.showAlert(item.date)}>
                                <Text style={styles.deleteText}>Poista</Text>
                            </TouchableOpacity>
                            <ScrollView>
                            
                                <Text style={styles.headline2}>{item.headline}</Text>
                                <Text style={styles.content}>{item.content}</Text>
                            </ScrollView>
                        </View>
                    ))
                    
                }
            </View>
        );
    }
}