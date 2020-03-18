class Promise {
  constructor(fn) {
    this.onResolves = []
    this.onRejects = []
    this.status = 'PENDING'
    this.value = undefined
    this.reason = undefined

    const context = this
    function ifPending(cb) {
      if (context.status === 'PENDING') {
        return cb.call(context)
      }
    }

    function resolve(value) {
      ifPending(() => {
        this.value = value
        this.status = 'RESOLVED'
        this.onResolves.forEach(cb => cb())
      })
    }

    function reject(reason) {
      ifPending(() => {
        this.reason = reason
        this.status = 'REJECTED'
        this.onRejects.forEach(cb => cb())
      })
    }

    fn(resolve.bind(this), reject.bind(this))
  }

  then(onResolve, onReject) {
    const that = this
    return new Promise((resolve, reject) => {
      that.onResolves.push(() => {
        const value = onResolve(that.value)
        if (value instanceof Promise) {
          return value.then(resolve, reject)
        }
        return resolve(value)
      })
      that.onRejects.push(() => {
        const reason = onReject(that.reason)
        if (reason instanceof Promise) {
          return reason.then(resolve, reject)
        }
        return resolve(reason)
      })
    })
  }

  catch(fn) {
    const that = this
    return new Promise((resolve) => {
      that.onRejects.push(() => {
        try {
          const res = fn(that.reason)
          resolve(res)
        } catch (error) {
          resolve(error)
        }
      })
    })
  }
}
