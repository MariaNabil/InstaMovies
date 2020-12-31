# InstaMovies

InstaMovies is an app that runs on both android and ios , it displays movies with their details and it allows users to add movies .
It has two screens .
First screen has two sections .
First section "My Movies" displays the movies add by user .
Second Section "All Movies" displays movies fetched from this api : http://api.themoviedb.org/3/discover/movie?api_key=acea91d2bff1c53e6604e4985b6989e2 , you can press on any item in the list to show the details of the movie in a Modal .
Second screen "Add Movies" allows user to add new Movies by adding poster, title, overview, and release date .

# Installation

For android :

- After Cloning the repository run yarn install
- then run the application : npx react-native run-android

For ios :

- After Cloning the repository run yarn install
- then cd ios and pod install
- then run the application : npx react-native run-ios

# Important Libraries

- axios : used for HTTP requests https://github.com/axios/axios
- react-native-fast-image : used to display images and handles image caching https://github.com/DylanVann/react-native-fast-image
- react-native-image-picker : used to select a photo from the device library https://github.com/react-native-image-picker/react-native-image-picker
- react-native-modal : used to show Modal component and add animations and styles customization options https://github.com/react-native-modal/react-native-modal
- react-native-modal-datetime-picker : used to show date-picker inside a modal https://github.com/mmazzarolo/react-native-modal-datetime-picker
- react-native-simple-toast : used to show toast https://github.com/xgfe/react-native-simple-toast
- @react-native-community/netinfo : used to check the Internet Connection https://github.com/react-native-netinfo/react-native-netinfo

# Notes :

- I used mvc pattern for Add Movie Screen .
- most screens are functional components .
- I used global to add new movies in My Movies .
- I added two tests using jest .
