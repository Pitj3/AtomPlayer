import React from 'react';

// Components
import { TouchApp } from '@material-ui/icons';

// Styles
import './styles.less';

const remote = require('electron').remote;

interface Props {
}

interface State {
    isMaximized: boolean;
}

export default class WindowLayout extends React.Component<Props, State> {
    private appWindow = remote.getCurrentWindow();

    constructor(props) {
        super(props);

        this.state = {
            isMaximized: this.appWindow.isMaximized()
        };
    }

    componentWillMount() {
        this.appWindow.on("maximize", this.checkMaximized);
        this.appWindow.on('unmaximize', this.checkMaximized);

        setImmediate(() => {
            this.checkMaximized();
        });
    }

    componentWillUnmount() {

    }
    
    onMinimizeClick = (event) => {
        this.appWindow.minimize();
    }

    onMaximizeClick = (event) => {
        this.appWindow.maximize();
        this.checkMaximized();
    }

    onRestoreClick = (event) => {
        this.appWindow.unmaximize();
        this.checkMaximized();
    }

    onCloseClick = (event) => {
        this.appWindow.close();
    }

    checkMaximized() {
        this.setState({
            isMaximized: this.appWindow.isMaximized()
        });
    }

    render() {
        const isMaximized = this.state.isMaximized;

        return (
            <div className="window-layout">
                <header id="titlebar">
                    <div id="drag-region">
                        <div id="window-title">
                            <span>Atom Player</span>
                        </div>
                        <div id="window-controls">
                            <div className="button" id="min-button" onClick={this.onMinimizeClick}>
                                <span>&#xE921;</span>
                            </div>

                            {(isMaximized ?
                                <div className="button" id="restore-button" onClick={this.onRestoreClick}>
                                    <span>&#xE923;</span>
                                </div>
                            :
                                <div className="button" id="max-button" onClick={this.onMaximizeClick}>
                                    <span>&#xE922;</span>
                                </div>
                            )}                            
                            
                            <div className="button" id="close-button" onClick={this.onCloseClick}>
                                <span>&#xE8BB;</span>
                            </div>
                        </div>
                    </div>
                </header>
                <div id="main">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
