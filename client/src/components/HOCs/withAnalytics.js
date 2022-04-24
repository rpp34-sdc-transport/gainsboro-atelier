import React from 'react';

export const withAnalytics = (Component, widgetName) => 
    class extends React.Component {
        sendAnalytics(e) {
            fetch('/interactions', {
                method: "POST",
                body: {
                    element: e.currentTarget.className,
                    widget: widgetName,
                    time: Date.now(),
                }
            })
        }

        render() {
            return (
                <div onClick={this.sendAnalytics}>
                    <Component {...this.props}/>
                </div>
            );
        }
    }