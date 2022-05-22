equalBitrateMp4 = [{

  bitrate: 42000,
  content_type: 'video/mp4',
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
  bitrate: 42000,
  content_type: 'video/mp4',
  url: 'https://video.twimg.com/video4.mp4'
}
];

plus1BitrateMp4 = [{

  bitrate: 42001,
  content_type: 'video/mp4',
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
  bitrate: 42000,
  content_type: 'video/mp4',
  url: 'https://video.twimg.com/video4.mp4'
}
];

less1BitrateMp4 = [{

  bitrate: 41999,
  content_type: 'video/mp4',
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
  bitrate: 42000,
  content_type: 'video/mp4',
  url: 'https://video.twimg.com/video4.mp4'
}
];


bitrateNegativeMp4=[{
  bitrate: 41999,
  content_type: 'video/mp4',
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
  bitrate: -42000,
  content_type: 'video/mp4',
  url: 'https://video.twimg.com/video4.mp4'
}
];

naNMp4 = [{
    bitrate: 42000,
    content_type: 'video/mp4',
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
    bitrate: NaN,
    content_type: 'video/mp4',
    url: 'https://video.twimg.com/video4.mp4'
  }
];


test("bitrate", function(assert) {
  assert.equal(getBestVideo(equalBitrateMp4), 'https://video.twimg.com/video1.mp4', 'sameBitrate_done');
  assert.equal(getBestVideo(plus1BitrateMp4), 'https://video.twimg.com/video1.mp4', 'plus_1_bitrate_done');
  assert.equal(getBestVideo(less1BitrateMp4), 'https://video.twimg.com/video4.mp4', 'less_1_bitrate_done');
  assert.equal(getBestVideo(bitrateNegativeMp4), 'https://video.twimg.com/video1.mp4', 'bitrate_negative_done');
  assert.equal(getBestVideo(naNMp4), 'https://video.twimg.com/video1.mp4', 'NaN_mp4');
});

maxBitrateNotMp4=[{
  bitrate: 41999,
  content_type: 'video/mp4',
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
  bitrate: 42000,
  content_type: 'application/x-mpegURL',
  url: 'https://video.twimg.com/video4.mp4'
}
];

notMp4=[{
  bitrate: 41999,
  content_type: 'application/x-mpegURL',
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
  bitrate: 42000,
  content_type: 'application/x-mpegURL',
  url: 'https://video.twimg.com/video4.mp4'
}
];

test("type", function(assert) {
assert.equal(getBestVideo(notMp4), null, 'not_MP4_done');
assert.equal(getBestVideo(maxBitrateNotMp4), 'https://video.twimg.com/video1.mp4', 'max_Bitrate_notMP4_done');
});

notVideos=[]
test("list", function(assert) {
assert.equal(getBestVideo(notVideos), null, 'not_videos_done');
});
