If you know me personally or follow me on Twitter, you probably know I just became a father. My daughter is just 3 months old as I wrote those lines. As many parents know already, unless you're exceptionally lucky, you pretty much don't have time for yourself with a child that age. It's either awake and eating or sleeping in your arms most of the time.

As a geek with many interest centers, that's pretty hard but, at least for me, it's worth it. So I had to find an activity that is geeky but requires only a few minutes at a time and not too much concentration. So I decided to use that idle CPU time on my [Plex](https://plex.tv) server (a 2011 Mac Mini with a 2.3GHz Core i5) and to fill the 9TB on my Synology NAS. I started transcoding my entire collection of DVDs and Blurays. It fits my current schedule perfectly, it only requires a few minutes to set up a transcoding job and let it run for several hours. And the cherry on the cake is that it's much simpler to launch a movie using Plex than using the disk player when you have one arm busy holding your kid.

I didn't calculated but I probably won't be done until this summer. To give you and idea of the task, I have two full Billy bookcases such as [this one](http://www.ikea.com/us/en/catalog/products/40263848/). One of those is almost full of blurays.

Anyway, The topic here is to discuss how I'm transcoding my collection. The idea came when I read [this article](http://sixcolors.com/post/2015/01/how-i-rip-dvds-and-blu-rays/) from Jason Snell at Six Colors. In it, I learned it was now relatively easy to rip and transcode blurays. I used to rip DVDs in the past but I didn't suspect Bluray drives were that cheap now and ripping Blurays so simple. Well, reading Jason Snell, you'd think it simple. But as you'll soon learn, there is no simple "one size fits all" setup. That's why I just started using Don Melton's [transcoding scripts](https://github.com/donmelton/video-transcoding-scripts). Thanks to him for his fast answers on Twitter.  
I've just ripped several blurays and DVDs with them and I have to admit they produce better and smaller files than Handbrake's Apple TV 3 preset.

So, how do I rip my disks? Well, first, I followed Don's README file instructions to install everything (handbrakecli, mkvtoolnix and mp4v2). Then the procedure is usually the same:

* Scan your media using the `--title 0` option: `./transcode-video.sh --title 0 /Volumes/MY_DISC/ | less`. I pipe the output to `less` because the output is usually pretty long and you need to search in it. I usually search with this pattern `/\+ duration` then scroll through result with `n` to find the longest title. Here's an example:  

```
+ title 1:
  + Main Feature
  + playlist: 00000.MPLS
  + angle(s) 2
  + duration: 01:48:40
  + size: 1920x1080, pixel aspect: 1/1, display aspect: 1.78, 29.970 fps
  + autocrop: 0/0/0/0
  + support opencl: no
  + support hwd: not built-in
  + chapters:
    + 1: cells 0->0, 0 blocks, duration 00:00:43
    + 2: cells 0->0, 0 blocks, duration 00:04:46
    + 3: cells 0->0, 0 blocks, duration 00:06:23
    + 4: cells 0->0, 0 blocks, duration 00:06:14
    + 5: cells 0->0, 0 blocks, duration 00:06:49
    + 6: cells 0->0, 0 blocks, duration 00:04:49
    + 7: cells 0->0, 0 blocks, duration 00:05:48
    + 8: cells 0->0, 0 blocks, duration 00:04:45
    + 9: cells 0->0, 0 blocks, duration 00:03:58
    + 10: cells 0->0, 0 blocks, duration 00:04:39
    + 11: cells 0->0, 0 blocks, duration 00:06:13
    + 12: cells 0->0, 0 blocks, duration 00:04:34
    + 13: cells 0->0, 0 blocks, duration 00:05:08
    + 14: cells 0->0, 0 blocks, duration 00:04:30
    + 15: cells 0->0, 0 blocks, duration 00:06:29
    + 16: cells 0->0, 0 blocks, duration 00:06:03
    + 17: cells 0->0, 0 blocks, duration 00:05:19
    + 18: cells 0->0, 0 blocks, duration 00:06:43
    + 19: cells 0->0, 0 blocks, duration 00:06:31
    + 20: cells 0->0, 0 blocks, duration 00:04:37
    + 21: cells 0->0, 0 blocks, duration 00:03:32
    + 22: cells 0->0, 0 blocks, duration 00:00:06
    + 23: cells 0->0, 0 blocks, duration 00:00:01
  + audio tracks:
    + 1, English (AC3) (5.1 ch) (iso639-2: eng), 48000Hz, 640000bps
    + 2, English (TrueHD) (5.1 ch) (iso639-2: eng)
    + 3, English (AC3) (2.0 ch) (iso639-2: eng), 48000Hz, 640000bps
    + 4, English (TrueHD) (2.0 ch) (iso639-2: eng)
  + subtitle tracks:
  + combing detected, may be interlaced or telecined
```

* From that information, I built this command: `./transcode-video.sh --title 1 --big --audio 1 --allow-dts --filter decomb /Volumes/MY_DISC/`

  * I chose the title with `--title 1`. It's the longest title. If you're not sure, use the Handbrake GUI and its preview feature to find the correct title.
  * I use the `--big` option because I prefer quality over final size
  * The ` --audio 1 --allow-dts` options tell Handbrake to select the first track, downmix it to 2.0 AAC and also pass it through as a second audio track (`--allow-dts`). I chose the first audio track because Handbrake can't passthrough LPCM, TrueHD or FLAC. So, if the audio is gonna be downmixed to AC3 5.1 anyway, I prefer to passthrough the original AC3 track instead of loosing CPU time.
  * The `--filter decomb` option is important here. The last line of the scan says *combing detected, may be interlaced or telecined*. This means you'll probably have combing as shown in the picture below. As Don told me on Twitter, using this option is impacting performance and quality, so don't use it if you don't need it.
<img src="/images/2015/02/combing-300x188.jpg" alt="combing" width="300" height="188" class="aligncenter size-medium wp-image-76" />

Also, I strongly recommend you use `./transcode-video.sh --fullhelp` in addition to the README file, you'll get more information an the available options.

Finally, one note about subtitles. From what I gathered, converting Bluray subtitles (PGS) to .srt files is pretty complicated on Mac. I decided to don't bother with that and try to find them online instead. You can even add them to the mp4 file later with `ffmpeg`. Also, putting the raw PGS subtitle is not compatible with mp4 format and could have weird effects on your player. For DVDs, I usually put the vobsub track directly in the mp4 file. I don't burn them in though.
