// components/CreatePost.js

import React, { useState } from 'react';
import fire from '../config/fire-config';



const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ingredientsList, setIngredients] = useState([]);
    let ingredients = [];
    const [countIng, setCountIng] = useState(0);
    const [MethodList, setMethod] = useState([]);
    let Method = [];
    const [countMeth, setCountMeth] = useState(0);
    const [notification, setNotification] = useState('');


    const handleSubmit = (event) => {
      event.preventDefault();  

      var CardData = {
        description: description,
        img: "None",
        title: title,
      };

      var RecipyData = {
        title: title,
        Method: MethodList,
        Ingredients: ingredientsList,
        
      };
    
      var newRespityKey = fire.database().ref().child('RecipyNames').push().key;

      var updates = {};

      updates['/RecipyNames/' + newRespityKey] = CardData;
      updates['/Recipies/' + newRespityKey] = RecipyData;

      
      fire.database().ref().update(updates)
      

        setTitle('');
        setDescription('');    
        setNotification('Blogpost created');    
        setTimeout(() => {
            setNotification('')
        }, 2000)
    }  

    const renderIng = (value = null, name = 0) => {
      ingredients = ingredientsList;
      const index = Number(name);
      let uiItems = [];
      if(value != null && ingredients[index] === undefined){
        ingredients.push(value)
        setCountIng(countIng + 1)
        setIngredients(ingredients)
      }else if(value != null){
        ingredients[index] = value;
        setIngredients(ingredients)
      }
      for(let i=0; i!=(countIng+1); i++){
        uiItems.push(
          <li key={i}>
            <textarea 
                name = {i}
                value={ingredients[{i}]} 
                onChange={({target}) => renderIng(target.value, target.name)} />
          </li>
                
        )
      }
      return uiItems;
    }

    const renderMeth = (value = null, name = 0) => {
      Method = MethodList;
      const index = Number(name);
      let uiMethod = [];
      if(value != null && Method[index] === undefined){
        Method.push(value)
        setCountMeth(countMeth + 1)
        setMethod(Method)
      }else if(value != null){
        Method[index] = value;
        setMethod(Method)
      }
      for(let i=0; i!=(countMeth+1); i++){
        uiMethod.push(
          <li key={i}>
            <textarea 
                name = {i}
                value={Method[{i}]} 
                onChange={({target}) => renderMeth(target.value, target.name)} />
          </li>
                
        )
      }
      return uiMethod;
    }

    return (
      <div>
        <h2>Add Recipy</h2>      
            {notification}      
        <form onSubmit={handleSubmit}>
          <div>
            Title<br />
            <input type="text" value={title} 
             onChange={({target}) => setTitle(target.value)} />
          </div>
          <div>
            Description<br />
            <textarea value={description} 
             onChange={({target}) => setDescription(target.value)} />
          </div>
          <div>
            Ingredients<br />
            <ol>
              {renderIng()}
            </ol>
          </div>
          <div>
            Method<br />
            <ol>
              {renderMeth()}
            </ol>
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    )
  }


  export default CreatePost;