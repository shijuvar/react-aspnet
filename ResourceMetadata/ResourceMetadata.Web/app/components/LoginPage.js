/** @jsx React.DOM*/

var React = require('react');
var Router= require('react-router-component');
var RequiredEmail = require('app/components/RequiredEmail');
var RequiredTextbox = require('app/components/RequiredTextbox');
var LoadingIndicator =  require('app/components/LoadingIndicator');
var AccountActions = require('app/actions/AccountActions');
var AccountStore =  require('app/stores/AccountStore');

var LoginPage = React.createClass({
    mixins:[Router.NavigatableMixin],

    getInitialState:function(){
        return {ErrorMessage:null, Loading:false};
    },
    componentDidMount:function(){
        AccountStore.addSuccessListner(this.onSuccess);
        AccountStore.addFailureListner(this.onError);
    },
    componentWillUnmount:function(){
        AccountStore.removeSuccessListner(this.onSuccess);
        AccountStore.removeFailureListner(this.onError);
    },
    onSuccess:function(){
        this.navigate("/Home");     
    },
    onError: function(){
        var error = AccountStore.getErrorState();
        this.setState({ErrorMessage: error.Message, Loading: false});
    },
    _onSubmit:function(){

        var email = this.refs.Email.getDOMNode().value;
        var password = this.refs.Password.getDOMNode().value

        if (!email || !password) {
            return false;
        }
        
        AccountActions.login({ username: email, password: password, grant_type:"password" });
        
        this.setState({Loading:true});
        return false;

    },
    render: function () {

        var Link = Router.Link;

        var containerStyle ={
            "marginTop":"75px"
        }

        var requiredSpanStyle ={
            "color":"red"
        }

        var error = function(component){
            if (component.state.ErrorMessage) {
                return <div><div className="error-message">
                                       {component.state.ErrorMessage}
                                    </div>
                                    <div className="ui divider"></div>
                                </div>;
            }
            return ;
        }(this);

        var loading = function(component){
            if (component.state.Loading) {
                return <LoadingIndicator />;
            }
            return;
        }(this);       

        return (
           <div style={containerStyle}>
           <form name="loginform" role="form" className="ui secondary small form segment" onSubmit={this._onSubmit}>
            <h5 className="ui header">Login</h5>
            <div className="ui divider"></div> 
{error}
<div className="field">
    <label>
        Email<span style={requiredSpanStyle}>*</span>
    </label>
    <RequiredEmail id="email"  name="email" placeholder="Email" ref="Email"/>              
</div><div className="ui divider"></div>
<div className="field">
    <label>
        Password<span style={requiredSpanStyle}>*</span>
    </label>
    <RequiredTextbox type="password"  id="password" name="password" placeholder="Password" ref="Password" />                
</div><div className="ui divider"></div>
<div className="inline field">   
    <input type="submit"  className="ui blue mini button" value="Login" />
    <Link href="/Register">Register</Link>
</div>
</form>
{loading}
</div>
            );
}

});

module.exports =LoginPage;




