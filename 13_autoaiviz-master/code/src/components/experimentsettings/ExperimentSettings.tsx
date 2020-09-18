import React from "react";
import "./ExperimentSettings.scss";
import {
  SideNav,
  SideNavItems,
  SideNavMenu,
  SideNavMenuItem
} from "carbon-components-react";

export default class ExperimentSettings extends React.Component {
    render = () => {
        return (
            <>
                <div className = "experiment-settings-header">
                    <h5>Experiment Settings</h5>
                </div>
                <div className="experiment-settings-body scrollable">
                    <SideNav
                        isFixedNav
                        expanded={true}
                        isChildOfHeader={false}
                        aria-label="Side navigation">
                        <SideNavItems>
                            <SideNavMenu title="Dataset">
                                <SideNavMenuItem href="javascript:void(0)">
                                    Wine-Quality dataset
                                </SideNavMenuItem>
                            </SideNavMenu>
                            <SideNavMenu title="Model">
                                <SideNavMenuItem href="javascript:void(0)">
                                    Classification
                                </SideNavMenuItem>
                            </SideNavMenu>
                            <SideNavMenu title="Target Variable">
                                <SideNavMenuItem href="javascript:void(0)">
                                    Wine Type
                                </SideNavMenuItem>
                            </SideNavMenu>
                        </SideNavItems>
                    </SideNav>
                </div>
            </>
        );
    };
}

