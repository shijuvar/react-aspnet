/** @jsx React.DOM */

var React = require("react");
var EditIconLink = require('app/components/EditIconLink');
var DeleteIcon = require('app/components/DeleteIcon');

var LocationTableRow = React.createClass({
    handleDelete:function(){
        var id= this.props.location.Id;
        this.props.onDelete(id);
    },
    render: function () {

        var iconStyle ={
            width:'4%'
        };

        var location = this.props.location;
        return (<tr><td>{location.Name}</td><td>{location.Description}</td><td style={iconStyle}><EditIconLink href={'/Locations/Edit/'+ location.Id} /></td><td style={iconStyle}><DeleteIcon key={location.Id} onClick={this.handleDelete} /></td></tr>);
        }
});


module.exports = LocationTableRow;