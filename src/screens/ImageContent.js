import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Alert,Image, ActivityIndicator } from 'react-native';
import {DeleteData} from '../config/DeleteData';
import styles from '../Style';


export default class ImageContent extends Component{
    constructor(props){
        super(props);
        this.state ={
            uri: null,
            name: null,
            user: null,
            loading: true
        };
    }

    //Saadaan aloitussivulta halutun merkinnän päivämäärä sekä käyttääteiedot
    //Haetaan sisältö 
    //Jos sisältö null/undefined -> Alert
    componentDidMount = async() =>{
        const {navigation} = this.props;
        const image = await navigation.getParam('uri')
        const imageName = await navigation.getParam('name')
        const username = await navigation.getParam('user')

        switch (image) {
            case null:
                Alert.alert('Virhe!','Sisällön haussa tapahtui virhe!')
                break;
            case undefined:
                Alert.alert('Virhe!','Sisällön haussa tapahtui virhe!')
                break;
            default:
                this.setState({uri: image, name: imageName, user: username, loading: false})
                break;
        }
        
    }

    //Dialogi kuvan poistosta
    //Poista -> deleteContent()
    //Peruuta -> ilmoitus suljetaan
    showAlert = () =>{
        Alert.alert('Haluatko varmasti poistaa kuvan?','Toimonto poistaa kuvan vain sovelluksesta. ',
            [
                {text: 'Poista', onPress: () => {this.deleteContent();this.setState({loading: true})}, style: 'destructive'},
                {text: 'Peruuta', style: 'cancel'}
            ])
    }

    //Postetaan kuva Firebase storagesta
    //Poiston jälkeen navigoidaan imageList näkymään. 
    deleteContent = async () =>{
        const {navigate} = this.props.navigation
        try{
            await new DeleteData().deleteImage(this.state.name,this.state.user)
            Alert.alert('Kuva poistettu!','Kuva poistettu onnistuneesti')
            navigate('ImageList')
        }catch(error){
            console.log('Error: ' + error)
        }
        
    }

    render(){
        const{loading, uri, name} = this.state
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
                {uri && 
                    <View>
                        <TouchableOpacity style={styles.deleteBtn} onPress={() => this.showAlert()}>
                            <Text style={styles.deleteText}>Poista</Text>
                        </TouchableOpacity>
                            <View>
                                <Image style={styles.image} source={{uri: uri}}/>
                                <Text style={styles.imageText}>{name}</Text>
                            </View>
                    </View>
                }
            </View>
        );
    }
}