import Repeat from './Repeat'
import DelayFor from './DelayFor'

class KeyLikeRepeat<K> extends Repeat<K> {

  private static promiseFor(delay: number) {
    return new Promise((resolve) => setTimeout(resolve, delay))
  }

  private keysetInRepeating = new Set()

  constructor(private beginning: number = DelayFor.beginning,
              private gapping: number = DelayFor.gapping,
              repeating: number = DelayFor.repeating) {
    super(repeating)
  }

  public async start(key: K, callback: () => void) {

    if (this.keysetInRepeating.has(key)) return
    this.keysetInRepeating.add(key)
    await KeyLikeRepeat.promiseFor(this.beginning)
    callback()

    if (!this.keysetInRepeating.has(key)) return
    await KeyLikeRepeat.promiseFor(this.gapping)

    if (!this.keysetInRepeating.has(key)) return
    super.start(key, callback)
  }

  public stop(key: K) {
    this.keysetInRepeating.delete(key)
    super.stop(key)
  }
}

export default KeyLikeRepeat
