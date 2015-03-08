/** @jsx React.DOM*/

var React = require('react');
var Router = require('react-router-component');
var NavLink =require('app/components/NavLink');
var AccountStore = require("app/stores/AccountStore");
var AccountActions = require('app/actions/AccountActions');

var Header = React.createClass({
    mixins:[Router.NavigatableMixin],

    handleLogout:function(){
        AccountActions.logOut();
    },
    onChange:function(){
        var accountState = AccountStore.getState();
        if (!accountState.Error) {
            this.navigate("/Login");
            return;
        }
    },
    componentDidMount:function(){
        AccountStore.addChangeListner(this.onChange);
    },
    componentWillUnmount:function(){
        AccountStore.removeChangeListner(this.onChange);
    },
    render: function () {

        var cursorStyle ={
            cursor:"pointer"
        };

        return (<div className="ui small inverted menu">        
        <NavLink value="Home" href="/Home" />
        <NavLink value="Resources" href="/Resources" />
        <NavLink value="Locations" href="/Locations" />
        <NavLink value="About" href="/About" />
        <div style={cursorStyle} className="right menu">        
            <a className="item" onClick={this.handleLogout}>Logout</a>
        </div>
    </div>);
    }
});

module.exports = Header;