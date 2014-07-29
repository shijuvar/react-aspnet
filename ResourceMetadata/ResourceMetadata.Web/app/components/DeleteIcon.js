/** @jsx React.DOM */
var React = require('react');

var DeleteIcon = React.createClass({
    propTypes:{
        onClick : React.PropTypes.func
    },
    render: function () {
        var spanStyle={
            cursor:"pointer",
            border: "none",
            margin: "0 0",
            backgroundColor: "transparent",
            color: "black"
        };

        //return(<input type="button" style={spanStyle} value="Delete" onClick={this.props.onClick} />);
        return this.transferPropsTo(<a style={spanStyle} onClick={this.props.onClick}><i className="trash icon"></i></a>);
}
});
//<i className="trash icon"></i>
module.exports = DeleteIcon;