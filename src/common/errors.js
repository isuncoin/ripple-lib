'use strict';
const util = require('util');

class RippleError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    Error.captureStackTrace(this, this.constructor.name);
  }

  toString() {
    let result = '[' + this.name + '(' + this.message;
    if (this.data) {
      result += ', ' + util.inspect(this.data);
    }
    result += ')]';
    return result;
  }

  /* console.log in node uses util.inspect on object, and util.inspect allows
  us to cutomize its output:
  https://nodejs.org/api/util.html#util_custom_inspect_function_on_objects */
  inspect() {
    return this.toString();
  }
}

class RippledError extends RippleError {}

class UnexpectedError extends RippleError {}

class LedgerVersionError extends RippleError {}

class ConnectionError extends RippleError {}

class NotConnectedError extends ConnectionError {}

class DisconnectedError extends ConnectionError {}

class TimeoutError extends ConnectionError {}

class ResponseFormatError extends ConnectionError {}

class ValidationError extends RippleError {}

class NotFoundError extends RippleError {
  constructor(message) {
    super(message || 'Not found');
  }
}

class MissingLedgerHistoryError extends RippleError {
  constructor(message) {
    super(message || 'Server is missing ledger history in the specified range');
  }
}

class PendingLedgerVersionError extends RippleError {
  constructor(message) {
    super(message || 'maxLedgerVersion is greater than server\'s'
      + ' most recent validated ledger');
  }
}

module.exports = {
  RippleError,
  UnexpectedError,
  ConnectionError,
  RippledError,
  NotConnectedError,
  DisconnectedError,
  TimeoutError,
  ResponseFormatError,
  ValidationError,
  NotFoundError,
  PendingLedgerVersionError,
  MissingLedgerHistoryError,
  LedgerVersionError
};
