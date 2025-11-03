# Blossom
This project is a platform for fundraising, charity, organizing events. It also enhances user engagement by incorporating essential social media features such as follow/unfollow, public profiles, liking and bookmarking content. A demo stripe checkout page has been created to mimic real life online transaction. It has 3 tier architecture consisting of client, server and a database.

## Live Link - [Click here](https://blossom-web-v1.vercel.app)

### Tech Stack
![html](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![sass](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![js](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![mongodb](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34)


## Cultivating Change through Compassion
![Home1](https://github.com/user-attachments/assets/5cd49e3d-206d-407e-adfc-d4d17b1ced37)


`Pages`
<!-- <ul>
<li><a href="#Landing">Landing</a></li>
<li><a href="#Register">Register/Login</a></li>
<li><a href="#HomePage">Home Page</a></li>
<li><a href="#Create">Create Fundraise/Event</a></li>
<li><a href="#Details">Fundraise/Event Details</a></li>
<li><a href="#Events">Events</a></li>
<li><a href="#Feeds">Feeds</a></li>
<li><a href="#UserProfile">User Profile</a></li>
</ul> -->

`Directory Structure`
```md
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
```

<h3>User Workflow Diagram</h3>
<img width="3216" alt="blossom workflow" src="https://github.com/user-attachments/assets/3788b590-597a-4782-af23-849837194c54">

<!--
<div id="Landing">
<h3>Landing</h3>
  
![Home1](https://github.com/user-attachments/assets/5cd49e3d-206d-407e-adfc-d4d17b1ced37)
  
![Home2](https://github.com/user-attachments/assets/6ee203a4-ec12-44ec-be78-138a53c7c2b5)

![Home3](https://github.com/user-attachments/assets/4223b697-8977-4148-8951-9ef311bcbedd)

The introductory page featuring an overview of the platform and key features.
</div>

<div id="Register">
<h3>Register and Login</h3>
  
![Reg1](https://github.com/user-attachments/assets/0a1651bc-2cf9-488e-8ba4-2c8e5d9bbfc4)
  
![Reg2](https://github.com/user-attachments/assets/9ff90eb2-7988-413b-9139-5504c5d6be07)
The page where users can sign up for an account by providing their details or login if they already have an account.
</div>

<div id="HomePage">
<h3>Home Page</h3>
  
![Fundlist](https://github.com/user-attachments/assets/251b66c3-cdc3-4dad-af63-98c35abc99d1)

The main dashboard displaying the available fundraises, profile card, recommended profiles, and navigation options.
</div>

<div id="Create">
<h3>Create Fundraise and Event</h3>
  
![Create1](https://github.com/user-attachments/assets/33519583-4d5c-4177-991c-dce72da964f6)

![Create2](https://github.com/user-attachments/assets/bb51a93f-9901-4c03-a25b-146d90932821)

For initiating the creation of a fundraising campaign or events
</div>

<div id="Details">
<h3>Details of Fundraise and Event</h3>
  
![Fund](https://github.com/user-attachments/assets/ea2d7374-80ce-450c-95a4-1e67bf8a1517)

![Event](https://github.com/user-attachments/assets/c2cc8fa4-9410-4622-b9ce-ed1fc417a4c5)

A detailed view page for individual fundraises or events, providing comprehensive information and updates. Fundraise page gives a donation option to redirect to Stripe Checkout and Payment Verification. The receipt for successful transaction is sent to user's email address along with a follow up.
</div>

<div id="Events">
<h3>Events Page</h3>
  
![Events](https://github.com/user-attachments/assets/ccce0a9f-63a2-41dc-aa2e-4fd6dc01f57a)

A page showcasing a list of upcoming and past events with details and attending options and other attendees.
</div>

<div id="Feeds">
<h3>Feeds Page</h3>
  
![Feeds](https://github.com/user-attachments/assets/71f7c1a9-534e-491a-b0fe-1ceb54bfb14c)

A real-time stream of updates, posts, and interactions from other users and events.
</div>


<div id="UserProfile">
<h3>User Profile</h3>

![Profile1](https://github.com/user-attachments/assets/5a6310ce-ddfc-42b7-b91f-850f6005b655)

![Profile11](https://github.com/user-attachments/assets/a625970f-6c80-4a71-91c2-99082c75e5c9)

![Profile2](https://github.com/user-attachments/assets/85347a26-3d68-4d71-9458-161c05f46696) -->

A profile page displaying personal information, public details, and statistics of user activities.
</div>

Author : Suman Roy
Built with ❤️
