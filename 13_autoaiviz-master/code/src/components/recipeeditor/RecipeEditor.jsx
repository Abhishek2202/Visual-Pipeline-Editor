import React from "react";
import "./RecipeEditor.scss";
import logo_recipe from './recipe.png';

export default class RecipeEditor extends React.Component {
    render = () => {
        return (
            <>
                <div className = "recipe-editor-header">
                    <h5>Recipe Editor</h5>
                </div>
                <div className="recipe-editor-body scrollable">
                    <img src={String(logo_recipe)} width={"70%"}/>
                </div>

            </>
        );
    };
}

