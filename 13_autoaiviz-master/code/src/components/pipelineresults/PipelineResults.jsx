import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import './PipelineResults.scss';
import SplitPane from 'react-split-pane';
import Pane from 'react-split-pane';
import PipelinePerformance from '../pipelineperformance/PipelinePerformance';
import {Dropdown} from "carbon-components-react";
const pipelines = require('./pipelines.png');

const items = [
  {
    id: "option-1",
    label: "Accuracy",
  },
  {
    id: "option-2",
    label: "Precision",
  },
  {
    id: "option-3",
    label: "F-Score",
  },
  {
    id: "option-4",
    label: "Time",
  },
];

export default class PipelineResults extends React.Component {
/*{
    constructor(props:any){
        super(props)

        this.state = {
            estimators: []
        }
    }
    componentDidMount(){
        fetch('/api/lale/metadata/estimators/<name>')
            .then(response => {
                console.log(response)
                this.setState({posts: response.data})
            })
            .catch(error => {
                console.log(error)
            })
    }
}*/

    render = () => {
        return (
            <>
                <div className = "pipeline-results-header">
                    <h5>Pipeline Results</h5>
                </div>
                <div className="pipeline-results-body scrollable">
                    <Dropdown
                        ariaLabel="sort by"
                        id="pipeline-results-sort-by"
                        items={items}
                        label="Accuracy"
                        type = "inline"
                        titleText="Sort by:"
                    /><br />
                    <img src = {String(pipelines)} width={"70%"}/>
                </div>
            </>
        );
    };
}

