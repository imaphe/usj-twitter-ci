// Test 1 -- PROVIDED
oneMp4 = [{
    content_type: 'application/x-mpegUrl',
    url: 'https://video.twimg.com/video1.mp4'
  },
  {
    content_type: 'application/x-mpegURL',
    url: 'https://video.twimg.com/video2.mp4'
  },
  {
    content_type: 'application/x-mpegUrl',
    url: 'https://video.twimg.com/video3.mp4'
  },
  {
    bitrate: 432000,
    content_type: 'video/mp4',
    url: 'https://video.twimg.com/video4.mp4'
  }
];

test("getBestVideo", function(assert) {
  assert.equal(getBestVideo(oneMp4), 'https://video.twimg.com/video4.mp4', '4_videos_one_mp4_last_one');
})


// Test 2 -- We check what happens with an empty array. I assume that it will return 'null'
// The test returns the expected result
nullMp4 = [];

test("getBestVideo", function(assert) {
assert.equal(getBestVideo(nullMp4), null, 'empty_array');
})


// Test 3 -- We check what happens with an array with no videos. I assume that it will return 'null'
// The test returns the expected result
noMp4 = [{
  content_type: 'application/x-mpegUrl',
  url: 'https://video.twimg.com/video1.mp4'
},
{
  content_type: 'application/x-mpegURL',
  url: 'https://video.twimg.com/video2.mp4'
},
{
  content_type: 'application/x-mpegUrl',
  url: 'https://video.twimg.com/video3.mp4'
}
];

test("getBestVideo", function(assert) {
assert.equal(getBestVideo(noMp4), null, 'no_videos_in_array');
})

// Test 4 -- We check what happens with an array with two videos with the same bitrate. I assume it will return the first one
// The test doesn't return the expected result; instead, it takes the last video as the best one
sameBitrate = [{
  content_type: 'application/x-mpegUrl',
  url: 'https://video.twimg.com/video1.mp4'
},
{
  content_type: 'application/x-mpegURL',
  url: 'https://video.twimg.com/video2.mp4'
},
{
  bitrate: 432000,
  content_type: 'application/x-mpegUrl',
  url: 'https://video.twimg.com/video3.mp4'
},
{
  bitrate: 432000,
  content_type: 'video/mp4',
  url: 'https://video.twimg.com/video4.mp4'
}
];

test("getBestVideo", function(assert) {
assert.equal(getBestVideo(sameBitrate), 'https://video.twimg.com/video3.mp4', '2_videos_same_bitrate');
})

// Test 5 -- We check what happens in a normal situation - there is a video better than the others, and the array is correctly constructed. I
// assume it will return the video with highest bitrate
// The test returns the expected result
normalArray = [{
  bitrate: 1000,
  content_type: 'application/x-mpegUrl',
  url: 'https://video.twimg.com/video1.mp4'
},
{
  bitrate: 5000,
  content_type: 'application/x-mpegURL',
  url: 'https://video.twimg.com/video2.mp4'
},
{
  bitrate: 432000,
  content_type: 'application/x-mpegUrl',
  url: 'https://video.twimg.com/video3.mp4'
},
{
  bitrate: 602000,
  content_type: 'video/mp4',
  url: 'https://video.twimg.com/video4.mp4'
}
];

test("getBestVideo", function(assert) {
assert.equal(getBestVideo(normalArray), 'https://video.twimg.com/video4.mp4', 'normal_situation');
})


// Test 6 -- We check if the function can distinguish between different types of videos. I assume it will return the highest bitrate one.
// The test returns null, so we can deduce that it doesn't know what to do with different formats of video
differentFormats = [{
  bitrate: 1000,
  content_type: 'application/mp4',
  url: 'https://video.twimg.com/video1.mp4'
},
{
  bitrate: 5000,
  content_type: 'application/x-mp4',
  url: 'https://video.twimg.com/video2.mp4'
},
{
  bitrate: 432000,
  content_type: 'application/x-mp4',
  url: 'https://video.twimg.com/video3.mp4'
},
{
  bitrate: 602000,
  content_type: 'video/avi',
  url: 'https://video.twimg.com/video4.avi'
}
];

test("getBestVideo", function(assert) {
assert.equal(getBestVideo(differentFormats), 'https://video.twimg.com/video4.avi', 'different_formats');
})


// Test 7 -- We check what happens if the array is "wrongly" constructed. I assume it will return null
// The test returns the expected result
wrongArray = [{
  url: 'https://video.twimg.com/video1.mp4'
},
{
  bitrate: 5000
},
];

test("getBestVideo", function(assert) {
assert.equal(getBestVideo(wrongArray), null, 'wrong_array');
})

// Test 8 -- We check what happens if we set a bitrate to non-video format files. I assume it will return the video, not the image
// The test returns the expected result
bitrateToImage = [{
  bitrate: 700000,
  content_type: 'application/jpg',
  url: 'https://video.twimg.com/image1.jpg'
},
{
  bitrate: 500000,
  content_type: 'video/mp4',
  url: 'https://video.twimg.com/video1.mp4'
}
];

test("getBestVideo", function(assert) {
assert.equal(getBestVideo(bitrateToImage), 'https://video.twimg.com/video1.mp4', 'bitrate_to_image');
})


// Test 9 -- We check what happens if we use negative bitrates. I assume it will return null
// The test returns the video with highest bitrate, even if it is negative
negativeBitrates = [{
  bitrate: -20,
  content_type: 'video/mp4',
  url: 'https://video.twimg.com/video1.mp4'
},
{
  bitrate: -200,
  content_type: 'video/mp4',
  url: 'https://video.twimg.com/video2.mp4'
}
];

test("getBestVideo", function(assert) {
assert.equal(getBestVideo(negativeBitrates), null, 'negative_bitrates');
})


// Test 10 -- We check what happens if we pass the bitrate as String. I assume it will return null
// The test returns the highest bitrate video, meaning it can compare bitrates even if they are strings (which provides more security)
bitrateAsString = [{
  bitrate: "50000",
  content_type: 'video/mp4',
  url: 'https://video.twimg.com/video1.mp4'
},
{
  bitrate: "602000",
  content_type: 'video/mp4',
  url: 'https://video.twimg.com/video2.mp4'
}
];

test("getBestVideo", function(assert) {
assert.equal(getBestVideo(bitrateAsString), null, 'bitrate_as_string');
})

// Test 11 -- We check what happens if there is no URL attached to the video. I assume it will return null
// The test returns the expected result
noUrl = [{
  bitrate: 50000,
  content_type: 'video/mp4',
},
{
  bitrate: 602000,
  content_type: 'video/mp4',
}
];

test("getBestVideo", function(assert) {
assert.equal(getBestVideo(noUrl), null, 'no_url_in_videos');
})
