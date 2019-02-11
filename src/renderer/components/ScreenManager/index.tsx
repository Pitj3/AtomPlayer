import React from "react";
import path from "path";

// Styles
import "./styles.less";
import { AppScreens } from "../../types/AppScreens";
import { EventManager } from "../../utils/EventManager";
import HomeScreen from "../HomeScreen";
import WatchScreen from "../WatchScreen";
import InfoScreen from "../InfoScreen";

declare var __static;

interface Props {
}

interface State {
    isNavigating: boolean;
    activeScreen: AppScreens;
}

export default class ScreenManager extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            isNavigating: false,
			activeScreen: AppScreens.Loading
		};
    }

    componentWillMount() {
        EventManager.addHandler("navigate", this.onNavigate);
    }

    componentWillUnmount() {
        EventManager.removeHandler("navigate", this.onNavigate);
    }
    
    onNavigate = async (event) => {
        if (event.data == null || event.data.screen == null || +event.data.screen < 0) {
            console.error("Invalid AppScreen.");
            return;
        }

        if (this.state.isNavigating) {
            console.warn("Attempting to navigate before a previous navigation has completed. Skipping.");
            return;
        }

        const screen: AppScreens = event.data.screen;

		if (this.state.activeScreen == screen) {
            console.log("The specified screen (" + screen + ") is already active, skipping navigation.");
            return;
        }

        let eventData = {
            currentScreen: this.state.activeScreen,
            nextScreen: screen
        }

        if (!(await EventManager.dispatchAsync("willnavigate", eventData, true))) {
            console.log("Navigate event was cancelled by an event handler.");
            return;
        }

        await this.navigateAsync(screen);
    }
    
    async navigateAsync(screen: AppScreens): Promise<void> {
        await this.setStateAsync({
            isNavigating: true
        });

        try {
            await this.sleepAsync(400);

            let eventData = {
                currentScreen: this.state.activeScreen,
                nextScreen: screen
            }

            await EventManager.dispatchAsync("navigating", eventData, false);

            await this.setStateAsync({
                activeScreen: screen
            });

            await this.sleepAsync(50);

        } catch (error) {
            console.error("An error has occurred while navigating to screen. Error: " + error.message, error);
        } finally {
            await this.setStateAsync({
                isNavigating: false
            });

            await this.sleepAsync(400);
        }
    }

    setStateAsync<K extends keyof State>(stateObj: Pick<State, K>) {
        return new Promise<void>((resolve, reject) => {
            this.setState(stateObj as any, () => {
                resolve();
            });
        });
    }

    sleepAsync(duration: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, duration);
        });
    }

    render() {
        let screen = null;

        switch (this.state.activeScreen) {
            case AppScreens.Loading:
                screen = (
                    <div>
                        &nbsp;
                    </div>
                );
                break;

            case AppScreens.Home:
                screen = <HomeScreen />;
                break;

            case AppScreens.Watch:
                screen = <WatchScreen />;
                break;

            case AppScreens.Info:
                screen = <InfoScreen />;
                break;

            default:
                screen = (
                    <div className="unknown-screen">
                        Unknown Screen
                    </div>
                );
                break;
        }

        return (
            <div className="screen-manager">
                <div className={"please-wait" + (this.state.isNavigating ? " show" : "")}>
                    <div className="please-wait-inner">
                        Please Wait
                    </div>
                </div>

                {screen}
            </div>
        );
    }
}
