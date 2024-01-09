'use client'

import React, {useState, useEffect} from "react"
import {useRequireLogin} from "@/app/_hooks/use_require_login";

type RecipeResponse = {
  id: number
  url: string
  title: string
  image_url: string
  registered_at: string
}

export default function Mypage() {
  const [recipeUrl, setRecipeUrl] = useState<string>("")
  const [recipeTitle, setRecipeTitle] = useState<string>("")
  const [recipeImageUrl, setRecipeImageUrl] = useState<string>("")

  const [previewFailed, setPreviewFailed] = useState<boolean>(false)
  const [showPreview, setShowPreview] = useState<boolean>(false)

  const [recipes, setRecipes] = useState<RecipeResponse[]>([])

  useRequireLogin()

  const loadRecipes = () => {
    fetch(`/api/secure/recipes`, {
      method: "GET"
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
  }

  useEffect(() => {
    loadRecipes()
  }, [])

  const recipeUrlChanged = (value: string) => {
    setRecipeUrl(value)

    if (value === "") {
      setPreviewFailed(false)
      setShowPreview(false)
      setRecipeTitle("")
      setRecipeImageUrl("")

      return
    }

    fetch(`/api/secure/recipes/preview?url=${value}`, {
      method: "GET"
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        if (data.status === 'error') {
          setPreviewFailed(true)
          setShowPreview(false)
        }
        else {
          setPreviewFailed(false)
          setRecipeTitle(data.og_title)
          setRecipeImageUrl(data.og_image_url)
          setShowPreview(true)
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
      `/api/secure/recipes`, {
        method: 'POST',
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
          setShowPreview(false)

          loadRecipes()
        }
      })
  }

  return (
    <div className="flex flex-1 flex-col justify-center">
      <div className="mx-auto w-full max-w-sm">
        <h2 className="text-2xl text-center">マイページ</h2>
      </div>
      <div className="mx-auto w-full max-w-sm mt-8">
        <label htmlFor="recipeUrl" className="block text-sm text-gray-500">レシピURL</label>
        <input type="text"
               required
               name="recipeUrl"
               id="recipeUrl"
               value={recipeUrl}
               onChange={(event) => recipeUrlChanged(event.target.value)}
               placeholder="https://"
               className="block w-full rounded-md ring-1 ring-inset ring-gray-300 p-2 mt-1"
        />
      </div>
      <div className="mx-auto w-full max-w-sm">
        {
          showPreview && (
            <div className="flex mt-8">
              <div className="flex-none">
                <img src={recipeImageUrl} className="w-36 object-contain"/>
              </div>
              <div className="flex-grow ml-4">
                <div className="text-md">{recipeTitle}</div>
              </div>
            </div>
          )
        }
        {
          previewFailed && (
            <div>
              <div className="rounded-md border border-solid border-red-400 p-2 text-red-400 mt-2">
                <div className="text-center text-md">指定されたURLの情報を取得できませんでした</div>
              </div>
              <div className="mt-4">
                <label htmlFor="recipeUrl" className="block text-sm text-gray-500">レシピ名</label>
                <input type="text"
                       name="recipeTitle"
                       id="recipeTitle"
                       value={recipeTitle}
                       onChange={(event) => setRecipeTitle(event.target.value)}
                       className="block w-full rounded-md ring-1 ring-inset ring-gray-300 p-2 mt-1"
                />
              </div>
            </div>
          )
        }

        <div className="mt-6">
          <button onClick={(event) => addRecipe(event)}
                  disabled={!recipeUrl || !recipeTitle}
                  className="w-full rounded-md bg-emerald-600 hover:bg-emerald-500 py-2 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >レシピを登録
          </button>
        </div>
      </div>
      <div className="mx-auto w-full max-w-sm mt-8">
        <ul>
          {recipes.map((recipe) => {
            return (
              <li key={recipe.id} className="flex mb-4">
                {
                  recipe.image_url ? (
                    <div className="flex-none w-36">
                      <img src={recipe.image_url} alt={recipe.title} className="w-36 object-contain rounded-md"/>
                    </div>
                  ) : (
                    <div className="flex-none w-36">
                      <div className="w-36 h-16 rounded-md border border-solid border-gray-300 flex justify-center items-center">
                        <div className="text-gray-300 text-sm">No Image.</div>
                      </div>
                    </div>
                  )
                }
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
