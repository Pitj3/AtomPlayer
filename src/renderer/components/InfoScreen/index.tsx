import React from "react";
import path from "path";

// Styles
import "./styles.less";
import WindowLayout from "../WindowLayout";
import { Button, Paper, Typography } from "@material-ui/core";
import { AppScreens } from "../../types/AppScreens";
import { EventManager } from "../../utils/EventManager";
import ItemInfo from "../../types/ItemInfo";

declare var __static;

interface Props {
	item: ItemInfo;
}

interface State {
}

export default class InfoScreen extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentWillMount() {

    }

    componentWillUnmount() {

    }

    onWatch = async (event) => {
        await EventManager.dispatchAsync("navigate", {
            screen: AppScreens.Watch,
			screenData: this.props.item
        });
    }

    onNavigateBack = async (event) => {
        await EventManager.dispatchAsync("navigate", {
            screen: AppScreens.Home,
            screenData: this.props.item
        });
    }

    renderItems() {

        return (<div><Typography variant="body2" color="primary">{this.props.item.name}</Typography><Button onClick={this.onWatch}>Click to watch</Button></div>);
    }

    render() {
        return (
            <WindowLayout canNavigateBack
            onNavigateBack={this.onNavigateBack}>
                <div className="item-list">
                    {this.renderItems()}
                </div>
            </WindowLayout>
        );
    }
}
