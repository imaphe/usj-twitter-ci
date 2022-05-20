!(function(global) {

  // Base URL for the "twitter" API
  const TWITTER_BASE_URL = "https://twitter-usj-default-rtdb.europe-west1.firebasedatabase.app/tweets/"
  // Categories to show tweets for
  var CATEGORIES = ["food", "music", "sports", "nfl"];

  // Mark current tweeet and current category of tweets
  var currentTweet = 0;
  var currentCategory = 0;

  // Keep track of the key info from downloaded tweets for selected category
  var tweets = [];

  // DOM Elements, we kept in memory to avoid accessing continuously the DOMTree
  var videoElement = null;
  var screenNameElement = null;
  var textElement = null;
  var createdAtElement = null;
  var mediaUrlElement = null;

  // Initialize the element variables and attach listeners to the video element
  var initElements = function() {
    screenNameElement = document.getElementById('user_screen_name');
    textElement = document.getElementById('text');
    createdAtElement = document.getElementById('created_at');
    mediaUrlElement = document.getElementById('media_url');
    categoryElement = document.getElementById('category');
    videoElement = document.getElementById('video');
    if (videoElement != null) {
      videoElement.onplay = makeInvisible;
      videoElement.onpause = makeVisible;
      videoElement.onended = makeVisible;
    }
  }

  /* Get the tweets for a given category literal */
  var getCategory = function(category) {
    var tweetsXHR = new XMLHttpRequest();
    tweetsXHR.addEventListener("load", onTweetsReceived);
    tweetsXHR.open("GET", TWITTER_BASE_URL + CATEGORIES[category] + '.json');
    tweetsXHR.send();
  }

  var showCategoryTitle = function(category) {
    categoryElement.innerHTML = category;
  }

  /* Callback to be invoked when tweets for the category are received */
  var onTweetsReceived = function() {
    tweetResponse = JSON.parse(this.responseText);
    // We filter the tweets so we only use the ones with videos
    // and we keep only the basic info from every tweet
    tweets = getTweetsDisplayInfo(getTweetsWithVideos(tweetResponse));
    currentTweet = 0;
    showTweet(tweets[currentTweet]);
  }

  /* Extracts the relevant information amongst the whole twitter info */
  var getTweetsDisplayInfo = function(tweets) {
    return tweets.map(function(t) {
      var tweetDisplayInfo = {};
      tweetDisplayInfo.created_at = t.created_at;
      tweetDisplayInfo.text = t.full_text;
      tweetDisplayInfo.user_screen_name = '@' + t.user.screen_name;
      tweetDisplayInfo.media_url = t.extended_entities.media[0].media_url;
      // We look for the best possible video Url (usually there are many for every video)
      tweetDisplayInfo.video_url = getBestVideo(t.extended_entities.media[0].video_info.variants);
      tweetDisplayInfo.video_resolution = t.extended_entities.media[0].sizes.large;
      return tweetDisplayInfo;
    });
  }

  /* Renders a tweet from the list based on the tweet info stored */
  var showTweet = function(t) {
    pauseVideo();
    showCategoryTitle(CATEGORIES[currentCategory]);
    screenNameElement.innerHTML = t.user_screen_name;
    textElement.innerHTML = t.text;
    createdAtElement.innerHTML = t.created_at;
    mediaUrlElement.style["background-image"] = "url(" + t.media_url + ")";
    videoElement.setAttribute('height', t.video_resolution.h);
    videoElement.setAttribute('width', t.video_resolution.w);
    videoElement.setAttribute('poster', t.media_url);
    videoElement.setAttribute('src', t.video_url);
    makeVisible();
  }

  /* Shows the tweet info when the video is not playing */
  var makeVisible = function() {
    var invisibles = document.getElementsByClassName('invisible');
    for (var i = 0; i < invisibles.length; i++) {
      invisibles[i].classList.add('visible');
      invisibles[i].classList.remove('invisible');
    }
  }

  /* Hides the tweet info when the video is not playing */
  var makeInvisible = function() {
    var visibles = document.getElementsByClassName('visible');
    for (var i = 0; i < visibles.length; i++) {
      visibles[i].classList.add('invisible');
      visibles[i].classList.remove('visible');
    }
  }

  /* Handles the key press event:
     Enter (13): Start/Stop video
     Left (37): Previous tweet
     Right (39): Next tweet
     Down (40): Next category
     Up (38): Previous category */
  var executeAction = function(event) {
    var actions = {
      '37': showPreviousTweet,
      '39': showNextTweet,
      '40': showNextCategory,
      '38': showPreviousCategory,
      '13': onPressOk
    };
    return actions[event.keyCode]();
  }

  /* plays/pauses current video streaming. If there is no video playing, it starts it */
  var onPressOk = function() {
    videoElement.paused ? videoElement.play() : videoElement.pause();
  }

  /* Pauses current video (if not paused)*/
  var pauseVideo = function() {
    if (!videoElement.paused) {
      videoElement.pause();
    }
  }

  /* Shows the previous tweet (if any) */
  var showPreviousTweet = function() {
    if (currentTweet > 0) {
      pauseVideo();
      currentTweet--;
      showTweet(tweets[currentTweet]);
    }
  }

  /* Shows the next tweet (if any) */
  var showNextTweet = function() {
    if (currentTweet < tweets.length - 1) {
      pauseVideo();
      currentTweet++;
      showTweet(tweets[currentTweet]);
    }
  }

  /* Changes the category of tweets to the previous one (if any) */
  var showPreviousCategory = function() {
    if (currentCategory > 0) {
      pauseVideo();
      currentTweet = 0;
      currentCategory--;
      getCategory(currentCategory);
    }
  }

  /* Changes the category of tweets to the next one (if any) */
  var showNextCategory = function() {
    if (currentCategory < CATEGORIES.length - 1) {
      pauseVideo();
      currentTweet = 0;
      currentCategory++;
      getCategory(currentCategory);
    }
  }

  // Upon start we...
  // 1 - Create a listener to init the DOM Elements when loaded
  // 2 - Add the listener for key press events
  // 3 - Request the tweets for the first category (when retrieved the first tweet is shown)
  window.onload = initElements;
  window.onkeydown = executeAction;
  getCategory(currentCategory);

}(this));
