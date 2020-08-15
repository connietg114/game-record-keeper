import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './index.js'

const Row = props =>{
    
    return <tr>{props.name}</tr>
}
export default Row;
