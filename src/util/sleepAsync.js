const sleepAsync = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export default sleepAsync
