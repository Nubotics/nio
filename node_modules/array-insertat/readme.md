# array-insertAt [![Build Status](https://travis-ci.org/emiljohansson/array-insertat.svg?branch=master)](https://travis-ci.org/emiljohansson/array-insertat)

> Inserts an item at a specific position.

## Install

```
$ npm install --save array-insertat
```

## Usage

```js

var insertAt = require('array-insertat');
insertAt([1, 2], 3, 1);
// => [1, 3, 2]

```

## API
### insertAt(array, item, index)
#### array

Type: `array`

The array to modify.

#### item

Type: `item`

The item to add.

#### index

Type: `index`

Position where to modify the array.

## License

MIT © [Emil Johansson](http://emiljohansson.se)
