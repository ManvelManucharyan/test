/**
 * compare the doc against query criterias
 * @param {object} doc
 * @param {object} query
 * @returns {boolean}
 */
export function compare(doc = {}, query = {}) {
	let queryValue, docValue
	for (const key in query) {
	  if (key === '$or') {
		const orConditions = query[key];
		for (const condition of orConditions) {
		  if (compare(doc, condition)) {
			return true; 
		  }
		}
	  } else {
		switch (key) {
		  case '_id':
			queryValue = query[key];
			docValue = doc[key];
			return queryValue === docValue;
		  case 'profile.age':
			queryValue = query[key];
			docValue = doc[key.split('.')[0]][key.split('.')[1]];
			if (typeof queryValue === 'object') {
			  const operator = Object.keys(queryValue)[0];
			  const value = queryValue[operator];
			  return operator === '$gte' && docValue >= value;
			} else {
			  return queryValue === docValue;
			}
		  default:
			return false;
		}
	  }
	}
	return false;
}
