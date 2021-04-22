import React, { Component } from 'react';
import {ScrollView, TouchableOpacity, Text, View, AsyncStorage, Alert, ActivityIndicator } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import {GetData} from '../config/GetData';
import styles from '../Style'


export default class TextList extends Component{
    constructor(props){
        super(props);
        this.state ={
            content:[],
            add: false, 
            user: null,
            loading: true
        }
        
    }
    componentDidMount = () =>{
        this.getPosts()
    }

    //Haetaan firebasesta etusivulle tallennetun merkinnän nimi/otsikko ja päivämäärä
    //Mikäli käyttäjän firebase collection on tyhjä -> alert
    getPosts = async () =>{
        await AsyncStorage.getItem('Username', (err, result) =>{
            this.setState({user: result})
        })
        try{
            const data = await new GetData().getText(this.state.user)
            switch (data) {
                case null:
                    Alert.alert('Tietokanta on tyhjä!', 'Aloita päiväkirjan käyttäminen lisäämällä kuva tai teksti merkintä')
                    this.setState({loading: false})
                    break;
                case undefined:
                    Alert.alert('Tietokanta on tyhjä!', 'Aloita päiväkirjan käyttäminen lisäämällä kuvatai teksti merkintä')
                    this.setState({loading: false})
                    break;
                default:
                    this.setState({content: data, loading: false})
                    break;
            }
        }catch(error){
            console.log(error)
        }
    }

    //Haetaan yksittäinen merkintä ja sen koko sisältö uuteen näkymään
    getContent = (date) =>{
        const {navigate} = this.props.navigation;
        navigate('TextContent', {date: date, user: this.state.user});
    };

    render(){
        const{loading, content, add} = this.state;
        const {navigate} = this.props.navigation;
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
                    content.map((item, index) => (
                            <TouchableOpacity
                                style={styles.listItem}
                                key={item.id}
                                onPress={() => this.getContent(item.date)}
                                key={index}>
                                <Text style={styles.headline}>{item.headline}</Text>
                                <Text style={styles.content} numberOfLines={2}>{item.content}</Text>
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