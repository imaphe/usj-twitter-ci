// Example provide by Daniel Coloma
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
    bitrate: 42000,
    content_type: 'video/mp4',
    url: 'https://video.twimg.com/video4.mp4'
  }
];

test("getBestVideo", function(assert) {
  assert.equal(getBestVideo(oneMp4), 'https://video.twimg.com/video4.mp4', '0t_videos_one_mp4_last_one');
});


/* Different Test to verify the function getBestMovies. 
    @author: Andrea Alvaro */

/* TEST 1. In this test, we are testing that there is not specify the format mp4. I suppose that the function will not be able to get the best,
   so we suppose that the result return is null.  In this case, the test has passed. */
   
noneMp4 = [{
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
  bitrate: 42000,
  content_type: 'application/x-mpegUrl',
  url: 'https://video.twimg.com/video4.mp4'
}
];

test("getBestVideo", function(assert) {
assert.equal(getBestVideo(noneMp4), null, '1t_videos_none_mp4_format');
});

/*TEST 2. In this test, we are testing what will happen if all  videos have the mp4 format and 1 with bit rate . I suppose that if there is only a bitrate
the function will not be able to compare the quality of the videos. So, the results should be video4. */

allMp4 = [{
  content_type: 'video/mp4',
  url: 'https://video.twimg.com/video1.mp4'
},
{
  content_type: 'video/mp4',
  url: 'https://video.twimg.com/video2.mp4'
},
{
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
assert.equal(getBestVideo(allMp4),'https://video.twimg.com/video4.mp4' , '2t_videos_all_mp4_format');
});


/* TEST 3. In this test, we are testing what will happen if all videos have the mp4 format and all video with bit a different rate.
I suppose that function will retirn the video with the highest bitrate which sill be video1. */

allMp4allBitRate = [{
  bitrate: 42000,
  content_type: 'video/mp4',
  url: 'https://video.twimg.com/video1.mp4'
},
{
  bitrate: 22000,
  content_type: 'video/mp4',
  url: 'https://video.twimg.com/video2.mp4'
},
{
  bitrate: 32000,
  content_type: 'video/mp4',
  url: 'https://video.twimg.com/video3.mp4'
},
{
  bitrate: 12000,
  content_type: 'video/mp4',
  url: 'https://video.twimg.com/video4.mp4'
}
];

test("getBestVideo", function(assert) {
assert.equal(getBestVideo(allMp4allBitRate),'https://video.twimg.com/video1.mp4' , '3t_videos_all_mp4_format_all_bitrate');
});


/* TEST 4. In this test, we are testing, what will happen if all videos have the mp4 format and 2 with same bitrate.
I suppose that the function will ruturn the first one that has the higest quality. */

allMp4allBitRate2SameBitRate = [{
  bitrate: 42000,
  content_type: 'video/mp4',
  url: 'https://video.twimg.com/video1.mp4'
},
{
  bitrate: 42000,
  content_type: 'video/mp4',
  url: 'https://video.twimg.com/video2.mp4'
},
{
  bitrate: 32000,
  content_type: 'video/mp4',
  url: 'https://video.twimg.com/video3.mp4'
},
{
  bitrate: 12000,
  content_type: 'video/mp4',
  url: 'https://video.twimg.com/video4.mp4'
}
];

test("getBestVideo", function(assert) {
assert.equal(getBestVideo(allMp4allBitRate2SameBitRate),'https://video.twimg.com/video1.mp4' , '4t_videos_all_mp4_format_all_bitrate_two_samebitrate');
});


/*TEST 5. In this test, we are checking if an empty array is used as parameter what will it happen. 
I supposed that the result will be null.  */

test("getBestVideo", function(assert) {
  assert.equal(getBestVideo([]), null , 'empty_array');
  });

/* TEST 6. In this test, we are checking what will happen if all videos have the same bitrate and the same format. 
In this case, we suppose that it will return the first video.*/

allMp4allBitRateSameBitRate = [{
  bitrate: 42000,
  content_type: 'video/mp4',
  url: 'https://video.twimg.com/video1.mp4'
},
{
  bitrate: 42000,
  content_type: 'video/mp4',
  url: 'https://video.twimg.com/video2.mp4'
},
{
  bitrate: 42000,
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
assert.equal(getBestVideo(allMp4allBitRate2SameBitRate),'https://video.twimg.com/video1.mp4' , '5t_videos_all_mp4_format_all_bitrate_all_samebitrate');
});


/* TEST 7. In this test, we ware cheking what will happen if none video has bitrate. If none has a bitrate, the function willnot be able to compare
with other videos so a null result should be return. */

noBitRate = [{
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
  content_type: 'video/mp4',
  url: 'https://video.twimg.com/video4.mp4'
}
];

test("getBestVideo", function(assert) {
assert.equal(getBestVideo(noBitRate), null, '6t_videos_noBitRate');
});




/* TEST 8. In this test, we are checking what will happen if all videos have the same bitrate with different formats. We want to check with format has more
prevails. WE suppose that the video 4 will be return. */

sameBitRateTwoFormatMp4 = [{
  bitrate: 52000,
  content_type: 'application/x-mpegUrl',
  url: 'https://video.twimg.com/video1.mp4'
},
{
  bitrate: 52000,
  content_type: 'application/x-mpegURL',
  url: 'https://video.twimg.com/video2.mp4'
},
{
  bitrate:52000,
  content_type: 'video/mp4',
  url: 'https://video.twimg.com/video3.mp4'
},
{
  bitrate: 52000,
  content_type: 'video/mp4',
  url: 'https://video.twimg.com/video4.mp4'
}
];

test("getBestVideo", function(assert) {
assert.equal(getBestVideo(sameBitRateSameFormatMp4), 'https://video.twimg.com/video4.mp4', '8t_videos_2Mp4_sameBitrate');
});




/*TEST 9. In this test, we are verifying what will happing if we have a video with the highest bit rate but with not format decription. I suppose 
it will return the video with the higest bitrate but with an specify format.*/

twoMp4differentBitratesdifferentFormat = [{
  bitrate: 62000,
  url: 'https://video.twimg.com/video1.mp4'
},
{
  bitrate:42000,
  content_type: 'application/x-mpegURL',
  url: 'https://video.twimg.com/video2.mp4'
},
{
  bitrate:52000,
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
assert.equal(getBestVideo(twoMp4differentBitratesdifferentFormat), 'https://video.twimg.com/video3.mp4', '9t_videos_two_Mp4_DifferentBitRates');
});


/*TEST 10. In this case, we will check if a different format with the highest bitrate is return. I suppose that the video with the highest bitrate should
be return even if the format is different from .mp4 */

oneMp4 = [{
  bitrate: 62000,
  content_type: 'video/avi',
  url: 'https://video.twimg.com/video1.mp4'
},
{
  bitrate:52000,
  content_type: 'video/mp4',
  url: 'https://video.twimg.com/video2.mp4'
}];

test("getBestVideo", function(assert) {
assert.equal(getBestVideo(oneMp4), 'https://video.twimg.com/video1.mp4', '10t_videos_sameFormat_sameBitrate');
});




