<!-- - filter messages to only show if to and from are corresponding

  - this should be fixed once we refactor to use redux for messages. Currently restricted by firebase queries. Once we get messages in redux, we can pass redux messages to state and filter them to only show with proper to and froms. This is only an issue on the customer portal side of the app mainly because we use the customer email as document id for messages collection. -->

<!-- - in admin updates, list users (sort) by most recent message (sent or received)
  - instead, this is listed by most recent user created -->

<!-- Refactor everything in updates tab to work in chats tab.

- refactor firestore messages to have an image url key (see firestore for reference)
- be able to see the text and image in the text field on adminchats
- conditionially render an image in chat section if there is an image URl -->

<!-- - Push notifications -->

- search bar in admin updates

- where to put firebase config and stuff?

  - refactor firebase - Register refactor is only file still using firebase.js

- Firebase security rules

- conditional loading sign on log in and other customer portal spots

- forgot password

- portal

  - message time
  - take a pick to send (not just choose from camera roll)
  - show notification icon when a new message is received or update is posted
  - expand message picture onPress

- android appearance fix

- geo location for contact us

  - configure location (API key? https://docs.expo.io/versions/latest/sdk/map-view/#deploying-google-maps-to-a-standalone-app)
  - seperate component for Mapview with logic in it

- profile pic
  <!-- - save default pic to assests or in firebase storage -->
  <!-- - change hard code default pro pic -->
  <!-- - auto save default pic in registration -->
  - update profile pic in profile page
  - delete old pic when profile pic updated
  <!-- - need to get Download URL of avatar from fire storage -->
- fix splash screen
