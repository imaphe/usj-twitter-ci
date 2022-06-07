/*TEST 1: Empty array. It should return null.*/

test("getBestVideo_EmptyArray", function(assert) {
  assert.equal(getBestVideo([]), null, 'getBestVideo_EmptyArray');
});

/*TEST 2: Array wrongly intialized. No available videos to choose. It should return null.*/

twoMp4 = [{
    url: 'ArrayMalConstruido'
  }
];

test("getBestVideo_WrongArray", function(assert) {
  assert.equal(getBestVideo(twoMp4), null, 'getBestVideo_WrongArray');
});

/*TEST 3: Array correctly initialized. Different video formats and bitrates.
It should choose the mp4 video with the higher bit rate, or the one with bit rate specifications. Therefore, it should return video4.*/

threeMp4 = [{
    content_type: 'application/x-mpegUrl',
    url: 'https://video.twimg.com/video1.mp4'
  },
  {
    content_type: 'application/x-mpegURL',
    url: 'https://video.twimg.com/video2.mp4'
  },
  {
    bitrate: 41999,
    content_type: 'video/mp4',
    url: 'https://video.twimg.com/video3.mp4'
  },
  {
    bitrate: 42000,
    content_type: 'video/mp4',
    url: 'https://video.twimg.com/video4.mp4'
  }
];

test("getBestVideo_NormalArray", function(assert) {
  assert.equal(getBestVideo(threeMp4), 'https://video.twimg.com/video4.mp4', 'getBestVideo_NormalArray');
});

/*TEST 4: Array with the same video twice. It should return the video, video1.*/

fourMp4 = [{
    content_type: 'video/mp4',
    url: 'https://video.twimg.com/video1.mp4'
  },
  {
    content_type: 'video/mp4',
    url: 'https://video.twimg.com/video1.mp4'
  }
];

test("getBestVideo_DuplicatedVideo", function(assert) {
  assert.equal(getBestVideo(fourMp4), 'https://video.twimg.com/video1.mp4', 'getBestVideo_DuplicatedVideo');
});

/*TEST 5: Array with the same video twice, but one has bit rate specifications. It should return the video, video1.*/

fiveMp4 = [{
    bitrate: 42000,
    content_type: 'video/mp4',
    url: 'https://video.twimg.com/video1.mp4'
  },
  {
    content_type: 'video/mp4',
    url: 'https://video.twimg.com/video1.mp4'
  }
];

test("getBestVideo_DuplicatedVideo_OneHasHigherBitRate", function(assert) {
  assert.equal(getBestVideo(fiveMp4), 'https://video.twimg.com/video1.mp4', 'getBestVideo_DuplicatedVideo_OneHasHigherBitRate');
});


/*TEST 6: Array with two mp4 videos and no bit rate specifications. It should return video2, because it is the last best-video in the array.
Here, we can see how the function chooses the last video when it comes to two videos with the same characteristics.*/

sixMp4 = [{
    content_type: 'video/mp4',
    url: 'https://video.twimg.com/video1.mp4'
  },
  {
    content_type: 'video/mp4',
    url: 'https://video.twimg.com/video2.mp4'
  }
];

test("getBestVideo_2mp4_NoBitRateSpecifications", function(assert) {
  assert.equal(getBestVideo(sixMp4), 'https://video.twimg.com/video2.mp4', 'getBestVideo_2mp4_NoBitRateSpecifications');
});

/*TEST 7: Array with two mp4 videos and same bit rate specifications.
We would expect it to return video2, because it is the last best-video in the array, as seen on TEST 6 as well.
However, when we specify bit rates, the method chooses the first video when it comes to two videos with the same characteristics.*/

sevenMp4 = [{
    bitrate: 42000,
    content_type: 'video/mp4',
    url: 'https://video.twimg.com/video1.mp4'
  },
  {
    bitrate: 42000,
    content_type: 'video/mp4',
    url: 'https://video.twimg.com/video2.mp4'
  }
];

test("getBestVideo_2mp4_SameBitRateSpecifications", function(assert) {
  assert.equal(getBestVideo(sevenMp4), 'https://video.twimg.com/video1.mp4', 'getBestVideo_2mp4_SameBitRateSpecifications');
});

