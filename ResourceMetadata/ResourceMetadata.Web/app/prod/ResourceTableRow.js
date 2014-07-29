/** @jsx React.DOM */

var React = require("react");
var Router = require('react-router-component');
var EditIconLink = require('./EditIconLink');
var DeleteIcon = require('./DeleteIcon');

var ResourceTableRow = React.createClass({displayName: 'ResourceTableRow',
    handleDelete:function(){
        var id= this.props.resource.Id;
        this.props.onDelete(id);
    },
    render: function () {
        var Link = Router.Link;

        var iconStyle ={
            width:'4%'
        };

        var resource = this.props.resource;
        return (React.DOM.tr(null, React.DOM.td(null, Link(  {href:"/Resources/Details/"+resource.Id}, resource.Name)),React.DOM.td(null, resource.Description),React.DOM.td( {style:iconStyle}, EditIconLink( {href:'/Resources/Edit/'+ resource.Id} )),React.DOM.td( {style:iconStyle}, DeleteIcon( {key:resource.Id, onClick:this.handleDelete} ))));
    }
});


module.exports = ResourceTableRow;