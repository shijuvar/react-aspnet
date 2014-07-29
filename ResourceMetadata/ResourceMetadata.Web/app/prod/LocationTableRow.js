/** @jsx React.DOM */

var React = require("react");
var EditIconLink = require('./EditIconLink');
var DeleteIcon = require('./DeleteIcon');

var LocationTableRow = React.createClass({displayName: 'LocationTableRow',
    handleDelete:function(){
        var id= this.props.location.Id;
        this.props.onDelete(id);
    },
    render: function () {

        var iconStyle ={
            width:'4%'
        };

        var location = this.props.location;
        return (React.DOM.tr(null, React.DOM.td(null, location.Name),React.DOM.td(null, location.Description),React.DOM.td( {style:iconStyle}, EditIconLink( {href:'/Locations/Edit/'+ location.Id} )),React.DOM.td( {style:iconStyle}, DeleteIcon( {key:location.Id, onClick:this.handleDelete} ))));
        }
});


module.exports = LocationTableRow;