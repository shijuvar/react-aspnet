/**@jsx React.DOM*/

var React = require('react');
var Router = require('react-router-component'); 
var $ = require('jquery-browserify');

var Select2 = require('./Select2');
var RequiredTextbox = require('./RequiredTextbox');
var RequiredTextArea = require('./RequiredTextArea');

var ResourceForm = React.createClass({displayName: 'ResourceForm',
    componentDidMount: function(){ 
        $("#location").select2();
        $("#priority").select2();
    },
    componentWillMount: function(){

    },
    componentWillUnmount: function(){        
      
    },
    onSubmit: function(){

        var name = this.refs.name.getDOMNode().value;
        var desc = this.refs.description.getDOMNode().value;
        var location = this.refs.location.getDOMNode().value;
        var path = this.refs.path.getDOMNode().value;
        var priority = this.refs.priority.getDOMNode().value;
        var id = this.props && this.props.resource && this.props.resource.Id;

        if (!name || !desc || !location || !path || !priority) {
            return false;
        } 

        this.props.handleSubmit({Id : id,Name: name, Description: desc, Priority: priority, Path: path,LocationId: location});
        return false;
    },
    render: function () {

        var Link = Router.Link;

        var requiredSpanStyle ={
            color:'red'
        };

        var dropDownLabelStyle ={
            marginBottom:10
        };

        var dropdownStyle ={
            width:"100%"
        };

        var name= this.props.resource && this.props.resource.Name;
        var desc = this.props.resource && this.props.resource.Description; 
        var path = this.props.resource && this.props.resource.Path; 
        var location = this.props.resource && this.props.resource.LocationId; 
        var priority = this.props.resource && this.props.resource.Priority; 

        var priorityList = [{text:1, value:1},{text:2, value:2},{text:3, value:3},{text:4, value:4},{text:5, value:5},{text:6, value:6},{text:7, value:7},{text:8, value:8},{text:9, value:9},{text:10, value:10}];


        return React.DOM.form( {name:"resourceform", role:"form", className:"ui secondary small form segment", onSubmit:this.onSubmit}, 
    React.DOM.div( {className:"field"}, 
        React.DOM.label(null, 
            "Name",React.DOM.span( {style:requiredSpanStyle}, "*")
        ),    
        RequiredTextbox( {placeholder:"Name", ref:"name", value:name} )  
    ),React.DOM.div( {className:"ui divider"}),
    React.DOM.div( {className:"field"}, 
        React.DOM.label(null, 
            "Description",React.DOM.span( {style:requiredSpanStyle}, "*")
        ), 
         RequiredTextArea(  {placeholder:"Description", ref:"description", value:desc} )
    ),React.DOM.div( {className:"ui divider"}),
    React.DOM.div( {className:"field", style:dropDownLabelStyle}, 
        React.DOM.label(null, 
            "Location",React.DOM.span( {style:requiredSpanStyle}, "*")
        ),
         Select2( {placeholder:"Location", style:dropdownStyle, ref:"location", valueField:"Id", textField:"Name", data:this.props.locations, value:location} )
    ),React.DOM.div( {className:"ui divider"}),
    React.DOM.div( {className:"field"}, 
        React.DOM.label(null, 
            "Path",React.DOM.span( {style:requiredSpanStyle}, "*")
        ),
        RequiredTextbox( {placeholder:"Path",  ref:"path", value:path}) 
    ),React.DOM.div( {className:"ui divider"}),
    React.DOM.div( {className:"field", style:dropDownLabelStyle}, 
        React.DOM.label(null, 
            "Priority",React.DOM.span( {style:requiredSpanStyle}, "*")
        ),
        Select2( {style:dropdownStyle, placeholder:"Priority", id:"priority", valueField:"value", textField:"text", ref:"priority", data:priorityList, value:priority} )
     
    ),React.DOM.div( {className:"ui divider"}),
    React.DOM.div( {className:"inline field"}, 
        React.DOM.button( {className:"ui blue mini button"}, 
    "Submit"
    ),
        Link( {className:"ui black mini button", href:"/Resources"}, "Cancel")
    )
    )  

    }
});

module.exports = ResourceForm;