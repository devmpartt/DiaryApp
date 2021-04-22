import React, {Component} from 'react'
import firebase from './Firebase'

export class AddData extends Component{

    //Lisätään merkinnän otsikko, teksti ja päivämäärä firebase tietokantaan
    //Tietokannassa collection: User-KÄYTTÄJÄTUNNUS
    addText = async(user, headline, content) =>{
        const date = new Date().toLocaleDateString() + ' '+ new Date().toLocaleTimeString()
        firebase
            .firestore()
            .collection('User-'+user)
            .doc()
            .set({
                headline: headline,
                content: content,
                date: date,
            })
            .catch(error =>{
                console.log('Error: '+error);
            })
    }

    addImage = async(user, name, blob) =>{
        return new Promise((resolve, reject)=>{
            var storageRef = firebase.storage().ref();
      
            storageRef
            .child('images-'+user+'/'+name+'.jpg')
            .put(blob, {contentType: 'image/jpeg'})
            .then((snapshot)=>{
                blob.close();
                resolve(snapshot);
            })
            .catch((error)=>{
                console.log(error);
                reject(error);
            });
        });
    }
}