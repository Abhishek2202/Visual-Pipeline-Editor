import React from 'react';
import './App.scss';
import "carbon-components/scss/globals/scss/styles.scss";
import SplitPane from 'react-split-pane';
import Pane from 'react-split-pane';
import ExperimentSettings from './components/experimentsettings/ExperimentSettings';
import PipelineResults from './components/pipelineresults/PipelineResults';
import OperatorPool from "./components/operatorpool/OperatorPool";
import RecipeHistory from "./components/recipehistory/RecipeHistory";
import RecipeEditor from "./components/recipeeditor/RecipeEditor";
import {Header as CHeader, HeaderName} from "carbon-components-react";
import OperatorDetails from "./components/operatordetails/OperatorDetails";
import PipelinePerformance from "./components/pipelineperformance/PipelinePerformance";

function App() {
    return (
        <>
            <CHeader aria-label="IBM Platform Name">
                <HeaderName prefix="IBM" className={"pr-0"}>
                    <span className="header-logo">
                        Research MyAutoAI
                    </span>
                </HeaderName>
            </CHeader>
            <SplitPane split="vertical" className={"content-pane"}>
                <SplitPane split="horizontal" initialSize={"305px"} minSize={"305px"}>
                    <Pane initialSize={"200px"} minSize={"54px"}>
                        <ExperimentSettings/>
                    </Pane>
                    <Pane minSize={"54px"}>
                        <OperatorPool/>
                    </Pane>
                </SplitPane>
                <SplitPane split="horizontal" minSize={"610px"}>
                    <SplitPane split="vertical" minSize={"54px"}>
                        <Pane minSize={"305px"}>
                            <RecipeEditor/>
                        </Pane>
                        <Pane initialSize={"305px"} minSize={"305px"}>
                            <RecipeHistory/>
                        </Pane>
                    </SplitPane>
                    <SplitPane initialSize={"350px"} minSize={"200px"}>
                        <Pane minSize={"305px"}>
                            <PipelineResults/>
                        </Pane>
                        <Pane initialSize={"305px"} minSize={"305px"}>
                            <PipelinePerformance/>
                        </Pane>
                    </SplitPane>
                </SplitPane>
                <Pane initialSize={"305px"} minSize={"305px"}>
                    <OperatorDetails/>
                </Pane>
            </SplitPane>
        </>
    );
}
export default App;
