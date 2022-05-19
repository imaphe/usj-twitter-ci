oneMp4 = [
  {
    content_type: "application/x-mpegUrl",
    url: "https://video.twimg.com/video1.mp4",
  },
  {
    content_type: "application/x-mpegURL",
    url: "https://video.twimg.com/video2.mp4",
  },
  {
    content_type: "application/x-mpegUrl",
    url: "https://video.twimg.com/video3.mp4",
  },
  {
    bitrate: 42000,
    content_type: "video/mp4",
    url: "https://video.twimg.com/video4.mp4",
  },
];

test("getBestVideo", function (assert) {
  assert.equal(
    getBestVideo(oneMp4),
    "https://video.twimg.com/video4.mp4",
    "4_videos_one_mp4_last_one"
  );
});

twoMp4_higher_first = [
  {
    bitrate: 44000,
    content_type: "video/mp4",
    url: "https://video.twimg.com/video5.mp4",
  },
  {
    content_type: "application/x-mpegUrl",
    url: "https://video.twimg.com/video1.mp4",
  },
  {
    content_type: "application/x-mpegURL",
    url: "https://video.twimg.com/video2.mp4",
  },
  {
    content_type: "application/x-mpegUrl",
    url: "https://video.twimg.com/video3.mp4",
  },
  {
    bitrate: 42000,
    content_type: "video/mp4",
    url: "https://video.twimg.com/video4.mp4",
  },
];

// We are testing the ability of the method to pick the higher bitrate one if it's first
test("getBestVideo", function (assert) {
  assert.equal(
    getBestVideo(twoMp4_higher_first),
    "https://video.twimg.com/video5.mp4",
    "5_videos_two_mp4_higher_check_first"
  );
});

twoMp4_higher_last = [
  {
    bitrate: 42000,
    content_type: "video/mp4",
    url: "https://video.twimg.com/video5.mp4",
  },
  {
    content_type: "application/x-mpegUrl",
    url: "https://video.twimg.com/video1.mp4",
  },
  {
    content_type: "application/x-mpegURL",
    url: "https://video.twimg.com/video2.mp4",
  },
  {
    content_type: "application/x-mpegUrl",
    url: "https://video.twimg.com/video3.mp4",
  },
  {
    bitrate: 44000,
    content_type: "video/mp4",
    url: "https://video.twimg.com/video4.mp4",
  },
];

// We are testing the ability of the method to pick the higher bitrate one if it's last
test("getBestVideo", function (assert) {
  assert.equal(
    getBestVideo(twoMp4_higher_last),
    "https://video.twimg.com/video4.mp4",
    "5_videos_two_mp4_higher_check_last"
  );
});

twoMp4_equals = [
  {
    bitrate: 44000,
    content_type: "video/mp4",
    url: "https://video.twimg.com/video5.mp4",
  },
  {
    content_type: "application/x-mpegUrl",
    url: "https://video.twimg.com/video1.mp4",
  },
  {
    content_type: "application/x-mpegURL",
    url: "https://video.twimg.com/video2.mp4",
  },
  {
    content_type: "application/x-mpegUrl",
    url: "https://video.twimg.com/video3.mp4",
  },
  {
    bitrate: 44000,
    content_type: "video/mp4",
    url: "https://video.twimg.com/video4.mp4",
  },
];

/* We are testing the ability of the method to pick the first highest bitrate as 
we only change the highest one if it's strictly bigger than another */
test("getBestVideo", function (assert) {
  assert.equal(
    getBestVideo(twoMp4_equals),
    "https://video.twimg.com/video5.mp4",
    "5_videos_two_mp4_equals"
  );
});

noMp4 = [
  {
    content_type: "application/x-mpegUrl",
    url: "https://video.twimg.com/video1.mp4",
  },
  {
    content_type: "application/x-mpegURL",
    url: "https://video.twimg.com/video2.mp4",
  },
  {
    content_type: "application/x-mpegUrl",
    url: "https://video.twimg.com/video3.mp4",
  },
];

/* We are testing the ability of the method to pick the first highest bitrate as 
we only change the highest one if it's strictly bigger than another */
test("getBestVideo", function (assert) {
  assert.equal(getBestVideo(noMp4), null, "noMp4s");
});

twoMp4_MAX_INT = [
  {
    bitrate: Number.MAX_VALUE,
    content_type: "video/mp4",
    url: "https://video.twimg.com/video5.mp4",
  },
  {
    content_type: "application/x-mpegUrl",
    url: "https://video.twimg.com/video1.mp4",
  },
  {
    content_type: "application/x-mpegURL",
    url: "https://video.twimg.com/video2.mp4",
  },
  {
    content_type: "application/x-mpegUrl",
    url: "https://video.twimg.com/video3.mp4",
  },
  {
    bitrate: 44000,
    content_type: "video/mp4",
    url: "https://video.twimg.com/video4.mp4",
  },
];

/* We are testing the ability of the method to pick the highest bitrate and working with maxint */
test("getBestVideo", function (assert) {
  assert.equal(
    getBestVideo(twoMp4_MAX_INT),
    "https://video.twimg.com/video5.mp4",
    "5_videos_MAX_INT"
  );
});

twoMp4_NaN = [
  {
    bitrate: Number.NaN,
    content_type: "video/mp4",
    url: "https://video.twimg.com/video5.mp4",
  },
  {
    content_type: "application/x-mpegUrl",
    url: "https://video.twimg.com/video1.mp4",
  },
  {
    content_type: "application/x-mpegURL",
    url: "https://video.twimg.com/video2.mp4",
  },
  {
    content_type: "application/x-mpegUrl",
    url: "https://video.twimg.com/video3.mp4",
  },
  {
    bitrate: 44000,
    content_type: "video/mp4",
    url: "https://video.twimg.com/video4.mp4",
  },
];

/* We are testing the ability of the method to pick the highest bitrate and working with Not a Number */
test("getBestVideo", function (assert) {
  assert.equal(
    getBestVideo(twoMp4_NaN),
    "https://video.twimg.com/video4.mp4",
    "5_videos_NaN"
  );
});
