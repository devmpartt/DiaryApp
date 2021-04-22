import React, {Component} from 'react';
import firebase from './Firebase';

export class GetData extends Component{

    //Haetaan käyttäjän merkinnät Firebase tietokannasta
    //Collection: User-KÄYTTÄJÄTUNNUS
    //Jos collection on tyhjä, palautetaan null
    //muutoin palautetaan collectionin sisältö
    getText = async (user) => {
        
       return firebase
        .firestore()
        .collection('User-'+user)
        .orderBy('date', 'desc')
        .get()
        .then(snapshot => {
            if (snapshot.empty) {
              return null;
            }  
            return snapshot.docs.map(doc => doc.data());
            
          })
        .catch(error => {
            console.log('Error getting documents: ', error)
        })
    }

    getTextContent = async(date, user) =>{
        return firebase
        .firestore()
        .collection('User-'+user)
        .where('date', "==", date)
        .get()
        .then(snapshot => {
            if (snapshot.empty) {
              return null;
            }  
            return snapshot.docs.map(doc => doc.data());
            
          })
        .catch(error => {
            console.log('Error getting documents: ', error)
        })
    }

    getPicture = async(user)=>{
        var image= [];
        var storageRef = firebase.storage().ref();
                
        return storageRef
        .child('images-'+user)
        .listAll()
        .then((result) => {
            if(result.empty){
                return null;
            }
            result.items.forEach((imageRef) => {
                image.push(imageRef.name)
            })  
            return this.getPictureUri(user, image)         
        })
        .catch((error) => {
            console.log(error);
        })
    }

    getPictureUri = async(user, image) => {
        var uri = []
        var name = []
        var i=0
        var storageRef = firebase.storage().ref();

        for(i; i<image.length; i++){
            name.push(image[i]);
            await storageRef
                .child('images-'+user+'/'+image[i])
                .getDownloadURL()
                .then((url) => {
                    const xhr = new XMLHttpRequest();
                    xhr.responseType = 'blob';
                    xhr.onload = function(event) {
                        var blob = xhr.response;
                    };
                    xhr.open('GET', url);
                    xhr.send();
                    uri.push(url)
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        if(i>=image.length){return {uri: uri, name: name}}
            
    }
}
