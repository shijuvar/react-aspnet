using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using ResourceMetadata.Model;

namespace ResourceMetadata.API.Providers
{
    public class ApplicationOAuthProvider : OAuthAuthorizationServerProvider
    {
        private readonly string _publicClientId;
        private readonly Func<UserManager<ApplicationUser>> userManagerFactory;
        private readonly RoleManager<IdentityRole> roleManager;

        public ApplicationOAuthProvider(string publicClientId, Func<UserManager<ApplicationUser>> userManagerFactory, RoleManager<IdentityRole> roleManager)
        {
            if (publicClientId == null)
            {
                throw new ArgumentNullException("publicClientId");
            }

            if (userManagerFactory == null)
            {
                throw new ArgumentNullException("userManagerFactory");
            }

            if (roleManager == null)
            {
                throw new ArgumentNullException("roleManager");
            }

            _publicClientId = publicClientId;
            this.userManagerFactory = userManagerFactory;
            this.roleManager = roleManager;
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            try
            {
                using (UserManager<ApplicationUser> userManager = userManagerFactory())
                {
                    ApplicationUser user = await userManager.FindAsync(context.UserName, context.Password);

                    if (user == null)
                    {
                        context.SetError("invalid_grant", "The user name or password is incorrect.");
                        return;
                    }

                    ClaimsIdentity oAuthIdentity = await userManager.CreateIdentityAsync(user,
                        context.Options.AuthenticationType);
                    ClaimsIdentity cookiesIdentity = await userManager.CreateIdentityAsync(user,
                        CookieAuthenticationDefaults.AuthenticationType);

                    var roleName = await GetRoleName(user.Roles.First().RoleId);

                    AuthenticationProperties properties = CreateProperties(user.UserName, roleName);
                    AuthenticationTicket ticket = new AuthenticationTicket(oAuthIdentity, properties);
                    context.Validated(ticket);
                    context.Request.Context.Authentication.SignIn(cookiesIdentity);
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }


        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            return Task.FromResult<object>(null);
        }

        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            // Resource owner password credentials does not provide a client ID.
            if (context.ClientId == null)
            {
                context.Validated();
            }

            return Task.FromResult<object>(null);
        }

        public override Task ValidateClientRedirectUri(OAuthValidateClientRedirectUriContext context)
        {
            if (context.ClientId == _publicClientId)
            {
                Uri expectedRootUri = new Uri(context.Request.Uri, "/");

                if (expectedRootUri.AbsoluteUri == context.RedirectUri)
                {
                    context.Validated();
                }
            }

            return Task.FromResult<object>(null);
        }

        public static AuthenticationProperties CreateProperties(string userName, string role)
        {
            IDictionary<string, string> data = new Dictionary<string, string>
            {
                { "userName", userName },
                {"role", role}
            };
            return new AuthenticationProperties(data);
        }

        private async Task<string> GetRoleName(string roleId)
        {
            var result = await roleManager.FindByIdAsync(roleId);
            return result.Name;
        }
    }
}