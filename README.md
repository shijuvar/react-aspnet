#react-aspnet v0.5.0

Demo app built with React and ASP.NET Web API. 
A minimalist implmentation of Flux architetcure is included in this version. An enhanced version of Flux is coming.

## Technologies

* ASP.NET Web API
* ReactJS

## Building the App

      
1. To build the Web API project, open the solution in Visual Studio 2013, and build the solution to install Nuget packages. This will automatically restore Nuget packages. 
2. To change the API url in the Web app (Client app built with React), modify the config.js file at /ResourceMetadata.Web/Scripts/config.js. 
3. If you haven't installed Node.js, download and install it from http://nodejs.org/
4. Navigate to the directory of ResourceMetadata.Web project in command prompt and run command **npm install**
5. As a workaround to conflict between jquery-ui-browserify and jquery-browserify, update the statement 
   **$ = require('jquery')** in file ResourceMetadata.Web/node-modules/jquery-ui-browserify/index.js 
   to **$=require('jquery-browserify')**. 
5. Execute gulp tasks
    1. Run commands **gulp build**.
    2. In order to clean the destination files created by build task, run **gulp clean**.



## About the Sample App

The ReactJS app named "ResourceMetadata.Web" lets the users store metadata of the resources (articles, github repositories, files on the local computer etc.) with a priority. Based on the priority, users can follow the resources and add activities against the resources.

The following are the functionalities of the ResourceMetadata:

1. Register user to the application
2. Create locations (eg: github, MyComputer, Artciles ect) for adding resources
3. Add resources against a location
4. Add activities against resources.


## Team
* [Shiju Varghese](https://github.com/shijuvar) - Architect
* [Dileep C.D.](https://github.com/DileepCD) - Lead Developer and Core Committer
