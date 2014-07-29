/**@jsx React.DOM */

var React = require('react');
var Router = require('react-router-component');
var RequiredTextbox = require('./RequiredTextbox');
var RequiredTextArea = require('./RequiredTextArea');

var LocationForm = React.createClass({displayName: 'LocationForm',
    
    _onSubmit:function(){
        var name = this.refs.Name.getDOMNode().value;
        var description =  this.refs.Description.getDOMNode().value;

        if (!name || !description) {
            return false;
        }

        this.props.handleSubmit({ Name: name,Description:description});
        return false;
    },
    getDefaultProps:function(){
        return ({location:null});
    },
    render: function () { 

        var requiredSpanStyle ={
            "color":"Red"
        };

        var Link = Router.Link;

        var name = this.props.location && this.props.location.Name;
        var description = this.props.location && this.props.location.Description;

        return React.DOM.form( {name:"locationform", role:"form", className:"ui secondary small form segment", onSubmit:this._onSubmit},         
               React.DOM.div( {className:"field"}, 
                   React.DOM.label(null, "Name",React.DOM.span( {style:requiredSpanStyle}, "*")),
                    RequiredTextbox( {id:"name", placeholder:"Name", ref:"Name", value:name} )                   
               ),
               React.DOM.div( {className:"ui divider"}),
               React.DOM.div( {className:"field"}, 
                   React.DOM.label(null, 
                       "Description",React.DOM.span( {style:requiredSpanStyle}, "*")
                   ),
                     RequiredTextArea( {id:"description", placeholder:"Description", ref:"Description", value:description} )   
               ),
               React.DOM.div( {className:"ui divider"}),
               React.DOM.div( {className:"inline field"}, 
                   React.DOM.button( {className:"ui blue mini button"}, 
                       "Submit"
                   ),
                   Link( {className:"ui black mini button", href:"/Locations"}, "Cancel")                   
               )
           );       
    }

});

module.exports = LocationForm;
