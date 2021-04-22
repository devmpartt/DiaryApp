import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    /* Container */
    container:{
        paddingTop: 20,
        paddingHorizontal: 10,
        flex: 1,
        height: '100%',
    },
    loading:{
        width: '100%',
        height: '100%',
        justifyContent:'center',
    },
    /*Image Container */
    image:{
        alignSelf: 'center',
        width: 350,
        height: 350,
    },
    imageText:{
        textAlign: 'center',
        fontSize: 20,
        marginTop: 20,
    },
    /* Text Content */
    content:{
        fontSize: 20,
    },

    /* Delete button */
    deleteBtn:{
        marginBottom: 20,
        width:'20%',
        alignItems: 'center',
        paddingVertical: 10,
        alignSelf: 'flex-end',
        borderWidth: 2,
        borderRadius: 10,
        borderColor:'#f5666c',
        marginBottom: 20,
    },
    deleteText:{
        fontWeight:'bold',
        fontSize: 16,
        color: '#f3363e'
    },
    /* Add Text */
    headline2:{
        fontSize: 20,
        textAlign: 'center',
    },
    addHeadline:{
        fontSize: 20,
        borderBottomWidth: 0.5,
    },
    addContent:{
        fontSize: 18,
        width: '100%',
        borderBottomWidth: 0.5,
    },

    /* Text List */
    headline:{
        fontSize: 20,
        fontWeight: 'bold'
    },
    content:{
        fontSize: 17,
    },

    /* Image List */
    listItemImage:{
        flex:1,
        flexDirection: 'row',  
    },
    imageList:{
        width: 150,
        height: 150
    },
    imageName:{
        marginLeft: 20,
        fontSize: 17,
    },

    /* List View items */
    listItem:{
        paddingVertical: 10,
        paddingHorizontal: 15,
    },

    /* List View Screen buttons */
    listBtn:{
        alignItems: 'center',
        width:'33.33%',
        paddingVertical: 20,
    },
    btnAdd:{
        alignItems: 'center',
        width:'100%',
        paddingVertical: 20,
    },
    /* Button */
    btnContainer:{
        width: '100%',
        bottom: 0,
        flexDirection:'row',
    },
    btnContainer2:{
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },
    btn:{
        alignItems: 'center',
        paddingVertical: 20,
        width: '100%'
    },
    btnText:{
        fontWeight:'bold',
        fontSize: 16,
    },
    /* Add image */
    btnAddImage:{
        alignItems: 'center',
        width:'50%',
        paddingVertical: 20,
    },
    imageView:{
        width: '100%',
        height: '50%',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    picture:{
        aspectRatio: 1,
        width: '90%',
        height: undefined,
    },
    name:{
        fontSize: 18,
        width: '100%',
    },

    /* Sign Up / Log In*/
    pin:{
        fontSize: 18,
        textAlign: 'center',
        padding: 10,
    },
})