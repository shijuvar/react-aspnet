/** @jsx React.DOM */

var React = require("react");
var Router = require('react-router-component');
var EditIconLink = require('app/components/EditIconLink');
var DeleteIcon = require('app/components/DeleteIcon');

var ResourceTableRow = React.createClass({
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
        return (<tr><td><Link  href={"/Resources/Details/"+resource.Id}>{resource.Name}</Link></td><td>{resource.Description}</td><td style={iconStyle}><EditIconLink href={'/Resources/Edit/'+ resource.Id} /></td><td style={iconStyle}><DeleteIcon key={resource.Id} onClick={this.handleDelete} /></td></tr>);
    }
});


module.exports = ResourceTableRow;