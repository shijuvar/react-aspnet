/** @jsx React.DOM*/

var React = require('react');
var Router= require('react-router-component');
var RequiredEmail = require('./RequiredEmail');
var RequiredTextbox = require('./RequiredTextbox');
var LoadingIndicator =  require('./LoadingIndicator');
var AccountActions = require('../actions/AccountActions');
var AccountStore =  require('../stores/AccountStore');

var LoginPage = React.createClass({displayName: 'LoginPage',
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
            "margin-top":"75px"
        }

        var requiredSpanStyle ={
            "color":"red"
        }

        var error = function(component){
            if (component.state.ErrorMessage) {
                return React.DOM.div(null, React.DOM.div( {className:"error-message"}, 
                                       component.state.ErrorMessage
                                    ),
                                    React.DOM.div( {className:"ui divider"})
                                );
            }
            return ;
        }(this);

        var loading = function(component){
            if (component.state.Loading) {
                return LoadingIndicator(null );
            }
            return;
        }(this);       

        return (
           React.DOM.div( {style:containerStyle}, 
           React.DOM.form( {name:"loginform", role:"form", className:"ui secondary small form segment", onSubmit:this._onSubmit}, 
            React.DOM.h5( {className:"ui header"}, "Login"),
            React.DOM.div( {className:"ui divider"}), 
error,
React.DOM.div( {className:"field"}, 
    React.DOM.label(null, 
        "Email",React.DOM.span( {style:requiredSpanStyle}, "*")
    ),
    RequiredEmail( {id:"email",  name:"email", placeholder:"Email", ref:"Email"})              
),React.DOM.div( {className:"ui divider"}),
React.DOM.div( {className:"field"}, 
    React.DOM.label(null, 
        "Password",React.DOM.span( {style:requiredSpanStyle}, "*")
    ),
    RequiredTextbox( {type:"password",  id:"password", name:"password", placeholder:"Password", ref:"Password"} )                
),React.DOM.div( {className:"ui divider"}),
React.DOM.div( {className:"inline field"},    
    React.DOM.input( {type:"submit",  className:"ui blue mini button", value:"Login"} ),
    Link( {href:"/Register"}, "Register")
)
),
loading
)
            );
}

});

module.exports =LoginPage;




