// audio context
const AudioContext = window.AudioContext || window.webkitAudioContext
const audioCtx = new AudioContext()
// audio sources
const audioTags = $('.clip')
const sources = []
for (let i = 0; i < audioTags.length; i++) {
    sources.push(audioCtx.createMediaElementSource(audioTags[i]))
}
// gain
const gainNode = audioCtx.createGain()
// destination
const destination = audioCtx.destination
// connect
for (let i = 0; i < sources.length; i++) {
    sources[i].connect(gainNode).connect(destination)
}

// display
const display = $('#display')

// press style
function pressStyle(elem) {
    elem.toggleClass(['hover', 'pressed'])
    setTimeout(() => { elem.toggleClass(['pressed', 'hover']) }, 100)
}

// kits
const kits = [
    {
        directory: 'audio/Kit_1/',
        name: 'Kit 1',
        tracks: [
            {
                source: 'blaster.mp3',
                description: 'Blaster'
            },
            {
                source: 'click.mp3',
                description: 'Click'
            },
            {
                source: 'point.mp3',
                description: 'Point'
            },
            {
                source: 'start.mp3',
                description: 'Start'
            },
            {
                source: 'synth_1.mp3',
                description: 'Synth 1'
            },
            {
                source: 'synth_2.mp3',
                description: 'Synth 2'
            },
            {
                source: 'beat_1.wav',
                description: 'Beat 1'
            },
            {
                source: 'beat_2.wav',
                description: 'Beat 2'
            },
            {
                source: 'beat_3.wav',
                description: 'Beat 3'
            }
        ]
    },
    {
        directory: 'audio/Kit_2/',
        name: 'Kit 2',
        tracks: [
            {
                source: 'guitar_a.mp3',
                description: 'Guitar A'
            },
            {
                source: 'guitar_b.mp3',
                description: 'Guitar B'
            },
            {
                source: 'guitar_c.mp3',
                description: 'Guitar C'
            },
            {
                source: 'guitar_d.mp3',
                description: 'Guitar D'
            },
            {
                source: 'guitar_e.mp3',
                description: 'Guitar E'
            },
            {
                source: 'guitar_f.mp3',
                description: 'Guitar F'
            },
            {
                source: 'guitar_g.mp3',
                description: 'Guitar G'
            },
            {
                source: 'snare_drum.mp3',
                description: 'Snare Drum'
            },
            {
                source: 'bass_drum.mp3',
                description: 'Bass Drum'
            }
        ]
    }
]

const kitSelTag = $('.kit-select')
let nextKitI = 0
function nextKit() {
    for (let i = 0; i < kits[nextKitI].tracks.length; i++) {
        audioTags.eq(i).attr('src', kits[nextKitI].directory + kits[nextKitI].tracks[i].source).data('description', kits[nextKitI].tracks[i].description)
    }
    // display
    pressStyle(kitSelTag)
    kitSelTag.text(kits[nextKitI].name)
    // loop
    if (nextKitI < kits.length - 1) {
        nextKitI++
    } else {
        nextKitI = 0
    }
}
kitSelTag.click(() => {
    nextKit(nextKitI)
})
nextKit(nextKitI)

// volume
const volumeTag = $('#volume')
volumeTag.on('input', () => {
    gainNode.gain.value = volumeTag.val()
    // display 
    display.text(`Volume: ${Math.round(volumeTag.val() * 100)}%`)
})

// drum pads
const drumPadTags = $('.drum-pad')
function playTrack(i) {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume()
    }
    audioTags[i].load()
    audioTags[i].play()
    // display
    pressStyle(drumPadTags.eq(i))
    display.text(audioTags.eq(i).data('description'))
}
for (let i = 0; i < drumPadTags.length; i++) {
    drumPadTags.eq(i).click(() => {
        playTrack(i)
    })
}
for (let i = 0; i < drumPadTags.length; i++) {
    $(window).keydown((e) => {
        if (e.which === drumPadTags.eq(i).text().charCodeAt(0)) {
            playTrack(i)
        }
    })
}
