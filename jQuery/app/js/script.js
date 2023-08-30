// audio context
const AudioContext = window.AudioContext || window.webkitAudioContext
const audioCtx = new AudioContext()
// audio sources
const audioTags = document.querySelectorAll('.clip')
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
const display = document.querySelector('#display')

// press style
function pressStyle(elem) {
    elem.classList.toggle('hover')
    elem.classList.toggle('pressed')
    setTimeout(() => {
        elem.classList.toggle('pressed')
        elem.classList.toggle('hover')
    }, 100)
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

const kitSelTag = document.querySelector('.kit-select')
let nextKitI = 0
function nextKit() {
    for (let i = 0; i < kits[nextKitI].tracks.length; i++) {
        audioTags[i].setAttribute(
            'src',
            kits[nextKitI].directory + kits[nextKitI].tracks[i].source
        )
        // set description
        audioTags[i].setAttribute('data-description', kits[nextKitI].tracks[i].description)
    }
    // loop
    if (nextKitI < kits.length - 1) {
        nextKitI++
    } else {
        nextKitI = 0
    }
}
kitSelTag.addEventListener('click', () => {
    nextKit(nextKitI)
    // display
    pressStyle(kitSelTag)
    kitSelTag.textContent = kits[nextKitI].name
})
nextKit(nextKitI)

// volume
const volumeTag = document.querySelector('#volume')
volumeTag.addEventListener('input', () => {
    gainNode.gain.value = volumeTag.value
    // display 
    display.textContent = `Volume: ${Math.round(volumeTag.value * 100)}%`
})

// drum pads
const drumPadTags = document.querySelectorAll('.drum-pad')
for (let i = 0; i < drumPadTags.length; i++) {
    drumPadTags[i].addEventListener('click', () => {
        if (audioCtx.state === 'suspended') {
            audioCtx.resume()
        }
        audioTags[i].load()
        audioTags[i].play()
        // display
        pressStyle(drumPadTags[i])
        display.textContent = audioTags[i].dataset.description
    })
}
for (let i = 0; i < drumPadTags.length; i++) {
    window.addEventListener('keydown', (e) => {
        if (e.which === drumPadTags[i].textContent.charCodeAt(0)) {
            if (audioCtx.state === 'suspended') {
                audioCtx.resume()
            }
            audioTags[i].load()
            audioTags[i].play()
            // display
            pressStyle(drumPadTags[i])
            display.textContent = audioTags[i].dataset.description
        }
    })
}
