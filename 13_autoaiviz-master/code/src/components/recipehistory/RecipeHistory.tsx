import React from "react";
import "./RecipeHistory.scss"
import recipehistory from './recipehistory.png';

export default class RecipeHistory extends React.Component {
    render = () => {
        return (
            <>
                <div className = "recipe-history-header">
                    <h5>Recipe History</h5>
                </div>
                <div className="recipe-history-body scrollable">
                    <img src={String(recipehistory)} width={"70%"} />
                </div>
            </>
        );
    };
}

