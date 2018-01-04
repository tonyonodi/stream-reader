var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/**
 * A streaming, character code-based string reader
 */

var StreamReader = function () {
	function StreamReader(string, start, end) {
		classCallCheck(this, StreamReader);

		if (end == null && typeof string === 'string') {
			end = string.length;
		}

		this.string = string;
		this.pos = this.start = start || 0;
		this.end = end;
	}

	/**
  * Returns true only if the stream is at the end of the file.
  * @returns {Boolean}
  */


	createClass(StreamReader, [{
		key: 'eof',
		value: function eof() {
			return this.pos >= this.end;
		}

		/**
   * Creates a new stream instance which is limited to given `start` and `end`
   * range. E.g. its `eof()` method will look at `end` property, not actual
   * stream end
   * @param  {Point} start
   * @param  {Point} end
   * @return {StreamReader}
   */

	}, {
		key: 'limit',
		value: function limit(start, end) {
			return new this.constructor(this.string, start, end);
		}

		/**
   * Returns the next character code in the stream without advancing it.
   * Will return NaN at the end of the file.
   * @returns {Number}
   */

	}, {
		key: 'peek',
		value: function peek() {
			return this.string.charCodeAt(this.pos);
		}

		/**
   * Returns the next character in the stream and advances it.
   * Also returns <code>undefined</code> when no more characters are available.
   * @returns {Number}
   */

	}, {
		key: 'next',
		value: function next() {
			if (this.pos < this.string.length) {
				return this.string.charCodeAt(this.pos++);
			}
		}

		/**
   * `match` can be a character code or a function that takes a character code
   * and returns a boolean. If the next character in the stream 'matches'
   * the given argument, it is consumed and returned.
   * Otherwise, `false` is returned.
   * @param {Number|Function} match
   * @returns {Boolean}
   */

	}, {
		key: 'eat',
		value: function eat(match) {
			var ch = this.peek();
			var ok = typeof match === 'function' ? match(ch) : ch === match;

			if (ok) {
				this.next();
			}

			return ok;
		}

		/**
   * Repeatedly calls <code>eat</code> with the given argument, until it
   * fails. Returns <code>true</code> if any characters were eaten.
   * @param {Object} match
   * @returns {Boolean}
   */

	}, {
		key: 'eatWhile',
		value: function eatWhile(match) {
			var start = this.pos;
			while (!this.eof() && this.eat(match)) {}
			return this.pos !== start;
		}

		/**
   * Backs up the stream n characters. Backing it up further than the
   * start of the current token will cause things to break, so be careful.
   * @param {Number} n
   */

	}, {
		key: 'backUp',
		value: function backUp(n) {
			this.pos -= n || 1;
		}

		/**
   * Get the string between the start of the current token and the
   * current stream position.
   * @returns {String}
   */

	}, {
		key: 'current',
		value: function current() {
			return this.substring(this.start, this.pos);
		}

		/**
   * Returns substring for given range
   * @param  {Number} start
   * @param  {Number} [end]
   * @return {String}
   */

	}, {
		key: 'substring',
		value: function substring(start, end) {
			return this.string.slice(start, end);
		}

		/**
   * Creates error object with current stream state
   * @param {String} message
   * @return {Error}
   */

	}, {
		key: 'error',
		value: function error(message) {
			var err = new Error(message + ' at char ' + (this.pos + 1));
			err.originalMessage = message;
			err.pos = this.pos;
			err.string = this.string;
			return err;
		}
	}]);
	return StreamReader;
}();

export default StreamReader;
