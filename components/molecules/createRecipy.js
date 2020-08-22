// components/CreatePost.js

import React, { useState } from 'react';
import fire from '../../config/fire-config';
import { useRouter } from 'next/router'

import styled from 'styled-components'

const DefForm = styled.input`
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: none;
  border-bottom: 2px solid black;
`;

const FormTitle = styled(DefForm)`
  font-weight: bold;
  font-size: 30px;
  background-color: #f8f8f8;
  max-width: 406px;
  width: 100%;
`;

const FormDesc = styled.textarea`
  height: 200px;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: none;
  border-bottom: 2px solid black;
  background-color: #f8f8f8;
  resize: none;
  max-width: 406px;
  width: 100%;
`;

const FormIM = styled.textarea`
  padding: 8px 10px;
  padding-bottom: 0;
  // margin: 8px 0;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid black;
  background-color: #f8f8f8;
  resize: none;
  max-width: 366px;
  width: 100%;
  line-height: 15px;
`;

const ListIM = styled.li`
  margin: 12px 0;
`;

const CheckDiv = styled.div`
  display: flex;
  margin: 0 12px;
`;

const TagDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 420px;
  width: 100%;
`;

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
          <ListIM key={i}>
            <FormIM 
                name = {i}
                value={ingredients[{i}]} 
                onChange={({target}) => renderIng(target.value, target.name)} />
          </ListIM>
                
        )
      }
      return uiItems;
    }


    const renderTag = () => {
      const len = tagTracker.length
      let tagList = [];
      for(let i = 0; i< len; i++){
        tagList.push(
          <CheckDiv>
          <input
                name={tagTracker[i].tagName} 
                lable
                type="checkbox"
                onChange={() => {tagTracker[i].tagSet = !tagTracker[i].tagSet}} />
                <p >{tagTracker[i].tagName} </p>
          </CheckDiv>
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
          <ListIM key={i}>
            <FormIM 
                name = {i}
                value={Method[{i}]} 
                onChange={({target}) => renderMeth(target.value, target.name)} />
          </ListIM>
                
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
            <FormTitle type="text" value={title} 
             onChange={({target}) => setTitle(target.value)} />
          </div>
          <div>
            Description<br />
            <FormDesc value={description} 
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

          <TagDiv>
            {renderTag()}
          </TagDiv>
          <button type="submit">Save</button>
        </form>
      </div>
    )
  }




  export default CreatePost;