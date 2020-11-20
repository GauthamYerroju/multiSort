/**
 * Generates a comparator function to pass to sort() based on listed criteria
 * @param  [] sortSpecs
 * 			This is a list which can contain:
 * 			 - Object: sort spec ( { sortBy: String, Number, Function, reverse: bool } )
 * 			 - String: key for a list of objects
 * 			 - Number: index for a list of arrays
 *  		 - Function: (arrayItem) => <rank of arrayItem> (lower numbers have higher rank)
 * 
 * 			Usage:
 * 			    1. Sorting a list of objects
 * 				const records = [ { name: 'Foo', age: 26, wins: 4 }, ... ];
 * 				records.sort(multiSort([
 * 					'-name',                          	 // Sort by name, descending
 * 					{ sortBy: 'age', reverse: true }, 	 // then by age, descending
 * 					(record) => record.wins,			 // then by wins, ascending (same as 'wins')
 * 					{ sortBy: (r) => (r.wins / r.age) }, // then by wins per age
 * 					{ sortBy: '-age', reverse: false },  // then by age again, ascending (reverse prop overrides -)
 * 				]));
 * 
 * 				2. Sorting the same data represented as an array
 * 				const records = [ ['Foo', 26, 4], ... ];
 * 				records.sort(multiSort([
 * 					-0,                          	  // Sort by name, descending
 * 					{ sortBy: 1, reverse: true }, 	  // then by age, descending
 * 					(record) => record[2],		      // then by wins, ascending (same as 'wins')
 * 					{ sortBy: (r) => (r[2] / r[1]) }, // then by wins per age
 * 					{ sortBy: -1, reverse: false },   // then by age again, ascending (reverse prop overrides -)
 * 				]));
 */
export function multiSort(sortSpecs) {
	return (a, b) => {
		let result = 0;
		for (const sortSpec of sortSpecs) {
			// Parse spec and prep vars
			let sortBy = null;
			let reverse = null;
			if (typeof sortSpec === 'object') {
				sortBy = sortSpec.sortBy;
				reverse = sortSpec.reverse;
			} else {
				sortBy = sortSpec;
			}
			// Determine ranks and detect reverse
			let aRank = a;
			let bRank = b;
			if (typeof sortBy === 'function') {
				aRank = sortBy(a);
				bRank = sortBy(b);
			} else if (typeof sortBy === 'string') {
				if (sortBy.startsWith('-')) {
					sortBy = sortBy.substring(1);
					if (reverse === null) {
						reverse = true;
					}
				}
				aRank = a[sortBy];
				bRank = b[sortBy];
			} else if (typeof sortBY === 'number') {
				if (sortBy <= 0) {
					if (reverse === null) {
						reverse = Object.is(-0, sortBy) || (sortBy < 0);
					}
					sortBy = -sortBy;
				}
				aRank = a[sortBy];
				bRank = b[sortBy];
			}
			// Calculate result
			result = aRank < bRank ? -1 : (aRank > bRank ? 1 : 0);
			// Non-zero means values are sortable, no need to sort by the next criteria.
			if (result != 0) {
				break;
			}
		}
		return result;
	};
}
