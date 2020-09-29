import { Howl } from 'howler';

const soundPlay = (src) => {
  const sound = new Howl({ src })
  sound.play()
}

export default soundPlay
