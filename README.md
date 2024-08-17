## Blossom
### Cultivating Change through Compassion
<h5><a href="https://blossom-web-v1.vercel.app/about" target="_blank">Find out more</a></h5>

`Pages`
<ul>
<li><a href="#Landing">Landing</a></li>
<li><a href="#Register">Register/Login</a></li>
<li><a href="#HomePage">Home Page</a></li>
<li><a href="#Create">Create Fundraise/Event</a></li>
<li><a href="#Details">Fundraise/Event Details</a></li>
<li><a href="#Events">Events</a></li>
<li><a href="#Feeds">Feeds</a></li>
<li><a href="#UserProfile">User Profile</a></li>


`Directory Structure`
.
├── client/
│   ├── node_modules
│   ├── src/
│   │   ├── assets
│   │   ├── components
│   │   ├── config
│   │   ├── data
│   │   ├── hooks
│   │   ├── pages
│   │   ├── utils
│   │   ├── App.jsx
│   │   ├── App.scss
│   │   ├── index.jsx
│   │   └── *
│   ├── public
│   ├── Dockerfile
│   ├── index.html
│   ├── .dockerignore
│   ├── .env
│   ├── .gitignore
│   └── *
├── server/
│   ├── __tests__
│   ├── config
│   ├── controllers
│   ├── cronjobs
│   ├── events
│   ├── helpers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── services
│   ├── templates
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── server.js
│   └── *
├── docker-compose.yaml
├── LICENSE
└── README.md

<div id="Landing">
<h3>Landing</h3>
The introductory page featuring an overview of the platform and key features.
</div>

<div id="Register">
<h3>Register and Login</h3>
The page where users can sign up for an account by providing their details or login if they already have an account.
</div>

<div id="HomePage">
<h3>Home Page</h3>
The main dashboard displaying the available fundraises, profile card, recommended profiles, and navigation options.
</div>

<div id="Create">
<h3>Create Fundraise and Event</h3>
For initiating the creation of a fundraising campaign or events
</div>

<div id="Details">
<h3>Details of Fundraise and Event</h3>
A detailed view page for individual fundraises or events, providing comprehensive information and updates. Fundraise page gives a donation option to redirect to Stripe Checkout and Payment Verification. The receipt for successful transaction is sent to user's email address along with a follow up.
</div>

<div id="Events">
<h3>Events Page</h3>
A page showcasing a list of upcoming and past events with details and attending options and other attendees.
</div>

<div id="Feeds">
<h3>Feeds Page</h3>
A real-time stream of updates, posts, and interactions from other users and events.
</div>


<div id="UserProfile">
<h3>User Profile</h3>
A profile page displaying personal information, public details, and statistics of user activities.
</div>