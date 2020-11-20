# multiSort
Javascript function to help sort iterables by multiple criteria.

## Usage

```js
sortSpecs = []
iterable.sort(multiSort(sortSpecs))
```

`sortSpecs` is a list which can contain:
 - Object: sort spec ( `js{ sortBy: String, Number, Function, reverse: bool }` )
 - String: key for a list of objects
 - Number: index for a list of arrays
 - Function: `(arrayItem) => <rank of arrayItem>` (lower numbers have higher rank)

### Sorting a list of objects
	const records = [ { name: 'Foo', age: 26, wins: 4 }, ... ];
	records.sort(multiSort([
		'-name',                          	 // Sort by name, descending
		{ sortBy: 'age', reverse: true }, 	 // then by age, descending
		(record) => record.wins,			 // then by wins, ascending (same as 'wins')
		{ sortBy: (r) => (r.wins / r.age) }, // then by wins per age
		{ sortBy: '-age', reverse: false },  // then by age again, ascending (reverse prop overrides -)
	]));
 
### Sorting the same data represented as an array
	const records = [ ['Foo', 26, 4], ... ];
	records.sort(multiSort([
		-0,                          	  // Sort by name, descending
		{ sortBy: 1, reverse: true }, 	  // then by age, descending
		(record) => record[2],		      // then by wins, ascending (same as 'wins')
		{ sortBy: (r) => (r[2] / r[1]) }, // then by wins per age
		{ sortBy: -1, reverse: false },   // then by age again, ascending (reverse prop overrides -)
	]));

## TODO

 - Dotted object property notation: '-prop1.prop2.-prop3'
 