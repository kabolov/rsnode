const { program } = require('commander');
const CaesarTransform = require('./helpers/transform');
const run = require('./helpers/run');

const { parseInt, argsValidation, pathValidation } = require('./helpers');
process.stdin.setEncoding('utf8');

program
  .option('-a, --action <type>', 'action type')
  .option('-s, --shift <number>', 'shift', parseInt)
  .option('-i, --input <value>', 'input file')
  .option('-o, --output <value>', 'output file');

program.parse(process.argv);

const { shift, input, output, action } = program;

const Transform = new CaesarTransform(shift, action);

argsValidation(action, shift);
pathValidation(input, output);

run(input, output, Transform);
