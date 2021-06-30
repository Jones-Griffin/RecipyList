import React, { FC, useEffect, useState } from "react";
import Link from "next/link";
import fire from "../../config/fire-config";
import { useRouter } from "next/router";
import { EditRecipycard } from "./EditRecipyCard";
import styled from "styled-components";
import firebase from "firebase";
import { IngredientsList } from "./EditReipyComponents/IngredientsList";
import { Submitbutton } from "../atoms/SubmitButton";

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

const EditRecipyDiv = styled.div`
  display: flex;
`;

const IngredientsDiv = styled.div`
  flex: 1 1 55%;
`;

const TestDiv = styled.div`
  flex: 1 1 auto;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 45px 18px 25px;
`;

export interface RecipieProps {
  id: string;
  title?: string;
  description?: string;
  Ingredients?: string[];
  Method?: string[];
  imgUrl?: string;
  tags?: string[];
}

interface CreateRecipyProps {
  tags: any;
  recipie?: RecipieProps;
}

export const CreateRecipy: FC<CreateRecipyProps> = ({ tags, recipie }) => {
  const router = useRouter();
  const [recipeClone, setRecipieClone] = useState<RecipieProps>();

  useEffect(() => {
    if (recipie) {
      setRecipieClone({
        title: "",
        description: "",
        Ingredients: [],
        Method: [],
        imgUrl: "",
        tags: [],
        ...recipie,
      });
    } else {
      setRecipieClone({
        id: fire.database().ref().child("RecipyNames").push().key,
        title: "",
        description: "",
        Ingredients: [],
        Method: [],
        imgUrl: "",
        tags: [],
      });
    }
  }, []);

  const [notification, setNotification] = useState("");

  const user = fire.auth().currentUser;

  const updateRecipieClone = (partial: Partial<RecipieProps>) => {
    setRecipieClone((r) => {
      return { ...r, ...partial };
    });
  };

  let tagTracker = [];
  Object.entries(tags).map((Tag) => {
    const tagData = { tagName: Tag[0], tagSet: false };
    tagTracker.push(tagData);
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    var CardData = {
      description: recipeClone.description || "",
      imageUrl: recipeClone.imgUrl || "",
      title: recipeClone.title || "",
    };

    var updates = {};
    tagTracker.forEach((tag) => {
      if (tag.tagSet) {
        recipeClone.tags.push(tag.tagName);
        updates["/TagInfo/" + tag.tagName + "/" + recipeClone.id] = CardData;
      }
    });
    var RecipyData = { ...recipeClone, user: user.uid };

    updates["/Recipies/" + recipeClone.id] = RecipyData;

    fire.database().ref().update(updates);

    setNotification("Post created");
    setTimeout(() => {
      setNotification("");
    }, 2000);
    router.push("/");
  };

  const renderTag = () => {
    const len = tagTracker.length;
    let tagList = [];
    for (let i = 0; i < len; i++) {
      tagList.push(
        <CheckDiv key={tagTracker[i].tagName}>
          <input
            name={tagTracker[i].tagName}
            type="checkbox"
            defaultChecked={recipeClone?.tags.includes(tagTracker[i].tagName)}
            onChange={(e) => {
              tagTracker[i].tagSet = e.currentTarget.checked;
            }}
          />
          <p>{tagTracker[i].tagName} </p>
        </CheckDiv>
      );
    }
    return tagList;
  };

  const uploadFile = (event) => {
    const storage = firebase.storage().ref();
    const img = event.target.files[0];

    const imgRef = storage.child(`recipie/image/${img.name}`);

    const task = imgRef.put(img);

    task.then((snapshot) => {
      snapshot.ref.getDownloadURL().then((downloadURL) => {
        updateRecipieClone({ imgUrl: downloadURL });
      });
    });
  };

  return (
    <div>
      <h2>Add Recipe</h2>
      {notification}
      <form onSubmit={handleSubmit}>
        <EditRecipyDiv>
          <IngredientsDiv>
            <div>
              Ingredients:
              <br />
              <ol>
                <IngredientsList
                  ingredientsList={recipeClone?.Ingredients}
                  updateIngredientsList={(ingredients) =>
                    updateRecipieClone({ Ingredients: ingredients })
                  }
                />
              </ol>
            </div>
            <div>
              Method:
              <br />
              <ol>
                <IngredientsList
                  ingredientsList={recipeClone?.Method}
                  updateIngredientsList={(method) =>
                    updateRecipieClone({ Method: method })
                  }
                />
              </ol>
            </div>
          </IngredientsDiv>
          <TestDiv>
            Card:
            <br />
            <EditRecipycard
              imgUrl={recipeClone?.imgUrl}
              title={recipeClone?.title}
              description={recipeClone?.description}
              updateTitle={(title) => updateRecipieClone({ title: title })}
              updateDesc={(desc) => updateRecipieClone({ description: desc })}
            />
            <br />
            <input
              type="file"
              id="CoverImg"
              name="CoverImg"
              onChange={uploadFile}
            />
            <TagDiv>{renderTag()}</TagDiv>
          </TestDiv>
        </EditRecipyDiv>
      </form>
      <Footer>
        <Link href="/">
          <a>Back</a>
        </Link>
        <Submitbutton onClick={handleSubmit}>Save</Submitbutton>
      </Footer>
    </div>
  );
};
