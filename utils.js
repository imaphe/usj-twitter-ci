  /* Gets the video Url with the best quality.
     This is necessary because tweets include multiple
     video urls with different qualities */
  var getBestVideo = function(mediaVariants) {
    var mp4Videos = getMp4Videos(mediaVariants);
    var max = null;
    if (mp4Videos.length !== 0) {
      if (mp4Videos.length === 1) {
        max = mp4Videos[0].url;
      } else {
        max = mp4Videos.reduce(function(prev, current) {
          // The higher bitrate, the better quality
          if (((!isNaN(current.bitrate)) &&
              (+current.bitrate > +prev.bitrate)) ||
              isNaN(prev.bitrate)){
            return current.url;
          } else {
            return prev.url;
          }
        });
      }
    }
    return max;
  }

  /* Gets the videos with mp4 format from the available ones.
     We need this helper because not all the videos are in
     mp4 and non-mp4 are not playable */
  var getMp4Videos = function(videos) {
    return videos.filter(function(video) {
      if (video.content_type == 'video/mp4') {
        return true;
      } else {
        return false;
      }
    });
  }

  /* Checks if a tweet has a proper video that can be played */
  var hasVideo = function(tweet) {
    if (hasExtendedEntities(tweet) &&
      hasMedia(tweet) &&
      hasVideoInfo(tweet)) {
      return true;
    } else {
      return false;
    }
  }

  /* Checks if the tweet has a extended_entities field where video
     information should be present */
  var hasExtendedEntities = function(t) {
    return (t.extended_entities ? true : false)
  }

  /* Checks if the tweet has a extended_entities.media[0] field
      where video details should be present */
  var hasMedia = function(t) {
    return ((t.extended_entities.media && t.extended_entities.media[0]) ? true : false)
  }

  /* Checks if the tweet has a extended_entities.media[0].video_info field
      where video info should be present */
  var hasVideoInfo = function(t) {
    return (t.extended_entities.media[0].video_info ? true : false)
  }