/*TEST 8: Array with two mp4 videos, one of them has a negative bit rate and the other no specifications.
It should return the video that has the bit rate specified, even if negative. In this case, video1.*/

eightMp4 = [{
    bitrate: -42000,
    content_type: 'video/mp4',
    url: 'https://video.twimg.com/video1.mp4'
  },
  {
    content_type: 'video/mp4',
    url: 'https://video.twimg.com/video2.mp4'
  }
];

test("getBestVideo_2mp4_NegativeBitRateSpecifications", function(assert) {
  assert.equal(getBestVideo(eightMp4), 'https://video.twimg.com/video1.mp4', 'getBestVideo_2mp4_NegativeBitRateSpecifications');
});

/*TEST 9: Array with two mp4 videos, one of them has a negative bit rate and the other a smaller but positive bit rate.
It should return the video with a positive bit rate.*/

nineMp4 = [{
    bitrate: -42000,
    content_type: 'video/mp4',
    url: 'https://video.twimg.com/video1.mp4'
  },
  {
    bitrate: 40000,
    content_type: 'video/mp4',
    url: 'https://video.twimg.com/video2.mp4'
  }
];

test("getBestVideo_2mp4_Negative_VS_Positive_BitRateSpecifications", function(assert) {
  assert.equal(getBestVideo(nineMp4), 'https://video.twimg.com/video2.mp4', 'getBestVideo_2mp4_Negative_VS_Positive_BitRateSpecifications');
});

/*TEST 10: Array with two mp4 videos, one of them has a 0 bit rate and the other one has no bit rate specifications.
It should return the video with bit rate specifications, even if it is 0.*/

tenMp4 = [{
    content_type: 'video/mp4',
    url: 'https://video.twimg.com/video1.mp4'
  },
  {
    bitrate: 0,
    content_type: 'video/mp4',
    url: 'https://video.twimg.com/video2.mp4'
  }
];

test("getBestVideo_2mp4_0BitRate_VS_NoBitRateSpecifications", function(assert) {
  assert.equal(getBestVideo(tenMp4), 'https://video.twimg.com/video2.mp4', 'getBestVideo_2mp4_0BitRate_VS_NoBitRateSpecifications');
});

/*TEST 11: An mp4 file and another format file with bit rate specifications.
It should choose the mp4 file over the other format, even though the other one has a higher bit rate.*/

elevenMp4 = [{
    bitrate: 42000,
    content_type: 'application/x-mpegURL',
    url: 'https://video.twimg.com/video1.mp4'
  },
  {
    content_type: 'video/mp4',
    url: 'https://video.twimg.com/video2.mp4'
  }
];

test("getBestVideo_OtherFormatWithHigherBitRate_VS_mp4Format", function(assert) {
  assert.equal(getBestVideo(elevenMp4), 'https://video.twimg.com/video2.mp4', 'getBestVideo_OtherFormatWithHigherBitRate_VS_mp4Format');
});

/*TEST 12: Array with no mp4 files. It should return null.*/

twelveMp4 = [{
    content_type: 'application/x-mpegUrl',
    url: 'https://video.twimg.com/video1.mp4'
  },
  {
    content_type: 'application/x-mpegURL',
    url: 'https://video.twimg.com/video2.mp4'
  }
];

test("getBestVideo_No_mp4", function(assert) {
  assert.equal(getBestVideo(twelveMp4), null, 'getBestVideo_No_mp4');
});

/*TEST 13: Array with no mp4 files where one video has higher bit rate. It should return null.*/

thirteenMp4 = [{
    bitrate: 42000,
    content_type: 'application/x-mpegUrl',
    url: 'https://video.twimg.com/video1.mp4'
  },
  {
    bitrate: 40000,
    content_type: 'application/x-mpegURL',
    url: 'https://video.twimg.com/video2.mp4'
  }
];

test("getBestVideo_No_mp4_WithBitRates", function(assert) {
  assert.equal(getBestVideo(thirteenMp4), null, 'getBestVideo_No_mp4_WithBitRates');
});
