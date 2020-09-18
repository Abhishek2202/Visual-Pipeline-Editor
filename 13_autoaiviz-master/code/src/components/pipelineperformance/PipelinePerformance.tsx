import React from "react";
import "./PipelinePerformance.scss"
import {
  SideNav,
  SideNavItems,
  SideNavMenu,
  SideNavMenuItem
} from "carbon-components-react";

export default class PipelinePerformance extends React.Component {
    render = () => {
        return (
            <>
                <div className="pipeline-performance-header">
                    <h5>Pipeline Performance</h5>
                </div>

                <div className="pipeline-performance-body scrollable">
                    <SideNav
                        isFixedNav
                        expanded={true}
                        isChildOfHeader={false}
                        aria-label="Side navigation">
                        <SideNavItems>
                            <SideNavMenu title="Precision vs Recall">
                                <SideNavMenuItem href="javascript:void(0)">
                                    Precision vs Recall
                                </SideNavMenuItem>
                            </SideNavMenu>
                            <SideNavMenu title="F-score">
                                <SideNavMenuItem href="javascript:void(0)">
                                    F-score
                                </SideNavMenuItem>
                            </SideNavMenu>
                            <SideNavMenu title="ROC AUC Score">
                                <SideNavMenuItem href="javascript:void(0)">
                                    ROC AUC Score
                                </SideNavMenuItem>
                            </SideNavMenu>
                        </SideNavItems>
                    </SideNav>
                </div>
            </>
        );
    };
}

