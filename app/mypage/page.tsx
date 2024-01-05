'use client'

import React, {useState, useContext, useEffect} from "react"
import LoginContext from "@/app/_contexts/login_context"

type RecipeResponse = {
  id: number
  url: string
  title: string
  image_url: string
  registered_at: string
}

export default function Mypage() {
  const loginContext = useContext(LoginContext)

  const [recipeUrl, setRecipeUrl] = useState<string>("")
  const [recipeTitle, setRecipeTitle] = useState<string>("")
  const [recipeImageUrl, setRecipeImageUrl] = useState<string>("")

  const [recipes, setRecipes] = useState<RecipeResponse[]>([])

  useEffect(() => {
    fetch(`http://localhost:3000/secure/recipes`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${loginContext.token}`
      }
    })
      .then((response) => {
        return response.json()
      })
      .then((data:{status:string, recipes:RecipeResponse[]}) => {
        if (data.status === 'error') {
        }
        else {
          setRecipes(data.recipes)
        }
      })
  }, [])

  const recipeUrlChanged = (value: string) => {
    setRecipeUrl(value)

    if (value === "") {
      return
    }

    fetch(`http://localhost:3000/secure/recipes/preview?url=${value}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginContext.token}`
      }
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        if (data.status === 'error') {
        }
        else {
          setRecipeTitle(data.og_title)
          setRecipeImageUrl(data.og_image_url)
        }
      })
  }

  const addRecipe = (event: React.MouseEvent<HTMLButtonElement>) => {
    const data = {
      url: recipeUrl,
      title: recipeTitle,
      image_url: recipeImageUrl
    }

    fetch(
      'http://localhost:3000/secure/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${loginContext.token}`
        },
        body: JSON.stringify(data)
      })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        if (data.status === 'error') {
        }
        else {
          setRecipeUrl("")
          setRecipeTitle("")
          setRecipeImageUrl("")
        }
      })
  }

  return (
    <div className="flex flex-1 flex-col justify-center">
      <div className="mx-auto w-full max-w-sm">
        <h2 className="text-2xl text-center">マイページ</h2>
      </div>
      <div className="mx-auto w-full max-w-sm mt-8">
        <label htmlFor="recipeUrl" className="block">レシピURL</label>
        <input type="recipeUrl"
               required
               name="recipeUrl"
               id="recipeUrl"
               value={recipeUrl}
               onChange={(event) => recipeUrlChanged(event.target.value)}
               placeholder="https://"
               className="block w-full rounded-md ring-1 ring-inset ring-gray-300 p-2 mt-1"
        />
      </div>
      <div className="mx-auto w-full max-w-sm mt-8">
        <div className="flex">
          <div className="flex-none">
            <img src={recipeImageUrl} className="w-36 object-contain"/>
          </div>
          <div className="flex-grow ml-4">
            <div className="text-md">{recipeTitle}</div>
          </div>
        </div>
        <div className="mt-6">
          <button onClick={(event) => addRecipe(event)}
                  className="w-full rounded-md bg-emerald-600 hover:bg-emerald-500 py-2 text-white"
          >レシピを登録</button>
        </div>
      </div>
      <div className="mx-auto w-full max-w-sm mt-8">
        <ul>
          {recipes.map((recipe) => {
            return (
              <li key={recipe.id} className="flex mb-4">
                <div className="flex-none w-36">
                  {recipe.image_url && <img src={recipe.image_url} alt={recipe.title} className="w-36 object-contain rounded-md"/>}
                </div>
                <div className="flex-grow ml-2">
                  <span className="text-sm"><a href={recipe.url} target="_blank">{recipe.title}</a></span>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
