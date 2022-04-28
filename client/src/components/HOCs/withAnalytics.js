import React from 'react';

export const withAnalytics = (Component, widgetName) => 
    class extends React.Component {
        sendAnalytics(e) {
            fetch('/interactions', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    element: e.currentTarget.className,
                    widget: widgetName,
                    time: String(Date.now()),
                }),
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