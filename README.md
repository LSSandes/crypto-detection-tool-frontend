# How to start and run the project 
Make sure you have [docker](https://www.docker.com/) installed on your machine. If not, download it from [Here](https://www.docker.com/products/docker-desktop/)  
1. Open [VS code](https://code.visualstudio.com/download) or any of your [favourite IDE](https://www.techrepublic.com/article/best-ide-software/)
2. Clone the project using the following command
 
   ```
   https://github.com/ashishp911/CryptoPilot.git
   ```

4. Then build using the following command
  
    ```
   docker build -t my-react-app .
    ```

6. Run the project using the following command
  
   ```
   docker run -d -p 3001:3000 my-react-app
   ```

8.  Finally, open your favourite browser and go to

    ```
    http://localhost:3001/
    ```
  
# Getting Started with CryptoPilot
## 1. Project file layout
![Crypto project layout2](https://user-images.githubusercontent.com/62334020/232179191-c90b45de-0bd2-4d75-9fbb-50be617889dc.png)

## Create react App 
```
npx create-react-app cryptocurrency
```

## install Material UI
```
npm install @mui/material @mui/system @emotion/react @emotion/styled @mui/styles @mui/lab  
```

## install Axios
```
npm i axios
```

## install React Router DOM

```
npm install react-router-dom
```

## Coingecko API
We are going to use 4 endpoints for this application, you can find all API related data here ->
 [Coingecko API](https://www.coingecko.com/en/api/documentation).
1. TrendingCoins (For carousel)
2. SingleCoin (For single coin data)
3. CoinList (For coin Table)
4. HistoricalChart (For chart data)

### 1. Reseting all css styles to default in app.css
### 2. Importing a font Montserrat from google
```
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;800&display=swap');
```
### 3. in App.js
Using routing in app.js so that we can toggle between homepage and coin_page. Wrap the entire app.js inside ``` <BrowserRouter> </BrowserRouter> ``` tags. Also do not forget to import Routes, Route and BrowserRouter. 
```
import { Routes, Route, BrowserRouter } from "react-router-dom";
``` 
Enclose all the routes of your application between the ```<Routes> </Routes>``` tags. (In our case, homepage and coin_page). 
Header.js will be outside the routes, so that it will be displayed all through the application.

We change the background color of the entire app to ```"#14161a"``` in app.js

## Header.js
We use [Appbar](https://mui.com/material-ui/react-app-bar/) from material UI and Container (it ensures that the appbar is responsive).
The appbar will contain [Typography](https://mui.com/material-ui/react-typography/)(for the title of our application) and a select tag(to select the currency).
Flex : 1 for our typography indicates that the width of all other elements will be the same as their content, but the element with flex: 1 will be given the remaining full space.
We wrap whole header with darkTheme.

## Context API
Since we want the currency and symbol selected through the header for the entire application, we will use context API. We wrap our entire app within ```CryptoContext```, from ```index.js```. We export {currency, symbol, setCurrency}, so that any component can now use these states.

## Homepage
Our homepage is divided into 2 parts, banner (upper part with carousel) and coint table (table with all trending coins.)

### Banner
1. For the banner, we use background image as banner2.
2. Banner has 3 parts, Name of the application (Typography), small description (Typography) and the carousel. I created a different react component for the carousel.
3. All APIs are in ```api.js```
###  Carousel
1. For carousel, we need the trendingCoins() api. This API takes currency as a parameter. We get the currency from context API. 
2. Instead of fetch, I have used axios.get() to fetch data from the API.
3. We use useEffect such that fetchTrendingCoins() function is called for the first time the page is rendered, also we add currency in the dependency list, so that whenever currency changes, fetchTrendingCoins() is called.
4. We use useState to keep the fetched data in a variable called trending. 
5. We use [**react alice carousel**](https://www.npmjs.com/package/react-alice-carousel) for our carousel.
6. installation -->
```
npm i react-alice-carousel
```
7. We use ```<AliceCarousel/>``` to create carousel.
8. We add responsive object in our AliceCarousel, and we have deifned it such that when the page in 0 pixels or more, we display 2 items and if its greater then 512 pixels,  we display 4 items.
9. **Items** in the most important part of AliceCarousel.
10. In items, we use the javaScript **object.map()** function to travese all the coins in trending which we fetched from our API.
11. For the carousel, we add ```<Link></Link>``` tag so that by clicking on the image, we can go to any particular coin.
12. We add ```<img>``` and ```<span></span>``` tags for image, name, price and 24hr change.
example of carousel image is given below
<br />

![Carousel_banner](https://user-images.githubusercontent.com/62334020/232358038-f693aa3b-5912-4fbd-8764-c328201058d0.png)

### Coins Table
1. For coins table, we are going to use coinList api from api.js
2. We again use axios to fetch coin list.
3. With the heading (Typography) and search bar (TextField)
4. Next comes the material UI [**TABLE**](https://mui.com/material-ui/react-table/) which will contain all the coins data like, 
* Coin, 
* Price, 
* 24h Change, 
* Market Cap.
5. For table body, we call ```handleSearch()```, which returns the coin we inputted in TextField.
6. We use slice function to only display 10 coins per page.
7. We also added ```<LinearProgress />``` so that if the coins are not fetched from the API, we will show a progress bar using ```loading``` state. (More on LinearProgress [here](https://mui.com/material-ui/react-progress/))

### Pagination
1. Details about pagination [**here**](https://mui.com/material-ui/react-pagination/)
2. We use pagination to divide the number of pages into the length of handleSearch() divided by 10.
3. We add onChange fucntion so that ```page``` will be set to the page number we clicked. 
4. We also add ```window.scroll(0,450)``` so that on change the window will be shown from the top.

![coins_table](https://user-images.githubusercontent.com/62334020/232358349-ea9d7ebb-1c4f-4bcc-81e1-4161eebbddd8.png)

## Coins page
1. We used useparams to fetch id of coin from URL.
``` 
const { id } = useParams(); 
```
2. We use ```singleCoin(id)``` API to get information of a single coin. 
3. Coinpage is divided into Coin_Info and CoinChart.

### Coin_Info
1. Sidebar(Coin_Info.js) is a component inside CoinPage will have some details about the coin. 
2. I added reponsive styles for this part. If the screensize is less than md, then flexDirection will be column.I did this by using ```useMediaQuery()```.
3. For coin_Info, I added coin image, coin id, description, rank, market cap, 
4. The description of a coin has some html in it, so to remove that, we added ```HTMLReactParser```.
5. Installation
```
npm i html-react-parser
```
6. I made the page responsive by adding different styles for diffent screen sizes using ```useMediaQuery()```.

### CoinChart
1. CoinChart is another component inside CoinPage which will have historic data of the prices of the coin.
2. I used chartJs2 for plotting the chart.
3. Installation
```
npm i react-chartjs-2 chart.js
```
4. Refer [Here](https://github.com/reactchartjs/react-chartjs-2) for chartjs2
5. We used historicalChart API to get the data
6. We have 2 dependencies for the useEffect API here, currency and days which means if currency or days change, the page will re-render.
7. ```historicalData``` will have an array of time and price.
8. We use ```<Line />``` from chartjs 2 for our chart. It will have labels (time) and dataset (price of the coin).

### SelectButton
1. Below the chart, we will add 4 buttons which will give options to show the chart data of 
* 1 Day
* 1 Month
* 3 Months  
* 1 Year.
2. Select Button is a custom component to give styles to the buttons.

![Coin_Info](https://user-images.githubusercontent.com/62334020/232358243-29e91859-8cdb-4021-a28c-2926438d7633.png)


# Firebase Integration
1. Integrated [Firebase](https://medium.com/firebase-developers/what-is-firebase-the-complete-story-abridged-bcc730c5f2c0) with our react application.
2. Installed firebase
   ```
   npm install firebase
   ```
4. Created a [modal](https://mui.com/material-ui/react-modal/) (from material UI) which is a component that  provides a solid foundation for creating dialogs, popovers, lightboxes, or whatever else.
5. Create [tabs](https://mui.com/material-ui/react-tabs/) from material UI to toggle between 1. Login and 2. Signup
6. Created 2 components for login and signup.

## Signup page
1. We used material UI's Box to create a simple signup page with 3 textfields and 1 button.
2. The handlesubmit will be called when user clicks the submit button.
3. This function will first check if password and confirm password are same, if not, it will throw an error using snackbar.
4. Then, i used the ```createUserWithEmailAndPassword()``` function. In Firebase, the ```createUserWithEmailAndPassword()``` function is a method provided by the Firebase Authentication SDK. It is used to create a new user account using an email address and password.
5. This function takes 3 parameters, auth, email and password.
6. Firebase will validate the provided email and password and create a new user account if they meet the required criteria.
7. If the account creation is successful, Firebase will return a user object containing information about the newly created user.
8. Then we show the signup successful alert message using snackbar alert and close the modal using ```handleclose()``` which was taken as props from ```Authmodal```.

<img width="276" alt="image" src="https://github.com/ashishp911/CryptoPilot/assets/62334020/40a89d83-6ed8-4fb2-8fdf-d74f94417b99">


## Login page
1. Again we have used material UI's Box to create the login modal.
2. The ```handleSubmit()``` is similar to that of Signup, the only difference is that instead of using ```createUserWithEmailAndPassword()```, we are using the ```signInWithEmailAndPassword()``` function, which also takes 3 arguments, auth, email and password.
3. Error is thrown if the password is wrong.
Now I added ```onAuthStateChanged()``` to our cryptoContext page to keep a ```user``` state to keep the information of the users that just logged in.

<img width="312" alt="image" src="https://github.com/ashishp911/CryptoPilot/assets/62334020/594491c3-c544-4d17-bc2b-963974227321">


## UserSidebar
1. For the sidebar, we used something called [material UI drawer](https://mui.com/material-ui/react-drawer/) 
2. Inside our sidebar, we have four important things, User image, user display name, wishlist, and a logout button.
3. We use [Avartar](https://mui.com/material-ui/react-avatar/) from material UI for our image and we created a div for our watchlist.
4. Our Avatar will have a onclick function ```toggleDrawer()``` which is used to open/close the drawer.
5. Adding ```overflowY: "scroll"``` to our styles adds a scroller for the watchlist.

### Logout
1. Finally the logout button. 
2. For logout, we use ```signOut()``` from ```firebase/auth```. And then we give the user alert using ```setAlert()```. 

<img width="1128" alt="image" src="https://github.com/ashishp911/CryptoPilot/assets/62334020/50e53463-d3b6-4762-8d20-c70e25656741">

## Adding Google signup
1. In ```AuthModal``` we will add a box(material UI) and add a Google button.
2. We will add a library called react google button.
  ```
npm install react-google-button
```
4. ```GoogleButton``` will hve an onclick function.
5. We added a ```SingnInWithGoogle()``` function.
6. Inside this fucntion there will be ```signInWithPopup()``` which will take googleProvider and auth as parameters and googleProvider has be initialised as below
  
  ```
  const googleProvider = new GoogleAuthProvider();
```

## Creating firestore database
1. Go to firebase and open your project.
2. Go to Firestore Database and click create your database.
3. Select start in test mode.
4. Select a zone
5. Go to rules and add the following rules

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

   	match /watchlist/{userId}{
    allow read: if isLoggedIn(userId)
    allow write: if request.auth.uid == userId
    }
  }
  function isLoggedIn(userId){
  	return request.auth.uid == userId
  }
}
```
6. This means that only authenticated user will have read write access.
7. [Firebase database rules](https://firebase.google.com/docs/database/security)

## Add to watchlist button
There will be a add to watchlist button in the Coin_info.js
1. First take user from cryptoContext and check if user is present.
2. If the user is present, we will show the button to add to watchlist.
3. ```inWatchList``` is a bool variable to check if the coin is already present in the watchlist.
4. If the coin is already present in the watchlist, the button will show ```Remove from watchlist```, else ```Add to watchlist```.
5. We take the reference to our database 
```
const coinRef = doc(db, "watchlist", user?.uid);
```
where doc comes from ```"firebase/firestore";```
7. We use the ```setDoc()``` method to add the coin to watchlist array(present in cryptoContext)
8. ```setAlert``` is added for success and error.

<img width="1128" alt="image" src="https://github.com/ashishp911/CryptoPilot/assets/62334020/b0466bac-a3e4-4b01-9a7c-454343a43550">


## Getting coins on watchlist variable
We need to set watchlist to add coins to our watchlist state, we are going to do that using [onSnapShot](https://firebase.google.com/docs/firestore/query-data/listen) 
1. We will add ```onSnapShot()``` in our cryptoContext using a ```useEffect()``` hook.
2. This ```onSnapShot()``` function will have ```coinRef``` and we will set watchlist like shown below 
```setWatchList(coin.data().coins);``` where ```coin.data().coins``` will have all the coins fetched from firebase.

## Remove from watchlist
For removing coin we have a function ```removeFromWatchlist()```
1. For remove from watchlist, we will use the same ```setDoc()``` method and we will all the coins except the ```coins.id``` coin using ```filter()``` function.
2. Then we will ```{ merge: "true" }```
3. Add the ````setAlert()``` for success and errors.

## Displaying all the coins on user sidebar
1. Now we want to fetch the coins from watchlist array and display it on the ```UserSidebar```
2. So we map through our coins state and if that coin is present in the watchlist variable, we are going to render it in the userSidebar. (```if watchlist.includes(coin.?id) {}```)
3. Then we will display the coin name and price of the coin.
4. We will also have a delete button which i have used from
``` npm i react-icons```
5. Then I am using ```<AiFillDelete>``` as a delete button. This button will have a ```onClick``` which will have this function ```removeFromWatchlist(coin)```.
6. This remove coins function will be similar to the coin in ```CoinInfo.js```.
7. The delete button will remove the coin from the wachlist.

  <img width="1043" alt="image" src="https://github.com/ashishp911/CryptoPilot/assets/62334020/a72a6d84-deaa-4154-bc71-d38427b4e7de">

 
