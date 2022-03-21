let args = require('cutieargs');

args.describe([
    ['--example', '-e', 'This is an example of a description of an argument']
]);

console.log('example: ', Args.example);