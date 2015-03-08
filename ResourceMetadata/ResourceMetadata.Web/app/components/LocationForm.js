/**@jsx React.DOM */

var React = require('react');
var Router = require('react-router-component');
var RequiredTextbox = require('app/components/RequiredTextbox');
var RequiredTextArea = require('app/components/RequiredTextArea');

var LocationForm = React.createClass({
    
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

        return <form name="locationform" role="form" className="ui secondary small form segment" onSubmit={this._onSubmit}>        
               <div className="field">
                   <label>Name<span style={requiredSpanStyle}>*</span></label>
                    <RequiredTextbox id="name" placeholder="Name" ref="Name" value={name} />                   
               </div>
               <div className="ui divider"></div>
               <div className="field">
                   <label>
                       Description<span style={requiredSpanStyle}>*</span>
                   </label>
                     <RequiredTextArea id="description" placeholder="Description" ref="Description" value={description} />   
               </div>
               <div className="ui divider"></div>
               <div className="inline field">
                   <button className="ui blue mini button">
                       Submit
                   </button>
                   <Link className="ui black mini button" href="/Locations">Cancel</Link>                   
               </div>
           </form>;       
    }

});

module.exports = LocationForm;
