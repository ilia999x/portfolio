export function logger(message) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(message);
    }
  }