import React, { Component } from 'react';
import {Text, TouchableOpacity, TextInput, View, AsyncStorage } from 'react-native';
import styles from '../Style'

export default class SignIn extends Component{
    constructor(props){
        super(props);
        this.state ={
            pwd: '',
            errorMsg: null,
        }
        
    }

    //Painikkeen onPress funktio
    handelLogIn(pwdL){
        const {navigate} = this.props.navigation;
        //PIN-koodin pituuden tarkistus
        if(pwdL < 4){ alert('PIN-koodi liian lyhyt')}
        //Lisätään käyttäjätunnus paikallisesti
        //Firebase luodaan collection kyseiselle käyttäjälle käyttäjätunnuksen pohjalta
        else{
            try {
                AsyncStorage.getItem('pwd', (err, result) =>{
                    if(this.state.pwd === result){
                        navigate('App');
                    }
                    else{alert('PIN-koodi väärin, yritä uudestaan!')}
                });
                     
              } catch (error) {
                console.log(error);
              }
        }
    }

    render(){
        var pwdL = this.state.pwd.length;
        return(
            <View style={styles.container}>
                <Text style={styles.headline2}>Syötä 4 numeroinen PIN-koodi</Text>
                <TextInput
                    style={styles.pin} 
                    placeholder="PIN-koodi"
                    onChangeText={(pwd) => this.setState({pwd})}
                    value ={this.state.pwd}
                    keyboardType={'numeric'}
                    maxLength={4}
                />
                <View style={styles.btnContainer2}>
                    <TouchableOpacity 
                        style={styles.btn}
                        onPress={() => this.handelLogIn(pwdL)}
                        
                    ><Text>Kirjaudu sisään</Text>
                        </TouchableOpacity>
                </View>
            </View>
        );
    }
}