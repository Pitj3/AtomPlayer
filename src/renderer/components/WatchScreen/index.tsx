import React from "react";
import path from "path";

// Styles
import "./styles.less";
import WindowLayout from "../WindowLayout";
import { AppScreens } from "../../types/AppScreens";
import { EventManager } from "../../utils/EventManager";
import ItemInfo from "../../types/ItemInfo";

declare var __static;

interface Props {
	item: ItemInfo;
}

interface State {
}

export default class WatchScreen extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillMount() {

    }

    componentWillUnmount() {

    }

    onNavigateBack = async (event) => {
        await EventManager.dispatchAsync("navigate", {
            screen: AppScreens.Info,
            screenData: this.props.item
        });
    }

    render() {
        const pathToAsset = path.join(__static, "/assets");
		const { item } = this.props;

        return (
            <WindowLayout canNavigateBack
                          onNavigateBack={this.onNavigateBack}>
                <div className="video-outter">
                    <video id="video-player" autoPlay className="video-js vjs-default-skin" width="100%" height="100%" controls preload="auto" poster={pathToAsset + "/" + item.imagePath} data-setup="">
                        <source src={pathToAsset + "/" + item.path} type={'video/' + item.type} />
                        <track kind="captions" src={pathToAsset + "/" + item.captionsPath} label="English" default />
                    </video>
                </div>
            </WindowLayout>
        );
    }
}
