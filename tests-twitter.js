//Test 1 : An empty array

EmptyMp4 = [];
test("getBestVideo", function(assert) {
  assert.equal(getBestVideo(EmptyMp4), null, 'getBestVideo');
});



//Test 2: Two files with same bitrate

SameBitrateTwoMp4 = [{
    bitRate: 432000,
    content_type: 'application/x-mpegUrl',
    url: 'https://video.twimg.com/video1.mp4'
},
{
    bitrate: 432000,
    content_type: 'application/x-mpegUrl',
    url: 'https://video.twimg.com/video2.mp4'
}
];

test("getBestVideo", function(assert){
  assert.equal(getBestVideo(SameBitrateTwoMp4), "https://video.twimg.com/video1.mp4", 'getBestVideo' )
});

//Test 3: Wrongly initialized array

WronglyInitializedMp4 = [{
    url: 'WronglyInitialized'
  }
];

test("getBestVideo", function(assert) {
  assert.equal(getBestVideo(WronglyInitializedMp4), null, 'getBestVideo');
});

//Test 4: No URL

NoUrlMp4 = [{
  content_type: 'application/x-mpegUrl',
},
{
  content_type: 'application/x-mpegURL',
},
{
  content_type: 'application/x-mpegURL',
},
{
  bitrate: 432000,
  content_type: 'video/mp4',
}
];

test("getBestVideo", function(assert) {
assert.equal(getBestVideo(NoUrlMp4), null, '4_videos_NoUrlMp4_null');
});

//Test 5: No Content Type

noContentType = [{
  url: 'https://video.twimg.com/video1.mp4'
},
{
  url: 'https://video.twimg.com/video2.mp4'
},
{
  url: 'https://video.twimg.com/video3.mp4'
},
{
  bitrate: 432000,
  url: 'https://video.twimg.com/video4.mp4'
}
];

test("getBestVideo", function(assert) {
assert.equal(getBestVideo(noContentType), null, '4_videos_noContentType_null');
});

