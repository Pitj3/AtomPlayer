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
		const pathToAsset = path.join(__static, "/assets").replace(/\\/g, "/");
		const item = this.props.item;

        return (
            <WindowLayout canNavigateBack
            			onNavigateBack={this.onNavigateBack}>
                <div className="info-screen">
                    <div className="background-image" style={{backgroundImage: "url(" + pathToAsset + "/" + item.backgroundPath + ")"}}>
					</div>

					<div className="title">
						<Typography variant="h3" color="primary">
							{this.props.item.name}
						</Typography>
					</div>
					<div className="cover-image-outter">
						<img className="cover-image" src={pathToAsset + "/" + item.imagePath} />
					</div>

					<div className="info-panel">
						<div className="description">
							<Typography color="primary" variant="subtitle2">
								An exploration of our discovery of the laws of nature and coordinates in space and time.
							</Typography>

							<Button className="play-button" variant="contained" onClick={this.onWatch}>
								Play
							</Button>
						</div>
					</div>
                </div>
            </WindowLayout>
        );
    }
}
