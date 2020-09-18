import React, {RefObject} from "react";
import Operator from '../operator/Operator'
import "./OperatorPool.scss";
import Utils from "../../Utils";
import {Filter16} from '@carbon/icons-react';
import {red, green, yellow, blue} from "@carbon/colors";
import {
    Toolbar,
    ToolbarItem,
    ToolbarTitle,
    ToolbarOption,
    ToolbarSearch
} from 'carbon-components-react';
import {OverflowMenu} from 'carbon-components-react';
import {Checkbox} from 'carbon-components-react';

export default class OperatorPool extends React.Component<any> {

    state = {
        error: null,
        isLoaded: false,
        transformers: {},
        estimators: {},
        searchFilter: "",
        inTypeFilter: new Map<string, boolean>(),
        outTypeFilter: new Map<string, boolean>(),
        stageFilter: new Map<string, boolean>(),
        displayTransformers: new Map<string, any>(),
        displayEstimators: new Map<string, any>(),
    };

    private toolbarSearchRef: RefObject<any>;

    constructor(props: any) {
        super(props);
        this.toolbarSearchRef = React.createRef();
    }

    loadOperator() {
        const BACKEND_URL = "http://autoai-viz.res.ibm.com";
        const urls = [
            `${BACKEND_URL}/api/lale/metadata/transformers`,
            `${BACKEND_URL}/api/lale/metadata/estimators`
        ];
        Promise.all(urls.map(url => fetch(url)))
            .then((responses: Response[]) => Promise.all(responses.map((response) => response.json())))
            .then((operators: any[]) => {
                this.loadFilters(operators[0], operators[1], Utils.OPERATOR_STAGES);
                this.setState({
                    transformers: operators[0], // transformers
                    estimators: operators[1],   // estimators
                });
                this.onFilterUpdated();
            })
            .catch((reason: any) => {
                this.setState({
                    isLoaded: true,
                    reason
                });
                // alert("Could not load operator data. See console log for details.");
                console.error(reason);
            });
    }

    componentDidMount() {
        this.loadOperator();
    }

    processOperatorFilter = (operatorLabel:any, operator:any) => {
        const inType:{} = Utils.getInType(operator);
        if(inType["X"]) {
            if (inType["X"] instanceof Array) {
                inType["X"].map((type) => {
                    if (!(type in this.state.inTypeFilter)) {
                        this.state.inTypeFilter.set(type, true);
                    }
                });
            } else {
                if (!(inType["X"] in this.state.inTypeFilter)) {
                    this.state.inTypeFilter.set(inType["X"], true);
                }
            }
        }
        const outType:string = Utils.getOutType(operator);
        if(!(outType in this.state.outTypeFilter)) {
            this.state.outTypeFilter.set(outType, true);
        }
    };

    loadFilters = (transformers:any, estimators:any, operatorStages:any) => {
        Object.entries(transformers).map((entry, index) => {
            this.processOperatorFilter(entry[0], entry[1]);
        });
        Object.entries(estimators).map((entry, index) => {
            this.processOperatorFilter(entry[0], entry[1]);
        });
        Object.keys(operatorStages).map((stage) => {
            if(!(stage in this.state.stageFilter)) {
                this.state.stageFilter.set(stage, true);
            }
        });
    };

