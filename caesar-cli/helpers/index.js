/* eslint-disable no-process-exit */
const fs = require('fs');

module.exports = {
  parseInt: x => parseInt(x, 10),
  argsValidation: (action, shift) => {
    if (!JSON.stringify(action) || !shift) {
      process.stderr.write(
        'You need to pass all mandatory parameters \nProcess exit with code 1\n'
      );
      process.exit(1);
    }
  },
  pathValidation: (input, output) => {
    if (input) {
      fs.access(input, err => {
        if (err) {
          process.stderr.write(
            `No file present or unable to access - ${output}\nProcess exit with code 3\n`
          );
          process.exit(3);
        }
      });
    }
    if (output) {
      fs.access(output, err => {
        if (err) {
          process.stderr.write(
            `No file present or unable to access - ${output}\nProcess exit with code 3\n`
          );
          process.exit(3);
        }
      });
    }
  },
  errorHandler: input => {
    process.stderr.write(
      `No file present or unable to access - ${input}\nProcess exit with code 2\n`
    );
    process.exit(2);
  },
  caesarShiftEncode: (str, shift, action) => {
    if (action === 'decode') {
      shift = (26 - shift) % 26;
    }

    if (shift < 0) {
      return this.caesarShift(str, shift + 26);
    }

    let output = '';

    for (let i = 0; i < str.length; i++) {
      let c = str[i];

      if (c.match(/[a-z]/i)) {
        const code = str.charCodeAt(i);

        if (code >= 65 && code <= 90) {
          c = String.fromCharCode(((code - 65 + shift) % 26) + 65);
        } else if (code >= 97 && code <= 122) {
          c = String.fromCharCode(((code - 97 + shift) % 26) + 97);
        }
      }

      output += c;
    }

    return output;
  }
};
