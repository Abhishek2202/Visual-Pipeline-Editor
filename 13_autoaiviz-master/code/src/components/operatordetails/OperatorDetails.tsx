import React from "react";
import "./OperatorDetails.scss";
import {
  SideNav,
  SideNavItems,
  SideNavMenu,
  SideNavMenuItem
} from "carbon-components-react";

export default class OperatorDetails extends React.Component {
    render = () => {
        return (
            <>
                <div className="operator-details-header">
                  <h5>Operator Details</h5>
                </div>
                <div className="operator-details-body scrollable">
                    <SideNav
                        isFixedNav
                        expanded={true}
                        isChildOfHeader={false}
                        aria-label="Side navigation">
                        <SideNavItems>
                            <SideNavMenu title="num_leaves">
                                <SideNavMenuItem href="javascript:void(0)">
                                    num_leaves
                                </SideNavMenuItem>
                            </SideNavMenu>
                            <SideNavMenu title="min_data_in-leaf">
                                <SideNavMenuItem href="javascript:void(0)">
                                    min_data_in-leaf
                                </SideNavMenuItem>
                            </SideNavMenu>
                            <SideNavMenu title="learning_rate">
                                <SideNavMenuItem href="javascript:void(0)">
                                    learning_rate
                                </SideNavMenuItem>
                            </SideNavMenu>
                            <SideNavMenu title="bagging_freq">
                                <SideNavMenuItem href="javascript:void(0)">
                                    bagging_freq
                                </SideNavMenuItem>
                            </SideNavMenu>
                            <SideNavMenu title="max_features">
                                <SideNavMenuItem href="javascript:void(0)">
                                    max_features
                                </SideNavMenuItem>
                            </SideNavMenu>
                            <SideNavMenu title="n_estimators">
                                <SideNavMenuItem href="javascript:void(0)">
                                    n_estimators
                                </SideNavMenuItem>
                            </SideNavMenu>
                            <SideNavMenu title="n_jobs">
                                <SideNavMenuItem href="javascript:void(0)">
                                    n_jobs
                                </SideNavMenuItem>
                            </SideNavMenu>
                            <SideNavMenu title="bootstrap">
                                <SideNavMenuItem href="javascript:void(0)">
                                    bootstrap
                                </SideNavMenuItem>
                            </SideNavMenu>
                            <SideNavMenu title="random_state">
                                <SideNavMenuItem href="javascript:void(0)">
                                    random_state
                                </SideNavMenuItem>
                            </SideNavMenu>
                        </SideNavItems>
                    </SideNav>
                </div>
            </>
        );
    };
}