    removeDuplicates = (array) => {
        array.filter((item, pos, self) => {
            return self.indexOf(item) == pos;
        })
        return array;
    };

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<{}>, snapshot?: any): void {
        if(this.toolbarSearchRef.current) {
            this.toolbarSearchRef.current.setState({expanded: true});
            this.toolbarSearchRef.current.handleClickOutside = () => {
                // do not delete: this overwrites collapse in order to do just nothing
            };
        }
    }

    onFilterUpdated = () => {
        const displayTransformers = new Map<string, any>();
        Object.entries(this.state.transformers).map((entry, index) => {
            if(!this.checkMatchesInTypeFilter(Utils.getInType(entry[1]))) {
                return;
            }
            if(!this.state.outTypeFilter.get(Utils.getOutType(entry[1]))) {
                return;
            }
            if(!this.state.stageFilter.get(Utils.getStage(entry[0]))) {
                return;
            }
            if(this.state.searchFilter !== "") {
                let unmatched = false;
                this.state.searchFilter.split(" ").map((term) => {
                    if (entry[0].toLowerCase().indexOf(term) === -1) {
                       unmatched = true;
                    }
                });
                if(unmatched) {
                    return;
                }
            }
            displayTransformers.set(entry[0], entry[1]);
        });
        const displayEstimators = new Map<string, any>();
        Object.entries(this.state.estimators).map((entry, index) => {
            if(!this.checkMatchesInTypeFilter(Utils.getInType(entry[1]))) {
                return;
            }
            if(!this.state.outTypeFilter.get(Utils.getOutType(entry[1]))) {
                return;
            }
            if(!this.state.stageFilter.get(Utils.getStage(entry[0]))) {
                return;
            }
            if(this.state.searchFilter !== "") {
                let unmatched = false;
                this.state.searchFilter.split(" ").map((term) => {
                    if (entry[0].toLowerCase().indexOf(term) === -1) {
                       unmatched = true;
                    }
                });
                if(unmatched) {
                    return;
                }
            }
            displayEstimators.set(entry[0], entry[1]);
        });
        this.setState({
            isLoaded: true,
            searchFilter: this.state.searchFilter,
            stageFilter: this.state.stageFilter,
            inTypeFilter: this.state.inTypeFilter,
            outTypeFilter: this.state.outTypeFilter,
            displayTransformers: displayTransformers,
            displayEstimators: displayEstimators
        });
    };

    checkMatchesInTypeFilter = (inTypes) => {
        if(!inTypes['X']) {
            return false;
        }
        else if(!(inTypes['X'] instanceof Array)) {
            if(!this.state.inTypeFilter.get(inTypes['X'])) {
                return false;
            }
        } else {
            let match = false;
            inTypes['X'].map((type) => {
                if(this.state.inTypeFilter.get(type)) {
                    match = true;
                }
            });
            if(!match) {
                return false;
            }
        }
        return true;
    };

    render = () => {
        if (this.state.error) {
            return (
                <>
                    <div className="operator-pool-header">
                        <h5>Operator Pool</h5>
                    </div>
                    <div className="operator-pool-body scrollable">
                        Error: {JSON.stringify(this.state.error)}
                    </div>
                </>
            );
        } else if (!this.state.isLoaded) {
            return (
                <>
                    <div className="operator-pool-header">
                        <h5>Operator Pool</h5>
                    </div>
                    <div className="operator-pool-body scrollable">
                        Loading...
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div className="operator-pool-header">
                        <h5>Operator Pool</h5>
                    </div>
                    <Toolbar>
                        <ToolbarSearch
                            ref={this.toolbarSearchRef}
                            type="search"
                            placeHolderText="Filter Operator"
                            value = {this.state.searchFilter}
                            onChange = {
                                (e) => {
                                    this.state.searchFilter = e.target.value.toLowerCase();
                                    this.onFilterUpdated();
                                }
                            }
                        />
                        <ToolbarItem>
                            <OverflowMenu
                                renderIcon={Filter16}
                                onClose={() => {this.toolbarSearchRef.current.setState({expanded: true})}}
                            >
                                <ToolbarTitle title="OPERATORS"/>
                                <table className="operator-filter">
                                    <thead>
                                        <tr>
                                            <th>
                                                <ToolbarOption>
                                                    Pipeline stage
                                                </ToolbarOption>
                                            </th>
                                            <th>
                                                <ToolbarOption>
                                                    Input type
                                                </ToolbarOption>
                                            </th>
                                            <th>
                                                <ToolbarOption>
                                                    Output type
                                                </ToolbarOption>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className={"stage-filter-column"}>
                                                <ToolbarOption>
                                                    <table>
                                                        <tbody>
                                                        {
                                                            Array.from(this.state.stageFilter.keys())
                                                            //.sort(function(a, b){
                                                            //    if(a < b) { return -1; }
                                                            //    if(a > b) { return 1; }
                                                            //    return 0;
                                                            //})
                                                            .map((key, index) => {
                                                                return (
                                                                    <tr>
                                                                        <td>
                                                                            <div>
                                                                                <Checkbox
                                                                                    className={`checkbox ${key}`}
                                                                                    id={`stage_filter_${key}`}
                                                                                    defaultChecked={this.state.stageFilter.get(key)}
                                                                                    labelText={Utils.getLabelForStageKey(key)}
                                                                                    onChange={
                                                                                        (value) => {
                                                                                            this.state.stageFilter.set(key, value);
                                                                                            this.onFilterUpdated();
                                                                                        }
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            })
                                                        }
                                                        </tbody>
                                                    </table>
                                                </ToolbarOption>
                                            </td>
                                            <td>
                                                <ToolbarOption>
                                                    <table>
                                                        <tbody>
                                                        {
                                                            Array.from(this.state.inTypeFilter.keys())
                                                            .sort(function(a, b){
                                                                if(a < b) { return -1; }
                                                                if(a > b) { return 1; }
                                                                return 0;
                                                            })
                                                            .map((key) => {
                                                                return (
                                                                    <tr>
                                                                        <td>
                                                                            <Checkbox
                                                                                id={`intype_filter_${key}`}
                                                                                defaultChecked={this.state.inTypeFilter.get(key)}
                                                                                labelText={key ? Utils.replaceAll(key) : "undefined"}
                                                                                onChange={
                                                                                    (value) => {
                                                                                        this.state.inTypeFilter.set(key, value);
                                                                                        this.onFilterUpdated();
                                                                                    }
                                                                                }
                                                                            />
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            })
                                                        }
                                                        </tbody>
                                                    </table>
                                                </ToolbarOption>
                                            </td>
                                            <td>
                                                <ToolbarOption>
                                                    <table>
                                                        <tbody>
                                                        {
                                                            Array.from(this.state.outTypeFilter.keys())
                                                            .sort(function(a, b){
                                                                if(a < b) { return -1; }
                                                                if(a > b) { return 1; }
                                                                return 0;
                                                            })
                                                            .map((key) => {
                                                                return (
                                                                    <tr>
                                                                        <td>
                                                                            <Checkbox
                                                                                id={`outtype_filter_${key}`}
                                                                                defaultChecked={this.state.outTypeFilter.get(key)}
                                                                                labelText={key ? Utils.replaceAll(key) : "undefined"}
                                                                                onChange={
                                                                                    (value) => {
                                                                                        this.state.outTypeFilter.set(key, value);
                                                                                        this.onFilterUpdated();
                                                                                    }
                                                                                }
                                                                            />
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            })
                                                        }
                                                        </tbody>
                                                    </table>
                                                </ToolbarOption>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </OverflowMenu>
                        </ToolbarItem>
                    </Toolbar>
                    <div className="operator-pool-body scrollable">
                        {
                            [
                                ...Array.from(this.state.displayTransformers.entries()),
                                ...Array.from(this.state.displayEstimators.entries())
                            ]
                            .sort((op1, op2) => {
                                if(op1 < op2) {
                                    return -1;
                                } else if(op1 > op2) {
                                    return 1;
                                } else {
                                    return 0;
                                }
                            })
                            .filter((item, pos, self) => {
                                return self.indexOf(item) == pos;
                            })
                            .map((entry: any, index: number) => {
                                return (
                                    <Operator key={`operator${index}`} operatorId={entry[0]} data={entry[1]}/>
                                );
                            })
                        }
                    </div>
                </>

            );
        }
    };
}
