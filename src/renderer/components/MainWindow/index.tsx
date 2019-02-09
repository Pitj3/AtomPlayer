import React from "react";
import path from "path";

// Styles
import "./styles.less";
import WindowLayout from "../WindowLayout";

declare var __static;

interface Props {
}

interface State {
}

export default class MainWindow extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillMount() {

    }

    componentWillUnmount() {

	}

    render() {
        const pathToAsset = path.join(__static, "/assets");

        return (
            <WindowLayout>
                <div className="video-outter">
                    <video id="video-player" className="video-js vjs-default-skin" width="100%" height="100%" controls preload="auto" poster={pathToAsset + "/cosmos.jpg"} data-setup="">
                        <source src={pathToAsset + "/cosmos.mp4"} type='video/mp4' />
                        <track kind="captions" src={pathToAsset + "/cosmos.vtt"} label="English" default />
                    </video>
                </div>
            </WindowLayout>
        );
    }
}
