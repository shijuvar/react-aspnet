/**@jsx React.DOM */

var React = require('react');
var Addons = require('react-addons');

var RequiredEmail = React.createClass({

    getInitialState: function(){
        return {value :''};
    },
    _onChange:function(e){
        var exp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var validEmail = e.target.value && exp.test(e.target.value);
        this.setState({value:e.target.value, valid:validEmail});
    },    
    render: function () {

        var controlClass = Addons.classSet({
            "ng-invalid-required":!this.state.valid,
            "ng-valid-required":this.state.valid
        });

        return this.transferPropsTo(<input type="email" onChange={this._onChange} className={controlClass}  />);
}

});


module.exports = RequiredEmail;

