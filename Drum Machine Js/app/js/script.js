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
        sources: [
            'audio/audio_set_1/blaster.mp3',
            'audio/audio_set_1/click.mp3',
            'audio/audio_set_1/point.mp3',
            'audio/audio_set_1/start.mp3',
            'audio/audio_set_1/synth.mp3',
            'audio/audio_set_1/synth_2.mp3',
            'audio/audio_set_1/beat_1.wav',
            'audio/audio_set_1/beat_2.wav',
            'audio/audio_set_1/beat_3.wav',
        ]
    },
    {
        name: 'Kit 2',
        sources: [
            'audio/audio_set_2/guitar_a.mp3',
            'audio/audio_set_2/guitar_b.mp3',
            'audio/audio_set_2/guitar_c.mp3',
            'audio/audio_set_2/guitar_d.mp3',
            'audio/audio_set_2/guitar_e.mp3',
            'audio/audio_set_2/guitar_f.mp3',
            'audio/audio_set_2/guitar_g.mp3',
            'audio/audio_set_2/snare_drum.mp3',
            'audio/audio_set_2/bass_drum.mp3'
        ]
    }
]

const kitSelect = document.querySelector('#kit_select')

let currentKit = 0

const controller = new AbortController()
const signal = controller.signal

function nextKit() {
    controller.abort()

    for (let i = 0; i < kits[currentKit].sources.length; i++) {
        audioElems[i].setAttribute('src', kits[currentKit].sources[i])
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

        display.textContent = drumPads[i].dataset.description
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

            display.textContent = drumPads[i].dataset.description
        }
    })
}
