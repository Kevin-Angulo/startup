# DASH LINK

- [X] Proper use of Markdown
- [X] A concise and compelling elevator pitch
- [X] Description of key features
- [X] Description of how you will use each technology
- [X] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Dash Link enables users to create shareable feedback links, allowing users to collect feedback effortlessly.
Users can manage all feedback in a single dashboard with real-time notifications and daily summaries.

### Design

![Home Page image](dashLink-mockup-01.jpg)
![Main Dashboard image](dashLink-mockup-03.jpg)
![Shareable Link "Customer View" image](dashLink-mockup-02.jpg)

Here is an idea of how users will interact with the website.

```mermaid
sequenceDiagram
  actor User as User
  participant DL as Dash Link
  participant SL as Shareable Link
  actor Customer as Customer
  User ->> DL: Authenticate User
  DL ->> SL: Create Feedback Link
  Customer ->> SL: Post Feedback via Link
  SL ->> DL: Receive Feedback Post from Link
  DL ->> User: Notify of New Feedback
  User ->> DL: Manage Feedback (View, Delete, Contact Customer)
```
>I learned how to use mermaid! I think i turned out good 😎

### Key features

- Authenticated User Sign-In
- Feedback Shareable link Creation
- Unique Feedback Form tied to created Shareable Link (allows those with shareable link to post feedback)
- User Dashboard to view and "mark as read" feedback posts.
- Real-Time Notifications in Dashboard View (new feedback post notifications)
- Daily Email Summary of new feedback posts made
- CAPTCHA Spam protection for feedback posts

### Technologies

I am going to use the required technologies in the following ways...

- **HTML** - Website Skelton of visual structure of headers, buttons, and text of all pages of website.
- **CSS** - Desgin and Style of website such as fonts size & style, color scheme, animations, ect.
- **React** - Responsable for user interaction with all buttons, updating view with ceratin app states, allows for dynamic data to be show to user.
- **Web Service** - API integration with email provider to send daily notification emails. Google CAPTCHA API to secure forms from spam.
- **DB/Login** - Database will store user's sharable links and feedback posts. Authentcation will only allow authenicated users to use the service of creating shareblae links. 
- **WebSocket** - Live notifications for when a new feedback post is made the user will be prompted that a new post was made. 