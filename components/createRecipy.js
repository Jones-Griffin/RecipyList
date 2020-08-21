// components/CreatePost.js

import React, { useState } from 'react';
import fire from '../config/fire-config';
import { useRouter } from 'next/router'



const CreatePost = (props) => {
    const router = useRouter();  
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ingredientsList, setIngredients] = useState([]);
    let ingredients = [];
    const [countIng, setCountIng] = useState(0);
    const [MethodList, setMethod] = useState([]);
    let Method = [];
    const [countMeth, setCountMeth] = useState(0);
    const [notification, setNotification] = useState('');

    let tagTracker = [];
    Object.entries(props.Tags).map(Tag =>{
      const tagData = { tagName: Tag[0], tagSet: false}
      console.log(Tag)
      tagTracker.push(tagData)}
    )



    const handleSubmit = (event) => {
      event.preventDefault();  

      var CardData = {
        description: description,
        img: "None",
        title: title,
      };

      var filteredMeth = MethodList.filter(Boolean);
      var filteredIng = ingredientsList.filter(Boolean);

      var RecipyData = {
        title: title,
        Method: filteredMeth,
        Ingredients: filteredIng,
      };

      
    
      var newRespityKey = fire.database().ref().child('RecipyNames').push().key;

      var updates = {};
      tagTracker.forEach(tag => {
        if(tag.tagSet){
          updates['/TagInfo/' + tag.tagName + '/' + newRespityKey] = CardData;
        }
      });
      updates['/RecipyNames/' + newRespityKey] = CardData;
      updates['/Recipies/' + newRespityKey] = RecipyData;

      
      fire.database().ref().update(updates)
      

        setTitle('');
        setDescription(''); 
        setIngredients('')  
        setCountIng(0)
        setMethod('')
        setCountMeth(0)
        setNotification('Blogpost created');    
        setTimeout(() => {
            setNotification('')
        }, 2000)
        router.push("/") 
        
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


    const renderTag = () => {
      const len = tagTracker.length
      let tagList = [];
      for(let i = 0; i< len; i++){
        tagList.push(
          <div>
          <input
                name={tagTracker[i].tagName} 
                lable
                type="checkbox"
                onChange={() => {tagTracker[i].tagSet = !tagTracker[i].tagSet}} />
                <p >{tagTracker[i].tagName} </p>
          </div>
        )
      }
      return tagList;
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

          <div>
            {renderTag()}
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    )
  }




  export default CreatePost;