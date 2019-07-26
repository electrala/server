// what is error
/**
 Error object containgi user friendly error messaging
 HTTP code status

 @param {string}
 
 */
// What is a constructor,
// What is a constructor?
// WHat is a super?
// Look up error practices

class ErrHTTP extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
  }
}

module.exports = ErrHTTP;
