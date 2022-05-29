
//test if we do not  have URL
firstMP4Example = [{
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
  content_type: 'video/mp4L',
}
];

test("getBestVideo", function(assert) {
assert.equal(getBestVideo(firstMP4Example), null, 'No  URL');
});




/if the array is empty
twoMp4Example = [
];

test("getBestVideo", function(assert) {
  assert.equal(getBestVideo(twoMp4Example ), null, 'Empty array');
});



// if works return two video with  different bitrate
threeMp4Example= [{
  content_type: 'application/x-mpegUrl',
  url: 'https://video.twimg.com/video1.mp4'
},
{
  content_type: 'application/x-mpegURL',
  url: 'https://video.twimg.com/video2.mp4'
},
{
  bitrate: 50000,
  content_type: 'video/mp4',
  url: 'https://video.twimg.com/video3.mp4'
},
{
  bitrate: 42000,
  content_type: 'video/mp4',
  url: 'https://video.twimg.com/video4.mp4'
}
];

test("getBestVideo", function(assert) {
assert.equal(getBestVideo(threeMp4Example), 'https://video.twimg.com/video3.mp4', 'Two videos with different bitrates');
});


//The bitrate is the same

fourMP4Example = [{
  content_type: 'application/x-mpegUrl',
  url: 'https://video.twimg.com/video1.mp4'
},
{
  content_type: 'application/x-mpegURL',
  url: 'https://video.twimg.com/video2.mp4'
},
{
  bitrate: 52000,
  content_type: 'application/x-mpegUrl',
  url: 'https://video.twimg.com/video3.mp4'
},
{
  bitrate: 52000,
  content_type: 'video/mp4',
  url: 'https://video.twimg.com/video4.mp4'
}
];

test("getBestVideo", function(assert) {
assert.equal(getBestVideo(fourMP4Example), 'https://video.twimg.com/video4.mp4', 'BItrate');
});

/*Problem with extension
*/
fiveMP4Example= [{
  content_type: 'application/x-mpegUrl',
  url: 'https://video.twimg.com/video1.mp4'
},
{
  content_type: 'application/x-mpegURL',
  url: 'https://video.twimg.com/video2.mp4'
},
{
  bitrate: 42000,
  content_type: 'video/mp4',
  url: 'https://video.twimg.com/video4.mp4'
},
{
  bitrate: 50000,
  content_type: 'video/avi',
  url: 'https://video.twimg.com/video5.avi'
}
];

test("getBestVideo", function(assert) {
  assert.equal(getBestVideo(fiveMP4Example), 'https://video.twimg.com/video5.avi','format of the video is avi not mp4 extenion wrong');
});

//Only we have URL content

sixMP4Exampple = [{
  url: 'https://video.twimg.com/video1.mp4'
},
{
  url: 'https://video.twimg.com/video2.mp4'
},
{
  url: 'https://video.twimg.com/video3.mp4'
},
{
  bitrate: 42000,
  url: 'https://video.twimg.com/video4.mp4'
}
];

test("getBestVideo", function(assert) {
assert.equal(getBestVideo(sixMP4Exampple), null, 'Only url content');
});






