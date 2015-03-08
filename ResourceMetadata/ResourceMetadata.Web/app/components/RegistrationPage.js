/**@jsx React.DOM */

var React = require('react');
var Router = require('react-router-component');

var RequiredEmail = require('app/components/RequiredEmail');
var RequiredTextbox = require('app/components/RequiredTextbox');
var LoadingIndicator = require('app/components/LoadingIndicator');

var AccountStore = require('app/stores/AccountStore');
var AccountActions = require('app/actions/AccountActions');

var RegistrationPage = React.createClass({
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
                return  <div><div className="error-message">
                            {component.state.ErrorMessage}
                        </div>
                        <div className="ui divider"></div>
                    </div>;
            }
            return ;
        }(this);

        var loading = function(component){
            if (component.state.Loading) {
                return <LoadingIndicator /> ;
            }
            return ;
        }(this);

        return <div style={containerStyle}>
        <form role="form" className="ui secondary small form segment" onSubmit={this._onSubmit}>
        <h5 className="ui header">Register</h5>
        <div className="ui divider"></div>
        {error}

        <div className="field">
            <label>
                First Name<span style={requiredSpanStyle}>*</span>
            </label>
         <RequiredTextbox type="text" placeholder="First Name" ref="firstName" />
        </div><div className="ui divider"></div>

        <div className="field">
            <label>
                Last Name<span style={requiredSpanStyle}>*</span>
            </label>
               <RequiredTextbox type="text" placeholder="Last Name" ref="lastName" /> 
        </div><div className="ui divider"></div>

        <div className="field">
            <label>
                Email<span style={requiredSpanStyle}>*</span>
            </label>
          <RequiredEmail id="email" placeholder="Email" ref="email"/>    
        
        </div><div className="ui divider"></div>
        <div className="field">
            <label>
                Password<span style={requiredSpanStyle}>*</span>
            </label>
               <RequiredTextbox type="password" placeholder="Password" ref="password" />
        </div><div className="ui divider"></div>

        <div className="field">
            <label>
                Confirm Password<span style={requiredSpanStyle}>*</span>
            </label>
              <RequiredTextbox type="password" placeholder="Password" ref="confirmpasswrod" />  
        </div><div className="ui divider"></div>

        <div className="inline field">
            <button className="ui blue mini button">
            Register
        </button>
        <a href="/Login">Back to Login</a>
    </div>
    </form>
    </div>

    }

});

module.exports = RegistrationPage;