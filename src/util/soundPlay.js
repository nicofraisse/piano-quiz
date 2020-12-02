import { Howl, Howler } from 'howler'

export const soundPlay = (src) => {
  const sound = new Howl({ src })
  sound.play()
}

export const loadSounds = (srcs) => {
  return new Promise((resolve, reject) => {
    let loadedSounds = 0
    Object.keys(srcs).forEach((key) => {
      let src = srcs[key]
      const sound = new Howl({ src })
      sound.play()
      sound.on('end', () => {
        loadedSounds += 1
        if (loadedSounds === Object.keys(srcs).length) {
          resolve(loadedSounds)
        }
      })
    })
  })
}
