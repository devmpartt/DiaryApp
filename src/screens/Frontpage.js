import React, { Component } from 'react';
import {ScrollView, TouchableOpacity, Text, StyleSheet, View, AsyncStorage } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import firebase from '../config/Firebase';	

export default class Frontpage extends Component{
    constructor(props){
        super(props);
        this.state ={
            content:[]   
        }
        
    }
    componentDidMount() {
        this.getPosts();
    }

    //Haetaan firebasesta etusivulle tallennetun merkinnän nimi/otsikko ja päivämäärä
    getPosts = () =>{
        firebase
        .firestore()
        .collection('Users')
        .orderBy('date', 'desc')
        .get()
        .then(snapshot => {
            if (snapshot.empty) {
              console.log('No matching documents.');
              return;
            }  
            const data = snapshot.docs.map(doc => doc.data());
            this.setState({content: data})
          })
        .catch(error => {
            console.log('Error getting documents: ', error)
        })
    }

    getContent(){
        const {navigate} = this.props.navigation;
        navigate('Content');
    };
    addText(){
        const {navigate} = this.props.navigation;
        navigate('AddText');
    };
    addImage(){
        const {navigate} = this.props.navigation;
        navigate('AddImage');
    }

    render(){
        return(
            <View style={styles.container}>
                <NavigationEvents onDidFocus={() => this.getPosts()}/>
                <ScrollView>
                {
                    this.state.content.map((item, index) => (
                            <TouchableOpacity
                                style={styles.listItem}
                                key={item.id}
                                onPress={() => this.getContent(item.headline)}
                            >
                                <Text style={styles.headline}>{item.headline}</Text>
                                <Text style={styles.date}>{item.date}</Text>
                            </TouchableOpacity>

                    ))
                }
                </ScrollView>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => this.addText()}
                    >
                        <Text>Lisää Teksti</Text>    
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.btn}
                        onPress={() => this.addImage()}
                    >
                        <Text>Lisää Kuva</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems: 'stretch',
        marginTop: 20,
    },
    listItem:{
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    headline:{
        fontSize: 20,
        fontWeight: 'bold'
    },
    date:{
    },
    btnContainer:{
        width: '100%',
        bottom: 0,
        flexDirection:'row',
    },
    btn:{
        alignItems: 'center',
        width:'50%',
        paddingVertical: 20,
    }
})