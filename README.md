# Guset_RSVP_app

custom SMS for events arrival confirmation - README
In this project you will be able to send a custom SMS for events arrival confirmation.
We use HTML, Angular, Js.
The project has 3 central pages, each page built from HTML and Angular linked together.
1.	Home page- This screen will display event details and options for arrival confirmation or no confirmation
2.	Coming page- If the user has confirmed arrival, he will get to this screen with a link to Waze for direction planning and Google map to view the event location
3.	Not Coming page-This screen will show user thanks information

Using AWS SNS its sends SMS messages to all the users in the DB. 
The messages contain basic event information and a link (automatically shortened using the bitly service) to a website with all the information about the event. On the website, the guest marks if they are coming or not and the DB is updated
START:

•	Get local environment ready:

1.	Install node
2.	Install nginx
3.	Install mongodb and studio 3t

•	Get EC2 environment ready:

1.	Get EC2 instance on aws
2.	Install latest node/npm
3.	Install latest nginx
4.	Install latest mongo dB and studio 3t

Make it work locally:

Git clone the repository to your local computer.

1.	Studio 3t - connect to a local dB in mongo dB for testing
2.	Run npm install
3.	Make local db
4.	Follow "todo" marks and explanations inside the files to understand them and change it according to your wish, these files need to be change-

(server/routes/users/send_sms.js), (server/config/env.js)

(my-app/src/home/home.html), (my-app/src/home/home.component.ts)

(my-app/src/end/end.html), (my-app/src/end/end.component.ts)

(my-app/src/not/not.html), (my-app/src/not/not.component.ts), (src/app/app.module.ts)

*There is no need to do anything in server.js.

* env.js is local file, you need to make a new one on ec2 and change there the configuration of the file

5.	Do ng serve -o to build the angular project locally
6.	Run server.js
7.	Send test sms by run send_sms.js
8.	Test it locally.


Make it work EC2:

1.	Get a domain
2.	Fix your nginx.conf file to point your domain
3.	Create db in mongo dB
4.	Create list of your guests like this and import it to your db:
a.	name: String
b.	phone: String
c.	number_of_guests: Integer
d.	sms_counter: Integer
5.	Connect studio 3t to your mongo dB on EC2 with pem file.            
6.	Git clone the repository to your EC2 server
7.	Create env.js file in serve/config/ and copy the one from local and then connect it to the dB you created
8.	Create environment.ts file in /src/environments/ and copy the one from local and choose the domain you created
9.	Run npm install
10.	ng build inside my-app folder
11.	Run node server.js
12.	Download forever and connect it to server.js
13.	Send SMS by “node send_sms.js”

** Data base file will print how much users answered to the SMS and how much rsvp there is to the event.

** number_of_guests is initialize to -1 and then it will change to 0-10 according to the answers

** sms_counter is initialize to 0 and then it will add 1  every sms sends to this guest

