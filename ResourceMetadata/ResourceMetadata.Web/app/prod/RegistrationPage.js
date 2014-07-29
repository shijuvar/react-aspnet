/**@jsx React.DOM */

var React = require('react');
var Router = require('react-router-component');

var RequiredEmail = require('./RequiredEmail');
var RequiredTextbox = require('./RequiredTextbox');
var LoadingIndicator = require('./LoadingIndicator');

var AccountStore = require('../stores/AccountStore');
var AccountActions = require('../actions/AccountActions');

var RegistrationPage = React.createClass({displayName: 'RegistrationPage',
    mixins:[Router.NavigatableMixin],

    getInitialState:function(){
        return {ErrorMessage:null, Loading:false};
    },
    componentDidMount:function(){
        AccountStore.addSuccessListner(this.onSuccess);
        AccountStore.addFailureListner(this.onFailure);
    },
    componentWillUnmount:function(){
        AccountStore.removeSuccessListner(this.onSuccess);
        AccountStore.removeFailureListner(this.onFailure);
    },
    onSuccess:function(){
        this.navigate("/Home");
    },
    onFailure:function(){
        var error = AccountStore.getErrorState();
        this.setState({ErrorMessage :error.Message, Loading: false});
    },
    _onSubmit:function(){        
        var firstName = this.refs.firstName.getDOMNode().value;
        var lastName = this.refs.lastName.getDOMNode().value;
        var email = this.refs.email.getDOMNode().value;
        var password = this.refs.password.getDOMNode().value;
        var confirmpasswrod = this.refs.confirmpasswrod.getDOMNode().value;

        if (!firstName || !lastName || !email || !password || !confirmpasswrod) {
            return false;
        }
        
        if (password !== confirmpasswrod) {
            this.setState({ErrorMessage :"Passwords do not match"});
            return false;
        }

        if (password && password.length < 6) {
            this.setState({ErrorMessage:"Password should contain atleast 6 characters"});
            return false;
        }

        var payload ={ FirstName:firstName, LastName:lastName,Email:email,Password:password, ConfirmPassword:confirmpasswrod, Action:1  };

        this.setState({Loading:true});

        AccountActions.register(payload);
        return false;
    },
    render: function () {

        var containerStyle ={
            "margin-top":"75px"
        }

        var requiredSpanStyle ={
            "color":"red"
        }


        var error = function(component){
            if (component.state.ErrorMessage) {
                return  React.DOM.div(null, React.DOM.div( {className:"error-message"}, 
                            component.state.ErrorMessage
                        ),
                        React.DOM.div( {className:"ui divider"})
                    );
            }
            return ;
        }(this);

        var loading = function(component){
            if (component.state.Loading) {
                return LoadingIndicator(null ) ;
            }
            return ;
        }(this);

        return React.DOM.div( {style:containerStyle}, 
        React.DOM.form( {role:"form", className:"ui secondary small form segment", onSubmit:this._onSubmit}, 
        React.DOM.h5( {className:"ui header"}, "Register"),
        React.DOM.div( {className:"ui divider"}),
        error,

        React.DOM.div( {className:"field"}, 
            React.DOM.label(null, 
                "First Name",React.DOM.span( {style:requiredSpanStyle}, "*")
            ),
         RequiredTextbox( {type:"text", placeholder:"First Name", ref:"firstName"} )
        ),React.DOM.div( {className:"ui divider"}),

        React.DOM.div( {className:"field"}, 
            React.DOM.label(null, 
                "Last Name",React.DOM.span( {style:requiredSpanStyle}, "*")
            ),
               RequiredTextbox( {type:"text", placeholder:"Last Name", ref:"lastName"} ) 
        ),React.DOM.div( {className:"ui divider"}),

        React.DOM.div( {className:"field"}, 
            React.DOM.label(null, 
                "Email",React.DOM.span( {style:requiredSpanStyle}, "*")
            ),
          RequiredEmail( {id:"email", placeholder:"Email", ref:"email"})    
        
        ),React.DOM.div( {className:"ui divider"}),
        React.DOM.div( {className:"field"}, 
            React.DOM.label(null, 
                "Password",React.DOM.span( {style:requiredSpanStyle}, "*")
            ),
               RequiredTextbox( {type:"password", placeholder:"Password", ref:"password"} )
        ),React.DOM.div( {className:"ui divider"}),

        React.DOM.div( {className:"field"}, 
            React.DOM.label(null, 
                "Confirm Password",React.DOM.span( {style:requiredSpanStyle}, "*")
            ),
              RequiredTextbox( {type:"password", placeholder:"Password", ref:"confirmpasswrod"} )  
        ),React.DOM.div( {className:"ui divider"}),

        React.DOM.div( {className:"inline field"}, 
            React.DOM.button( {className:"ui blue mini button"}, 
            "Register"
        ),
        React.DOM.a( {href:"/Login"}, "Back to Login")
    )
    )
    )

    }

});

module.exports = RegistrationPage;