# midi.js
A modern JavaScript port of MIDI.js.

## Basic Examples
- [MIDI Player](http://sunebear.github.io/midi.js/MIDIPlayer.html)
- [Whitney Music Box](http://sunebear.github.io/midi.js/WhitneyMusicBox.html)

## Installtion
``` bash
$ npm install midi.js
```

## Import
``` JavaScript
import MIDI from 'midi.js'
```

## Usage & APi
#### [loader.js](./src/loader.js) - Decides which framework is best to use

```javascript
// interface to download soundfont, then execute callback
MIDI.loadPlugin(onsuccess)
// simple example to get started
MIDI.loadPlugin({
  instrument: "acoustic_grand_piano", // or the instrument code 1 (aka the default)
  instruments: [ "acoustic_grand_piano", "acoustic_guitar_nylon" ], // or multiple instruments
  onsuccess: function() { }
});
```

#### [plugins/webaudio.js](./src/plugins/webaudio.js) - Controls MIDI output

```javascript
MIDI.noteOn(channel, note, velocity, delay)
MIDI.noteOff(channel, note, delay)
MIDI.chordOn(channel, [note, note, note], velocity, delay)
MIDI.chordOff(channel, [note, note, note], delay)
MIDI.keyToNote = object // A0 => 21
MIDI.noteToKey = object // 21 => A0
```

#### [player.js](./src/player.js) - Plays MIDI stream

```javascript
MIDI.Player.currentTime = integer // time we are at now within the song.
MIDI.Player.endTime = integer // time when song ends.
MIDI.Player.playing = boolean // are we playing? yes or no.
MIDI.Player.loadFile(file, onsuccess) // load .MIDI from base64 or binary XML request.
MIDI.Player.start() // start the MIDI track (you can put this in the loadFile callback)
MIDI.Player.resume() // resume the MIDI track from pause.
MIDI.Player.pause() // pause the MIDI track.
MIDI.Player.stop() // stops all audio being played, and resets currentTime to 0.
```

#### Listener for when notes are played

```javascript
MIDI.Player.removeListener() // removes current listener.
MIDI.Player.addListener(function(data) { // set it to your own function!
  const now = data.now // where we are now
  const end = data.end // time when song ends
  const channel = data.channel // channel note is playing on
  const message = data.message // 128 is noteOff, 144 is noteOn
  const note = data.note // the note
  const velocity = data.velocity // the velocity of the note
  // then do whatever you want with the information!
})
```

#### Smooth animation interpolating between onMidiEvent calls

```javascript
MIDI.Player.clearAnimation(); // clears current animation.
MIDI.Player.setAnimation(function(data) {
  const now = data.now // where we are now
  const end = data.end // time when song ends
  const events = data.events // all the notes currently being processed
  // then do what you want with the information!
})
```
Refer to https://github.com/mudcube/MIDI.js#api for more details.


## License
[MIT](./LICENSE)
