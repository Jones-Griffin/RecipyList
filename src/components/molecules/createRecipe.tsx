import React, { FC, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { EditRecipeCard } from "./EditReipyComponents/EditRecipeCard";
import styled from "styled-components";
import firebase from "firebase";
import { IngredientsList } from "./EditReipyComponents/IngredientsList";
import { SubmitButton } from "../atoms/SubmitButton";
import fire from "../../../config/fire-config";

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

const EditRecipeDiv = styled.div`
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

export interface RecipeProps {
  id: string;
  title?: string;
  description?: string;
  Ingredients?: string[];
  Method?: string[];
  imgUrl?: string;
  tags?: string[];
}

interface CreateRecipeProps {
  tags: any;
  recipe?: RecipeProps;
}

export const CreateRecipe: FC<CreateRecipeProps> = ({ tags, recipe }) => {
  const router = useRouter();
  const [recipeClone, setRecipeClone] = useState<RecipeProps>();

  useEffect(() => {
    if (recipe) {
      setRecipeClone({
        title: "",
        description: "",
        Ingredients: [],
        Method: [],
        imgUrl: "",
        tags: [],
        ...recipe,
      });
    } else {
      setRecipeClone({
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

  const updateRecipeClone = (partial: Partial<RecipeProps>) => {
    setRecipeClone((r) => {
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
        updateRecipeClone({ imgUrl: downloadURL });
      });
    });
  };

  return (
    <div>
      <h2>Add Recipe</h2>
      {notification}
      <form onSubmit={handleSubmit}>
        <EditRecipeDiv>
          <IngredientsDiv>
            <div>
              Ingredients:
              <br />
              <ol>
                <IngredientsList
                  ingredientsList={recipeClone?.Ingredients}
                  updateIngredientsList={(ingredients) =>
                    updateRecipeClone({ Ingredients: ingredients })
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
                    updateRecipeClone({ Method: method })
                  }
                />
              </ol>
            </div>
          </IngredientsDiv>
          <TestDiv>
            Card:
            <br />
            <EditRecipeCard
              imgUrl={recipeClone?.imgUrl}
              title={recipeClone?.title}
              description={recipeClone?.description}
              updateTitle={(title) => updateRecipeClone({ title: title })}
              updateDesc={(desc) => updateRecipeClone({ description: desc })}
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
        </EditRecipeDiv>
      </form>
      <Footer>
        <Link href="/">
          <a>Back</a>
        </Link>
        <SubmitButton onClick={handleSubmit}>Save</SubmitButton>
      </Footer>
    </div>
  );
};
