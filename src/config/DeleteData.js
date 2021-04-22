import React, {Component} from 'react'
import firebase from './Firebase'

export class DeleteData extends Component{

    deleteText = async (date, user) =>{

        return firebase
        .firestore()
        .collection('User-'+user)
        .where('date', "==", date)
        .get()
        .then(snapshot => {
            if (snapshot.empty) {
              return null;
            } 
            snapshot.forEach((doc) => {
                doc.ref.delete()
                .then(() => {
                    return;
                })
            })
            .catch((error) => {
                console.log('Error getting documents: ', error)
            }) 
            
          })
        .catch(error => {
            console.log('Error getting documents: ', error)
        })
    }

    deleteImage = async (imageName, user) =>{
        var storageRef = firebase.storage().ref();
                
        storageRef
        .child('images-'+user+'/'+imageName)
        .delete()
        .then(() => {
            return;
        })
        .catch((error) => {
            console.log(error);
        })
    }
}