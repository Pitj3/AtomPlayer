import React from "react";
import path from "path";

import "./styles.less";
import { Card, Typography } from "@material-ui/core";
import ItemInfo from "../../../../types/ItemInfo";

declare var __static;

interface Props {
    item: ItemInfo;
    onSelect?: Function;
}

interface State {
}

export default class MediaItem extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillMount() {

    }

    componentWillUnmount() {

    }

    onSelect = (event) => {
        if (this.props.onSelect != null)
            this.props.onSelect();
    }

    render() {
        let name = "";
        let description = "";
        let imageUrl = "";

        const { item } = this.props;

        if (item != null) {
            name = item.name;
            description = item.description;
            imageUrl = item.imagePath;
        }

        const pathToAsset = path.join(__static, "/assets");

        return (
            <div className="media-item-outter" onClick={this.onSelect}>
                <Card className="media-item-card">
                    <div className="media-item">
                        <div className="thumbnail-outter">
                            <img src={pathToAsset + "/" + (imageUrl != null || imageUrl == "" ? imageUrl : "cosmos.jpg")} />
                        </div>
                        <div className="description">
                            <Typography variant="body2" color="primary">
                                {description}
                            </Typography>
                        </div>
                    </div>
                </Card>
                <div className="media-description">
                    <Typography variant="subtitle2" color="primary">
                        {name}
                    </Typography>
                    <Typography variant="caption" color="secondary">
                        2018
                    </Typography>
                </div>
            </div>
        );
    }
}
