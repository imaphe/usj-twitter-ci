//TEST 1: Test an empty array

test("getBestVideo_EmptyArray", function(assert) {
  assert.equal(getBestVideo([]), null, 'getBestVideo_EmptyArray');
});

//TEST 2: Test an array wrongly intialized

wrongArray = [{
    url: 'WrongArray'
  }
];

test("getBestVideo_WrongArray", function(assert) {
  assert.equal(getBestVideo(wrongArray), null, 'getBestVideo_WrongArray');
});

//TEST 3: Test two videos with same bitrate

twoMp4WithSameBitrate = [{
  bitrate: 42000,
  content_type: 'video/mp4',
  url: 'https://video.twimg.com/videoB.mp4'
},
{
  bitrate: 42000,
  content_type: 'video/mp4',
  url: 'https://video.twimg.com/videoA.mp4'
}
];
 
test("getBestVideo_TwoMp4WithSameBitrate", function(assert){
  assert.equal(getBestVideo(twoMp4WithSameBitrate), "https://video.twimg.com/videoB.mp4", 'getBestVideo_TwoMp4WithSameBitrate' )
});

//TEST 4: Array with the same video twice.

sameVideoTwice = [{
    content_type: 'video/mp4',
    url: 'https://video.twimg.com/video1.mp4'
  },
  {
    content_type: 'video/mp4',
    url: 'https://video.twimg.com/video1.mp4'
  }
];

test("getBestVideo_sameVideoTwice", function(assert) {
  assert.equal(getBestVideo(sameVideoTwice), 'https://video.twimg.com/video1.mp4', 'getBestVideo_sameVideoTwice');
});

//TEST 5: Test two videos have different bitrates and different content_type


differentBitratesAndContentType = [{
  content_type: 'application/x-mpegUrl',
  url: 'https://video.twimg.com/video1.mp4'
},
{
  content_type: 'application/x-mpegURL',
  url: 'https://video.twimg.com/video2.mp4'
},
{
  bitrate: 50000,
  content_type: 'application/x-mpegURL',
  url: 'https://video.twimg.com/video3.mp4'
},
{
  bitrate: 42000,
  content_type: 'video/mp4',
  url: 'https://video.twimg.com/video4.mp4'
}
];

test("getBestVideo_differentBitratesAndContentType", function(assert) {
assert.equal(getBestVideo(differentBitratesAndContentType), 'https://video.twimg.com/video4.mp4', 'getBestVideo_differentBitratesAndContentType');
});


//TEST 6: Test if we don't  have URL
noURL = [{
  content_type: 'application/x-mpegUrl',
},
{
  content_type: 'application/x-mpegURL',
},
{
  content_type: 'application/x-mpegURL',
},
{
  bitrate: 42000,
  content_type: 'video/mp4',
}
];

test("getBestVideo_NoURL", function(assert) {
assert.equal(getBestVideo(noURL), null, 'getBestVideo_NoURL');
});
