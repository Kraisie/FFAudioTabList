# FFAudioTabList
Posts a list of all tabs that are currently playing any audio to localhost so a program might catch those and use them.

### Plugin for Firefox that generates a list of all tabs that play audio
Currently this extension queries over all firefox tabs which play some sound and gathers the title of each tab.
A list of all those tabs gets send to `localhost:6789` where an other program can listen to that data and use it e.g. for AudioVisualizers with fitting titles or whatever you can imagine.

#### Installation
To install this extension please download the latest release and navigate to `about:addons` in Firefox. Now drag the `.xpi` file onto Firefox and Firefox should add that extension to your extension list.

##### Signed version (Mozilla/AOM) can be found in releases. I am always happy about suggestions/pull-requests as I do not know JS or anything Firefox Extensions related.

## !IMPORTANT!
This extension is only ment to be used as a means to an end! It is in no way perfect or performant! Furthermore it sends data every second while it isn't even sure if anybody listens!
