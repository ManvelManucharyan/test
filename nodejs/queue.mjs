/**
 * queue receives the stack of async tasks and executes it in a sync manere
 * @param {Array} stack of tasks
 * @returns {Array} results of queued tasks
 */
export async function queue(stack = []) {
	const results = [];

	for (const task of stack) {
	  const result = await task();
	  results.push(result);
	}
  
	return results;
}
