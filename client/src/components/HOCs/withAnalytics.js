import React from 'react';

export const withAnalytics = (Component, widgetName) =>
    class extends React.Component {
        sendAnalytics(e) {
            console.log('e.target', e.target);
            console.log('widgetName', widgetName);
            var element = '';
            if (e.target.className) {
                var seperatorIndex = e.target.className.indexOf('__');
                element = e.target.className.slice(0, seperatorIndex);
                console.log('e.target.className', element);
            } else {
                e.target.childNodes.forEach(node => {
                    console.log('nodeValue', node.nodeValue);
                    element += node.nodeValue
                });
                console.log('childNodes', element);
            }
            fetch('/interactions', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    element,
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