# multiSort
Javascript function to help sort iterables by multiple criteria.

## Usage

```javascript
sortSpecs = []
iterable.sort(multiSort(sortSpecs))
```

`sortSpecs` is a list which can contain:
 - Object: sort spec
 ```javascript
 { sortBy: String, Number, Function, reverse: bool }
 ```
 - String: key for a list of objects
 - Number: index for a list of arrays
 - Function (lower numbers have higher rank):
 ```javascript
 (arrayItem) => <rank of arrayItem>`
 ```

### Sorting a list of objects

```javascript
const records = [ { name: 'Foo', age: 26, wins: 4 }, ... ]
records.sort(multiSort([
    // Sort by name, descending
    '-name',
    // then by age, descending
    { sortBy: 'age', reverse: true },
    // then by wins, ascending (same as 'wins')
    (record) => record.wins,
    // then by wins per age
    { sortBy: (r) => (r.wins / r.age) },
    // then by age again, ascending (reverse prop overrides -)
    { sortBy: '-age', reverse: false },
]))
```

### Sorting the same data represented as an array

```javascript
const records = [ ['Foo', 26, 4], ... ]
records.sort(multiSort([
    // Sort by name, descending (due to the -sign, even for 0)
    -0,
    // then by age, descending
    { sortBy: 1, reverse: true },
    // then by wins, ascending (same as 'wins')
    (record) => record[2],
    // then by wins per age
    { sortBy: (r) => (r[2] / r[1]) },
    // then by age again, ascending (reverse prop overrides -)
    { sortBy: -1, reverse: false },
]))
```

## TODO

 - Dotted object property notation: '-prop1.prop2.-prop3'
