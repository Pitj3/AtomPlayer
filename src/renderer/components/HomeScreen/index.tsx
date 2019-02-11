import React from "react";
import path from "path";

// Styles
import "./styles.less";
import WindowLayout from "../WindowLayout";
import { Button, Paper } from "@material-ui/core";
import { AppScreens } from "../../types/AppScreens";
import { EventManager } from "../../utils/EventManager";
import ItemInfo from "../../types/ItemInfo";
import MediaItem from "./components/MediaItem";

import sqlite3 from "sqlite3";

declare var __static;

interface Props {
}

interface State {
    items: ItemInfo[];
}

export default class HomeScreen extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            items: null
        };
    }

    componentWillMount() {
        setTimeout(() => {
            const pathToAsset = path.join(__static, "/assets");

            let db = new sqlite3.Database(pathToAsset + '/movies.db', (err) => {
                if(err) {
                    alert(err);
                }
                console.log('Connected to database');
            });

            let items: ItemInfo[] = [];

            db.each("SELECT * FROM movies", function(err, row) {
                items.push({
                    id: row.id,
                    name: row.name,
                    description: row.description,
                    imagePath: row.coverimage,
					captionsPath: row.subpath,
                    path: row.videopath,
                    type: row.type
                });
              });

            this.setState({
                items: items
            })
        }, 10);
    }

    componentWillUnmount() {

    }

    onSelect = (id: number) => async (event) => {
        const selectedItem = this.state.items.find((item) => item.id === id);

        if (selectedItem == null)
            return;

        await EventManager.dispatchAsync("navigate", {
            screen: AppScreens.Info,
            screenData: selectedItem
        });
    }

    renderItems() {
        const {items} = this.state;

        if (items == null || items.length === 0)
            return null;

        return items.map((item: ItemInfo, index: number) => {
            return <MediaItem key={"media-item-" + index} item={item} onSelect={this.onSelect(item.id)} />;
        });
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
