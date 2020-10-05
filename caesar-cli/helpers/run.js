const { pipeline } = require('stream');
const fs = require('fs');
const { errorHandler } = require('./index');

const run = (input, output, transformStream) => {
  if (input) {
    if (output) {
      pipeline(
        fs.createReadStream(input),
        transformStream,
        fs.createWriteStream(output, { flags: 'a' }),
        err => {
          if (err) {
            if (err.code === 'ENOENT') errorHandler(input);
            else console.error('Something got wrong.', err);
          } else {
            process.stdout.write(
              `Your encoded file here ${__dirname}/${output}\n`
            );
          }
        }
      );
    } else {
      pipeline(
        fs.createReadStream(input),
        transformStream,
        process.stdout,

        err => {
          if (err) errorHandler(input);
        }
      );
    }
  } else if (output) {
    pipeline(
      process.stdin,
      transformStream,
      fs.createWriteStream(output, { flags: 'a' }),
      err => {
        if (err) {
          console.error('Something got wrong.', err);
        } else {
          process.stdout.write(
            `Your encoded file here ${__dirname}/${output}\n`
          );
        }
      }
    );
  } else {
    pipeline(process.stdin, transformStream, process.stdout, err => {
      console.log(err);
    });
  }
};

module.exports = run;
