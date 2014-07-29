/** @jsx React.DOM */

var React = require('react');

var LoadingIndicator = React.createClass({
    render: function () {  
            return  (<div className="ui active loader">
                                    <div className="ui mini text loader">Loading..</div>
                               </div>);
    }
});

module.exports  = LoadingIndicator;