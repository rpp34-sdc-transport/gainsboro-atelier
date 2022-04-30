import React from 'react';

export const withAnalytics = (Component, widgetName) =>
    class extends React.Component {
        sendAnalytics(e) {
            console.log('e.currentTarget', e.currentTarget);
            console.log('e.currentTarget.className', e.currentTarget.className);
            console.log('widgetName', widgetName);
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
                    <Component {...this.props} />
                </div>
            );
        }
    }