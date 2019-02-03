#### Update 09/12/2016 (or 12/09/2016 if you're in the US)
So I definitely gave up on the "1-cable dream". Instead, here's my new cable setup. I'm using a [USB-C/Thunderbolt 3 to DisplayPort adapter](http://amzn.eu/9KOoZeq) for 4k/60Hz video and the [USB-C Digital AV Multiport Adapter](http://www.apple.com/shop/product/MJ1K2AM/A/usb-c-digital-av-multiport-adapter) from Apple. In it are plugged my USB 3 hub and the Apple USB-C power cable plugged on the power brick. That way, I don't get that weird charging-but-not-really-charging bug anymore because the MacBook Pro doesn't get confused anymore on where to draw power from.
Another benefit from the setup is that the MacBook Pro seems to be much more stable. I don't get weird reboots after sleep (it happened 2 or 3 times before I switch to this setup).

I'm pretty sure the MacBook Pro is suffering from being the first main-stream device with USB-C/Thunderbolt 3 ports. For now, you have to find the correct combination of cables so the power, USB/Thunderbolt and video drivers don't collide. I really hope that's not the future of USB-C/Thunderbolt 3...

#### Original post
<img src="/images/2016/12/macbook.jpg" style="float:left;margin-right: 20px;margin-bottom: 10px;">
I just bought the [new MacBook Pro](http://www.everymac.com/systems/apple/macbook_pro/specs/macbook-pro-core-i5-3.1-13-late-2016-retina-display-touch-bar-specs.html). I chose the 13" TouchBar model with a RAM, CPU and SSD upgrade.
So definitely not a cheap machine. It's for a new job I'm starting in January and my future employer paid for it.

All in all, I'm very pleased with my choice. First, I come from an [old big non-retina MacBook Pro](http://www.everymac.com/systems/apple/macbook_pro/specs/macbook-pro-core-i5-2.5-13-mid-2012-unibody-usb3-specs.html) at home and a cheap and crappy Dell Windows laptop at work. So there is a big leap in terms of performance, build quality and display. Also, it's genuinely a great machine. That TouchBar and that TouchID button. Also, I love the keyboard.

But I'm very surprised and displeased by how much problems I have with it right now.

### Cables
First, the cables. No, not the dongles, the cables. I bought an [LG 27UD88-W display](http://www.lg.com/us/monitors/lg-27UD88-W-4k-uhd-led-monitor). This model was not specifically designed for the MacBook Pro like the UltraFine models but it's supposed to work fine with the MacBook so I figured it would work fine with the MacBook Pro.
Well, I was wrong! This model has 2 USB 3 ports. With USB-C cable and 60W power supply, I was hoping to live the 1-cable dream, using the display as an USB hub for my peripherals and as a power supply for the MacBook Pro.

I tried the USB-C cable that comes with the display. I got the display signal working but no power and no USB 3. It seems this cable is not suitable for high power supply.

Then I tried the USB-C cable coming with the MacBook Pro. I got power but no display and still no USB 3. Looks to me this cable is not a Thunderbolt cable and doesn't support display signal. Actually, [it's not even USB 3](http://blog.fosketts.net/2016/10/30/2016-macbook-pro-usb-cthunderbolt-survival-guide/).

After some research, I bought a [Cable Matters Thunderbolt 3 (20 Gbps) / USB-C 3.1 Gen 2 (10 Gbps) cable](http://amzn.eu/ivlZm94) from Amazon for 26€. So now I have display signal and power (sort of) but still no USB 3. So I gave up on the 1-cable dream and use a USB-C to USB 3 adapter from Apple for my peripherals. I also tried to use the [USB-C Digital AV Multiport Adapter](http://www.apple.com/shop/product/MJ1K2AM/A/usb-c-digital-av-multiport-adapter) from Apple but the 4K display is capped at 30Hz which is unacceptable for me.
Oh I said "sort of" for the power because sometimes I will hear the sound indicating the MacBook Pro is charging, the icon in the taskbar will show I'm plugged in but if I click on it, I'll see the MacBook Pro is not charging and the battery depletes slowly. Unplugging and plugging again will usually solve the issue.

If somebody can tell me if there is a magic cable that works reliably for my use case, please tell me on Twitter!

### Bugs
I've already noticed quite a few bugs.

The most annoying one has to do with password typing with FileVault activated. I have a french keyboard layout configured but I can't use an "@" sign in my password. Password check won't work. I have no idea what characters it types but definitely not an "@" sign. The rest of the keys seems to match the AZERTY layout of my french keyboard. The weirdest thing is that if I use a bluetooth keyboard, it works. So it's the key mapping of the integrated keyboard that is faulty. My solution was to choose another password without that sign.

Another bug is that if I boot the MacBook Pro with the external display plugged in, I have a big display glitch with quickly flicking windows from both screens showing on the MacBook Pro display and nothing on the external display.

Finally, sometimes the TouchBar doesn't update when I switch apps. No idea why and it's totally random.


To summarize, the MacBook Pro 2016 has a lot of early issues. I'm a software engineer with a pretty good knowledge of Apple hardware and I still struggle to understand exactly what I can and can't do with USB-C/Thunderbolt 3 ports and cables. The only information that matches my experience is this ["Survival guide"](http://blog.fosketts.net/2016/10/30/2016-macbook-pro-usb-cthunderbolt-survival-guide/). The title is not exaggerated...
