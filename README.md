<!-- - filter messages to only show if to and from are corresponding

  - this should be fixed once we refactor to use redux for messages. Currently restricted by firebase queries. Once we get messages in redux, we can pass redux messages to state and filter them to only show with proper to and froms. This is only an issue on the customer portal side of the app mainly because we use the customer email as document id for messages collection. -->

<!-- - in admin updates, list users (sort) by most recent message (sent or received)
  - instead, this is listed by most recent user created -->

<!-- Refactor everything in updates tab to work in chats tab.

- refactor firestore messages to have an image url key (see firestore for reference)
- be able to see the text and image in the text field on adminchats
- conditionially render an image in chat section if there is an image URl -->

<!-- - Push notifications -->

- where to put firebase config and stuff?

  <!-- - refactor firebase - Register refactor is only file still using firebase.js -->

- Firebase security rules

- forgot password

- portal

  - play/ upload videos
      <!-- - use redux, read field in msg t or f value, send to redux, when chat screen is open make true -->
    <!-- - message time -->
    <!-- - take a pick to send (not just choose from camera roll) -->

- profile pic
  <!-- - save default pic to assests or in firebase storage -->
  <!-- - change hard code default pro pic -->
  <!-- - auto save default pic in registration -->
  - delete old pic when profile pic updated
  <!-- - need to get Download URL of avatar from fire storage -->
- fix splash screen

DO BEFORE FRIDAY:

<!-- - style profile page -->

- update profile pic in profile page

- conditional loading sign on log in and other customer portal spots
  - just do it on pics for now so it looks better
- search bar in admin updates
- expand message picture onPress
<!-- - android appearance fix -->

- show notification icon when a new message is received or update is posted

  - can't use redux because it shows red dot for all users, need component state on custom list item.
  - new message puts chat at top

  For this to work I need to get each chats messages ion the chats screen and see if the last message toRead value is false, if it is show red dot and push to the top of the chats?

- geo location for contact us
  - configure location (API key? https://docs.expo.io/versions/latest/sdk/map-view/#deploying-google-maps-to-a-standalone-app)
  - seperate component for Mapview with logic in it
