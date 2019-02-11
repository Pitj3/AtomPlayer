import React from "react";
import path from "path";

// Styles
import "./styles.less";
import WindowLayout from "../WindowLayout";
import { Button, Paper } from "@material-ui/core";
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

    renderItems() {
        return <Button onClick={this.onWatch}>Click to watch</Button>
    }

    render() {
        return (
            <WindowLayout>
                <div className="item-list">
                    {this.renderItems()}
                </div>
            </WindowLayout>
        );
    }
}
