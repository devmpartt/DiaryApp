import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, View, ScrollView, AsyncStorage, Alert, ActivityIndicator } from 'react-native';
import {AddData} from '../config/AddData';
import styles from '../Style'

export default class AddText extends Component{
    constructor(props){
        super(props);
        this.state ={
            headline: null,
            content: null,
            user: null,
            loading: false,
        }     
    }

    //Tallennetaan merkintä Firebaseen, luodaan uusi dokumentti jossa päivämäärä ja sisällön tyyppi
    //Mikäli tallennus onnistuu, navigoidaan etusivulle
    save = async () =>{
        const {headline, content} = this.state;
        const {navigate} = this.props.navigation
        if(headline != null || content !=null){
            
            await AsyncStorage.getItem('Username', (err, result) =>{
               this.setState({user: result})
            })
            
            try{
                await new AddData().addText(this.state.user, headline, content)
                Alert.alert('Tallennettu','Merkintä tallennettu onnistuneesti!')
                navigate('Home')

            }catch(error){
                console.log("Error: " +error)
            }
        }
        else{
            Alert.alert('Tyhjää merkintää ei voida tallentaa!', 'Lisää merkinnälle otsikko ja sisältö');
        }
    };

    render(){
        const {loading, headline, content} = this.state
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
                    <Text style={styles.headline2}>Lisää merkintä</Text>
                    <TextInput
                        style={styles.addHeadline}
                        placeholder="Otsikko"
                        onChangeText={(headline) => this.setState({headline})}
                        value ={headline}
                    />
                    <TextInput
                        style={styles.addContent}
                        placeholder="..."
                        multiline={true}
                        onChangeText={(content) => this.setState({content})}
                        value ={content}
                    />
                </ScrollView>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                        onPress={() => {this.save(); this.setState({loading: true})}}
                        style={styles.btn}
                    >
                        <Text style={styles.btnText}>Tallenna</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}