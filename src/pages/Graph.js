import React, {Component} from 'react';
import bookURL from './book.txt';
import {LineChart, Bar, XAxis, YAxis, Tooltip, Line, CartesianGrid} from 'recharts';




export default class Graph extends Component {
   
    constructor(){
        super();
        this.state = {
            bookContent: [ {"name": "", "value": ""}]
        };
    }
    componentWillMount(){
        fetch(bookURL).then( bookData => {
            return bookData.text();
        }).then( bookData => {
            const charObj = this.getAllCharacterObject(bookData);
            const charactersAtoZ = this.filterAtoZ(charObj);
            const sortedAtoZlist = this.sortArrayOfObjectsByName(charactersAtoZ);
            this.setState({ bookContent: sortedAtoZlist} );
        })
    };

    getAllCharacterObject(bookData){
        const charObj = {};
        for(const char of bookData){
            charObj[char] = (charObj[char] || 0) + 1;
        }
        return charObj;
    }

    filterAtoZ(charObj){
        const charactersAtoZ = [];
        for(const char in charObj){
            if(char.charCodeAt() >= 'a'.charCodeAt() && char.charCodeAt() <= 'z'.charCodeAt() ){
                charactersAtoZ.push( {"name": char, "value": charObj[char]} );
            }
        }
        return charactersAtoZ;
    }

    sortArrayOfObjectsByName(arrayOfObjects){
        arrayOfObjects.sort((a, b) => (a.name > b.name) ? 1 : -1);
        return arrayOfObjects;
    }

    render(){
        return(
            <div> 
                <div> </div>
                <LineChart width={600} height={400} data={this.state.bookContent} >
                    <XAxis dataKey="name" />
                    <YAxis dataKey="value" />
                    <Tooltip />
                    <Bar dataKey="value" /> 
                    <CartesianGrid stroke="#f5f5f5" />
                    <Line type="monotone" dataKey="value" stroke="#ff7300" yAxisId={0} />
                </LineChart>
            </div>
        )
    }

}