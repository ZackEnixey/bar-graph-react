import React, {Component, useEffect} from 'react';
import bookURL from './book.txt';




export default class Graph extends Component {
   
    constructor(){
        super();
        this.state = {
            bookContent: "this is initial state"
        };
    }
    componentWillMount(){
        fetch(bookURL).then( bookData => {
            return bookData.text();
        }).then( bookData => {
            const charObj = this.getAllCharacterObject(bookData);
            const charactersAtoZ = {};
            for(const char in charObj){
                if(char.charCodeAt() >= 'a'.charCodeAt() && char.charCodeAt() <= 'z'.charCodeAt() ){
                    charactersAtoZ[char] = charObj[char];
                }
            }
            console.log(charactersAtoZ);
            this.setState({ bookContent: bookData} );
        })
    };

    getAllCharacterObject(bookData){
        const charObj = {};
        for(const char of bookData){
            charObj[char] = (charObj[char] || 0) + 1;
        }
        return charObj;
    }


    render(){
        return(
            <div> 
                <div> {this.state.bookContent} </div>
                graph se ovde vidi
            </div>
        )
    }

}