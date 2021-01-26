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
            console.log(bookData);
            this.setState({ bookContent: bookData} );
        })
    };


    render(){
        return(
            <div> 
                <div> {this.state.bookContent} </div>
                graph se ovde vidi
            </div>
        )
    }

}