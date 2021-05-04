<!-- - filter messages to only show if to and from are corresponding

  - this should be fixed once we refactor to use redux for messages. Currently restricted by firebase queries. Once we get messages in redux, we can pass redux messages to state and filter them to only show with proper to and froms. This is only an issue on the customer portal side of the app mainly because we use the customer email as document id for messages collection. -->

- in admin updates, list users (sort) by most recent message (sent or received)
- sending images
- updating profile
- notifications
- show notification in updates part when a new message is received
- search bar in admin updates
- where to put firebase config and stuff?
  - refactor firebase - Register refactor is only file still using firebase.js
  - install and implement redux
- Firebase security rules
- conditional loading sign on log in and other customer portal spots
- forgot password
- portal styling
- android appearance fix
- geo location for contact us
  - configure location (API key? https://docs.expo.io/versions/latest/sdk/map-view/#deploying-google-maps-to-a-standalone-app)
  - seperate component for Mapview with logic in it
- profile pic
- fix splash screen
