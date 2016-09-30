import chai from 'chai'
import midi from '../lib/midi'

chai.expect()

const expect = chai.expect

describe('MIDI Library', function () {
  describe('#loadScript.add()', function () {
    it('should be ok', () => {
      midi.loadScript.add({
        url: "../src/index.js",
        onsuccess: function() {
          expect(midi.name).to.be.equal('Library')
          console.log(1)
        }
      })
    })
  })
})
