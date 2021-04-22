import React, { Component } from 'react';
import { Text, TouchableOpacity, View, ScrollView, Image, TextInput,AsyncStorage, ActivityIndicator, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {AddData} from '../config/AddData';
import styles from '../Style'

export default class AddImage extends Component{
    constructor(props){
        super(props);
        this.state ={
            name: null,
            image: null,
            user: null,
            loading: false
        }     
    }

    uriToBlob = (uri) => {

        return new Promise((resolve, reject) => {

            const xhr = new XMLHttpRequest();
      
            xhr.onload = function() {
              // return the blob
              resolve(xhr.response);
            };
            
            xhr.onerror = function() {
              // something went wrong
              reject(new Error('uriToBlob failed'));
            };
      
            // this helps us get a blob
            xhr.responseType = 'blob';
      
            xhr.open('GET', uri, true);
            xhr.send(null);
      
          });     
    }

    save = async () =>{
        //Tallennetaan ja palataan etusivulle
        await AsyncStorage.getItem('Username', (err, result) =>{
            this.setState({user: result})
        })
        const {navigate} = this.props.navigation;

        if(this.state.image!=null && this.state.name != null){
            this.uriToBlob(this.state.image.uri)
            .then((blob) =>{
                try{
                    return new AddData().addImage(this.state.user, this.state.name, blob)
        
                }catch(error){
                    console.log("Error: " +error)
                }
            })
            .then(() => {
                Alert.alert('Kuva ladattu','Kuvaon ladattu onnistuneesti sovellukseen')
                navigate('ImageList');
            })
            .catch((error) => {
                console.log(error);
            })
        } 
        else{
            if(this.state.image === null && this.state.name === null){
                Alert.alert('Kuva ja nimi puuttuvat!','Valitse kuva ja nimeä se ennen tallentamista')
                this.setState({loading: false})
            }
            else{
                Alert.alert('Nimi puuttuu!','Nimeä kuva ennen tallentamista')
                this.setState({loading: false})
            }
        }
    };

    //Valitaan kuva
    pickImage = () => {
        const options = {noData: true};
        ImagePicker.launchImageLibrary(options, response => {
            if(response.uri){
                this.setState({image: response})
            }
        })
        
    };

    render(){
        const { loading, image, name } = this.state
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
                <ScrollView>
                    <Text style={styles.headline2}>Valitse kuva</Text>
                        <View style={styles.image}>
                            {image && <Image source={{ uri: image.uri }} style={styles.picture} />}
                        </View>
                
                    {image &&<TextInput
                            style={styles.name}
                            placeholder="Nimi"
                            onChangeText={(name) => this.setState({name})}
                            value ={name}
                        />}
               </ScrollView>
                <View style={styles.btnContainer}>
                <TouchableOpacity
                        onPress={() => this.pickImage()}
                        style={styles.btnAddImage}
                    >
                        <Text style={styles.btnText}>Valitse Kuva</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {this.save(); this.setState({loading: true})}}
                        style={styles.btnAddImage}
                    >
                        <Text style={styles.btnText}>Tallenna</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

