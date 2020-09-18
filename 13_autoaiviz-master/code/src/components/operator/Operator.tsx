import React from "react";
import {Fragment} from "react";
import "./Operator.scss";
import Utils from "../../Utils";
import {Tooltip, Link, Button} from "carbon-components-react";
import {red, green, yellow, blue, Gray} from "@carbon/colors";

const props = {
    withoutIcon: () => ({
    showIcon: false,
    })
}

export default class Operator extends React.Component<any> {

    getInTypeShape = (type: any): any => {
        let renderType = undefined;
        if(type && type["X"]) {
            if(type["X"] instanceof Array) {
            renderType = type["X"][0]
            } else {
                renderType = type["X"];
            }
        }
        switch(renderType) {
            case "laleType: Any":               //lale any: need to change width
                //bars
                return "L50,50 M75,75 L75,225 L80,225 L80,75 L75,75 M105,100 L105,200 L110,200 L110,100 L105,100";
            case "array(laleType: Any)":        //lale any: need to change width
                // rect bars
                return "L50,225 L75,225 L75,75 L50,75 L50,50 M110,100 L110,200 L115,200 L115,100 L110,100 M135,125 L135,175 L140,175 L140,125 L135,125";
            case "array(number)":               //done
                //rect tri
                return "L50,225 L75,225 L75,200 L140,150 L75,100 L75,75 L50,75 L50,50";
            case "array(array(number))":        //done
                //rect rect tri
                return "L50,225 L75,225 L75,200 L100,200 L100,175 L140,150 L100,125 L100,100 L75,100 L75,75 L50,75 L50,50";
            case "array(string)":               //done
                //rect circle
                return "L50,225 L75,225 L75,200 A 20 20, 0, 0 0, 75 100 L75,75 L50,75 L50,50";
            case "array(array(string))":        //done
                //rect rect circle
                return "L50,225 L75,225 L75,200 L100,200 L100,175 A 20 20, 0, 0 0, 100 125 L100,100 L75,100 L75,75 L50,75 L50,50";
            case "array(array(laleType: Any))": //lale any: need to change width
                //rect rect bars
                return "L50,225 L75,225 L75,200 L100,200 L100,100 L75,100 L75,75 L50,75 L50,50 M115,120 L115,180 L120,180 L120,120 L115,120 M135,140 L135,160 L140,160 L140,140 L135,140";
            default:
                console.warn("No shape for input type: " + renderType);
                return "L50,200  A 50 50, 0, 0 0, 50 100 L50,50";
        }
    };

    getOutTypeShape = (type: any): any => {
        switch(type) {
            case "laleType: Any":               //done max-x:400
                //bars
                return "L340,50 L340,250 L310,250 M365,75 L365,225 L370,225 L370,75 L365,75 M395,100 L395,200 L400,200 L400,100 L395,100 M310,250";
            case "array(number)":               //done max-x:400
                //rect tri
                return "L310,75 L335,75 L335,100 L400,150 L335,200 L335,225 L310,225 L310,250";
            case "array(array(number))":        //done max-x: 400
                //rect rect tri
                return "L310,75 L335,75 L335,100 L360,100 L360,125 L400,150 L360,175 L360,200 L335,200 L335,225 L310,225 L310,250";
            case "array(string)":               //done
                //rect circle
                return "L310,75 L335,75 L335,100 A 20 20, 0, 0 0, 335 200 L335,225 L310,225 L310,250";
            case "array(array(laleType: Any))": //done max-x: 400
                //rect rect bars
                return "L310,75 L335,75 L335,100 L360,100 L360,200 L335,200 L335,225 L310,225 L310,250 M375,120 L375,180 L380,180 L380,120 L375,120 M395,140 L395,160 L400,160 L400,140 L395,140 M310,250";
            case "array(laleType: Any)":        //done max-x: 400
                //rect bars
                return "L310,75 L335,75 L335,225 L310,225 L310,250 M370,100 L370,200 L375,200 L375,100 L370,100 M395,125 L395,175 L400,175 L400,125 L395,125 M310,250";
            default:
                console.warn("No shape for output type: " + type);
                return "L310,100 A 50 50, 0, 0 1, 310 200 L310,250";
        }
    };

    getPath = (operator: any): any => {
        const inType = Utils.getInType(operator);
        const outType = Utils.getOutType(operator);
        return "M50,50 L310,50" + this.getOutTypeShape(outType) + "L50,250" + this.getInTypeShape(inType);
    };

    processLabel = (operatorId: any): any => {
        return operatorId.split(/(?<=[a-z, 0-9])(?=[A-Z])/).join(" ").split(/(?<=[A-Z]*)(?=[A-Z][a-z])/).join(" ");
    };

    render() {
        return (
            <div className="operator-tile">
                <svg className="col col-md-6" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    {
                        <path
                            className={`path ${Utils.getStage(this.props.operatorId)}`}
                            d={this.getPath(this.props.data)}
                        />
                    }
                </svg>
                <span className="operator-label">
                    <Tooltip {...props.withoutIcon()}
                        direction="right"
                        triggerText={this.processLabel(this.props.operatorId)}
                    >
                        <p>
                            <h5>Description:</h5>
                            {this.props.data.hyperparam_schema.description}
                        </p>
                        <p>
                            <h5>Hyper-parameters:</h5>
                            {
                                Object.keys(this.props.data.hyperparam_schema.allOf[0].properties !== undefined &&
                                (this.props.data.hyperparam_schema.allOf[0].properties)).join("\n")
                            }
                        </p>
                        <div className="bx--tooltip__footer">
                            <Link href="http://json-schema.org/draft-04/schema#">Schema</Link>
                        </div>
                    </Tooltip>
                </span>
            </div>
        );
    }
}