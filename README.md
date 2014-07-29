react-aspnet-demo
=================
Demo app with React and ASP.NET Web API.

## Building the App

      
1. To build the Web API project, open the solution in Visual Studio 2013, and build the solution to install Nuget packages. This will automatically restore Nuget packages. 
2. To change the API url in the Web app (Client app built with React), modify the config.js file at /ResourceMetadata.Web/Scripts/config.js. 
3. If you haven't installed Node.js, download and install it from http://nodejs.org/
4. Navigate to the directory of ResourceMetadata.Web project in command prompt and run command **npm install**
5. Execute gulp tasks
    1. Run command **gulp build**.
    2. In order to clean the destination files created by build task, run **gulp clean**.

