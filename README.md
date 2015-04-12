CS637-900 : Development Environment Instructions
=====================

MEAN.JS Application using Socket.IO

This is an attempt to build a web application using the MEAN.JS Yeoman generator as the starting point. The stack was then expanded with some GUI modifications, additional DBs and socket.io creating a web application.

This was my first experience with each of the platforms leveraged with MEAN.JS...

M ongoDB, a NoSQL database

E xpress.js, a web applications framework

A ngular.js, a JavaScript MVC framework for web apps

N ode.js, a software platform for scalable server-side and networking applications

For those who do not want to deal with a noobs code, use an existing project such as the [Angular Socket.iO Seed](https://github.com/btford/angular-socket-io-seed) by btford (Brian Ford) as your starting point.

I did this the hard way to attain a basic understanding of socket.io. For those who wish to do the same, I suggest comparing this project against the generated version outlined in the "How initial stack was generated, before modification" section below.

References are listed below. Special thanks for guidance given by Brian Ford, Foysal Ahamed and Smitha Milli for their tutorials and examples. 

## How to start the application

Clone the repository or download ZIP and extract it to a directory.

### Setting up the application for the first time.

   Open shell or command prompt, traverse to {EXTRACTED_DIR}\CS647
   
   Install dependencies using grunt:
   
     npm install

   Provided MongoDB with a location to store databases. Create directory C:\Windows\Temp\MongoDb.

### Running the application.

   Start MongoDB:
   
     mongod.exe --dbpath C:\Windows\Temp\MongoDb

   To run application using grunt:
   
     grunt

### Playing with the application

   Open a web browser to http://localhost:3000
   
   Create an account: Click Sign Up (upper right corner), enter information for your user, Click blue Sign Up button. Application will bring you to the MEAN.JS entry page.
   
   APPLICATION SPECIFIC INSTRUCTIONS TBD
     
   View Database TABLETBD: http://localhost:3000/TABLETBD

## How initial stack was generated, before modification

   Generate application stack using [Yoeman MEAN.JS generator] (http://meanjs.org/generator.html):

     npm install -g generator-meanjs
     
     yo meanjs

   Created models, views and controllers for Room and Message History data using MEAN.JS generator.
   
     yo meanjs:crud-module RoomMessages
     
     yo meanjs:crud-module Rooms

   The stack initially provides a facility to login and view/edit/delete the CRUD records. Facebook, Twitter, and Google+ login strategies are provided.

### Global Prerequisites:

   Install the following globally:
   
   npm: Download installer from http://npmjs.org/
     
   Node.JS: Download installer from http://nodejs.org/
     
   MondoDB: Download installer from http://www.mongodb.org/downloads
     
   Grunt: 

     npm install -g grunt

   Grunt-cli: 

     npm install -g grunt-cli

   Bower:

     npm install -g bower

   Yoeman:

     npm install -g yo

 
### Add socket.io to the application package.json:
 
   Open shell or command prompt, traverse to {EXTRACTED_DIR}\CS647

   socket.io: 

     npm install socket.io --save

   socket.io component for AngularJS : 

     bower install angular-socket-io --save

