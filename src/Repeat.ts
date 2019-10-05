import DelayFor from "./DelayFor"

class Repeat<K> {

  protected timerIdsByKey = new Map<K, number>()

  constructor(private repeating: number = DelayFor.repeating) {
  }

  public start(key: K, callback: () => void) {

    if (this.timerIdsByKey.has(key)) return
    const timerId = window.setInterval(callback, this.repeating)
    this.timerIdsByKey.set(key, timerId)
  }

  public stop(key: K) {
    const timerId = this.timerIdsByKey.get(key)
    window.clearInterval(timerId)
    this.timerIdsByKey.delete(key)
  }
}

export default Repeat


// # TODO:
// - setInterval of window or NodeJS?
// - naming: repeating?
