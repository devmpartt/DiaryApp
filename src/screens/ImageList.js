import React, { Component } from 'react';
import {ScrollView, TouchableOpacity, Text, StyleSheet, View, Image,AsyncStorage, Alert, ActivityIndicator } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import {GetData} from '../config/GetData'
import styles from '../Style'	

export default class ImageList extends Component{
    constructor(props){
        super(props);
        this.state ={
            uri: [],
            name:[],
            add: false,  
            user: null,
            loading: true 
        }     
    }

   componentDidMount = () =>{
        this.getPosts()
    }

    //Haetaan firebasesta etusivulle tallennetun merkinnän nimi/otsikko ja päivämäärä
    getPosts = async () => {
        await AsyncStorage.getItem('Username', (err, result) =>{
            this.setState({user: result})
        })
        try{
            const image = await new GetData().getPicture(this.state.user)
            switch (image) {
                case null:
                    Alert.alert('Tietokanta on tyhjä!', 'Aloita päiväkirjan käyttäminen lisäämällä kuva tai teksti merkintä')
                    break;
                case undefined:
                    Alert.alert('Tietokanta on tyhjä!', 'Aloita päiväkirjan käyttäminen lisäämällä kuvatai teksti merkintä')
                    break;
                default:
                    this.setState({uri: image.uri, name: image.name, loading: false})
                    break;
            }
        }catch(error){
            console.log(error)
        }           
    };

    getContent(imageUri, imageName){
        const {navigate} = this.props.navigation;
        navigate('ImageContent', {uri: imageUri, name: imageName, user: this.state.user});
    };

    render(){
        const {navigate} = this.props.navigation;
        const{loading, uri, name, add}=this.state;
        return(
            <View style={styles.container}>
                 <NavigationEvents onDidFocus={() => this.getPosts()}/>
                {loading && 
                    <View style={styles.loading}>
                        <ActivityIndicator 
                        color='#e93766'
                        size='large'
                        animating={loading}/>
                    </View>
                }
                <ScrollView>
                {
                    uri.map((item, index) => (
                        <TouchableOpacity
                            style={styles.listItem}
                            onPress={() => this.getContent(item, name[index])}
                            key={index}>
                                <View style={styles.listItemImage} key={index}>
                                    <Image style={styles.imageList} source={{uri: item}}/>
                                    <Text style={styles.imageName}>{name[index]}</Text>
                                </View>
                        </TouchableOpacity>

                    ))
                }
                </ScrollView>
                {add &&
                    <View>
                        <TouchableOpacity
                        style={styles.btnAdd}
                        onPress={() => {navigate('AddText');this.setState({add: false})}}
                        >
                            <Text style={styles.btnText}>Lisää Teksti</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={styles.btnAdd}
                        onPress={() => {navigate('AddImage');this.setState({add: false})}}
                        >
                            <Text style={styles.btnText}>Lisää Kuva</Text>
                        </TouchableOpacity>
                    </View>
                }
                
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                        style={styles.listBtn}
                        onPress={() => navigate('Home')}
                    >
                        <Text style={styles.btnText}>Teksti</Text>    
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.listBtn}
                    onPress={() => this.setState(prevstate =>({add: !prevstate.add}))}
                    >
                    <Text style={styles.btnText}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.listBtn}
                    onPress={() => navigate('ImageList')}
                    >
                        <Text style={styles.btnText}>Kuva</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}