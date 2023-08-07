// to do's

// display
const display = document.querySelector('#display')

// audio context
const AudioContext = window.AudioContext || window.webkitAudioContext
const audioCtx = new AudioContext()

// audio sources
const audioElems = document.querySelectorAll('.clip')
const tracks = []
for (let i = 0; i < audioElems.length; i++) {
    tracks.push(audioCtx.createMediaElementSource(audioElems[i]))
}

const kits = [
    {
        name: 'Kit 1',
        directory: 'audio/audio_set_1/',
        sources: [
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
        name: 'Kit 2',
        directory: 'audio/audio_set_2/',
        sources: [
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

const kitSelect = document.querySelector('#kit-select')

let currentKit = 0

const controller = new AbortController()
const signal = controller.signal

function nextKit() {
    controller.abort()

    kitSelect.textContent = kits[currentKit].name

    for (let i = 0; i < kits[currentKit].sources.length; i++) {
        audioElems[i].setAttribute(
            'src',
            kits[currentKit].directory + kits[currentKit].sources[i].source
        )

        audioElems[i].setAttribute('data-description', kits[currentKit].sources[i].description)
    }

    if (currentKit < kits.length - 1) {
        currentKit++
    } else {
        currentKit = 0
    }

    kitSelect.addEventListener('click', nextKit, signal)
}

nextKit(currentKit)

// gain
const gain = audioCtx.createGain()
const volume = document.querySelector('#volume')

volume.addEventListener('input', () => {
    gain.gain.value = volume.value

    display.textContent = `Volume: ${Math.round(volume.value * 100)}%`
})

// destination
const destination = audioCtx.destination

// connect
for (let i = 0; i < tracks.length; i++) {
    tracks[i].connect(gain).connect(destination)
}

// pads 
const drumPads = document.querySelectorAll('.drum-pad')

for (let i = 0; i < drumPads.length; i++) {
    drumPads[i].addEventListener('click', () => {
        if (audioCtx.state === 'suspended') {
            audioCtx.resume()
        }

        audioElems[i].load()
        audioElems[i].play()

        display.textContent = audioElems[i].dataset.description
    })
}

const pads = document.querySelectorAll('.pad')
for (let i = 0; i < drumPads.length; i++) {
    window.addEventListener('keydown', (e) => {
        if (e.which === pads[i].textContent.charCodeAt(0)) {
            if (audioCtx.state === 'suspended') {
                audioCtx.resume()
            }

            audioElems[i].load()
            audioElems[i].play()

            display.textContent = audioElems[i].dataset.description
        }
    })
}
