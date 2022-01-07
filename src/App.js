import "./App.css";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import moment, { created_at } from "moment";

// #1 npm install axios
// #2 import axios from './axios'
// #3 import useEffect hook
// #4 Make an get request to the github api using axios
// #5 How do we get reference of the input value?
// #6 import useRef and get the ref of the search input
// #7 On click of the search update the user state with the ref
// #8 After finish search functionality how do you map the response into the code?
// #9 Get the theme switcher to work
// #10 Turn reusable sections of the app to components (Finish rest of hw)

function App() {
  const [user, setUser] = useState("octocat"); // octocat, a default id
  const [userData, setUserData] = useState({});

  const date = moment( userData.created_at ).format("MMMM Do YYYY");

  const userRef = useRef("octocat");
  console.log(userRef);
  // will look like {current: undefined} , define useRef by adding a value to line #21
  //   so load with ref = {userRef} in line 60

  // grab the value of the input and setUser to that value

  // call the useErredt hook and make an api call in the useEffect
  useEffect(() => {
    const getuser = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${user}`
        );
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    return getuser();
  }, [user]);

  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <h4>devfinder</h4>
          <div className="darkMode">
            <p id="modeText">DARK</p>
            <img src="./assets/icon-moon.svg" id="dark_btn" alt="" />
          </div>
        </div>

        <div className="search" id="search_container">
          <img src="./assets/icon-search.svg" alt="" />
          <input
            ref={userRef}
            id="input"
            type="text"
            placeholder="Search Github username..."
          />

          <div className="search_btn">
            <button onClick={() => setUser(userRef.current.value)} id="search">
              Search
            </button>
          </div>
        </div>

        <div id="error">
          <p>User not found</p>
        </div>

        <div className="content">
          <div className="profile">
            <div className="profile_frame">
              <img id="avatar" src={userData.avatar_url || './assets/profilePlaceholder.png'} alt="" />
            </div>
          </div>

          <div className="user">
            <div className="user_info">
              <div className="name">
                <h3 id="name"> {userData.name ? userData.name : "This profile has no name"} </h3>

                <div className="username">
                  <p id="login"> {`@${userData.login}`} </p>
                </div>
              </div>

              <div className="date">
                <p id="date">Joined  {date ? userData.date : "This profile has no joined date"}   </p>

                {/* let timestamp = {userData.created_at}
                  moment('timestamp').format('MMMM Do YYYY') */}
              </div>
            </div>

            <div className="bio">
              <p id="bio"> {userData.bio ? userData.bio : "This profile has no bio name"} </p>
            </div>

            <div className="stats_container" id="statistics">
              <div className="stats">
                <p>Repos</p>
                <p id="repo"> {userData.public_repos ? userData.public_repos: "This profile has no respository name"}</p>
              </div>

              <div className="stats">
                <p>Followers</p>
                <p id="followers"> {userData.followers ? userData.followers : "No info"}</p>
              </div>

              <div className="stats">
                <p>Following</p>
                <p id="following">  {userData.following ? userData.following : "No info"}</p>
              </div>
            </div>

            <div className="links_container">
              <div className="left">
                <div className="info">
                  <img src="./assets/icon-location.svg" alt="" />
                  <p id="location"> {userData.location ? userData.location : "No location information"}</p>
                </div>
                <div className="info">
                  <img src="./assets/icon-website.svg" alt="" />
                  <a href="link" id="blog">
                  {userData.blog ? userData.blog : "No blog information"}
                  </a>
                </div>
              </div>

              <div className="right">
                <div className="info">
                  <img src="./assets/icon-twitter.svg" alt="" />
                  <p id="twitter"> {userData.twitter_username ? userData.twitter_username : "No Twitter info "}</p>
                </div>
                <div className="info">
                  <img src="./assets/icon-company.svg" alt="" />
                  <p id="company"> {userData.company ? userData.company : "No company information specified"} </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
