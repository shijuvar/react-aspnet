#react-aspnet

Demo app built with React and ASP.NET Web API. 
A minimalist implmentation of Flux architetcure is included in this version. An enhanced version of Flux is coming.

## Building the App

      
1. To build the Web API project, open the solution in Visual Studio 2013, and build the solution to install Nuget packages. This will automatically restore Nuget packages. 
2. To change the API url in the Web app (Client app built with React), modify the config.js file at /ResourceMetadata.Web/Scripts/config.js. 
3. If you haven't installed Node.js, download and install it from http://nodejs.org/
4. Navigate to the directory of ResourceMetadata.Web project in command prompt and run command **npm install**
5. As a workaround to conflict between jquery-ui-browserify and jquery-browserify, update the statement 
   **$ = require('jquery')** in file ResourceMetadata.Web/node-modules/jquery-ui-browserify/index.js 
   to **$=require('jquery-browserify')**. 
5. Execute gulp tasks
    1. Run commands **gulp react** then **gulp browserify**.
    2. In order to clean the destination files created by build task, run **gulp clean**.

