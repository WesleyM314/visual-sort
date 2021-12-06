export const bubbleSortAnimations = array =>
{
	const animations = [];
	const arrCopy = array.slice();

	// Sort
	let len = arrCopy.length;
	let i, j;
	for (i = 0; i < len - 1; i++)
	{
		for (j = 0; j < len - i - 1; j++)
		{
			// console.log(`i: ${i}, j: ${j}`);
			if (arrCopy[j] > arrCopy[j + 1])
			{
				// Record animations
				// Set bar at index j to value at j+1
				animations.push([j, arrCopy[j + 1]]);
				// Set bar at index j+1 to value at j
				animations.push([j + 1, arrCopy[j]]);

				swap(arrCopy, j, j + 1);
			}
		}
	}
	// console.log(arrCopy);
	console.log("bubble sort done");
	return animations;
}

export const selectionSortAnimations = array =>
{
	const animations = [];
	const arrCopy = array.slice();
	let len = arrCopy.length;

	let i, j, minIdx;
	for (i = 0; i < len - 1; i++)
	{
		// Find min value in unsorted portion
		minIdx = i;
		for (j = i + 1; j < len; j++)
		{
			if (arrCopy[j] < arrCopy[minIdx])
				minIdx = j;
		}
		// Record animations
		animations.push([minIdx, arrCopy[i]]);
		animations.push([i, arrCopy[minIdx]]);
		// Swap minimum found value
		swap(arrCopy, minIdx, i);
	}
	console.log("selection sort done");
	return animations;
}

export const heapSortAnimations = array =>
{
	const animations = [];
	const arrCopy = array.slice();
	let len = arrCopy.length;

	// console.log("Unsorted");
	// console.log(arrCopy);

	// Build heap
	for (let i = Math.floor(len / 2) - 1; i >= 0; i--)
	{
		heapify(animations, arrCopy, len, i);
	}

	// Extract from heap one at a time
	for (let i = len - 1; i > 0; i--)
	{
		// Move current root to end
		animations.push([0, arrCopy[i]]);
		animations.push([i, arrCopy[0]]);
		swap(arrCopy, 0, i);
		// Heapify reduced heap
		heapify(animations, arrCopy, i, 0);
	}
	// console.log("Sorted");
	// console.log(arrCopy);
	return animations;
}

// Heapify a subtree rooted with node i
function heapify(animations, arr, len, i)
{
	let largest = i;	// Init largest as root
	let left = 2 * i + 1;	// Left
	let right = 2 * i + 2;	// Right

	// If left larger than root
	if (left < len && arr[left] > arr[largest])
	{
		largest = left;
	}
	// If right larger than current largest
	if (right < len && arr[right] > arr[largest])
	{
		largest = right;
	}
	// If largest is not root, swap
	if (largest !== i)
	{
		animations.push([i, arr[largest]]);
		animations.push([largest, arr[i]]);
		swap(arr, i, largest);

		// Recursively heapify the altered sub-tree
		heapify(animations, arr, len, largest);
	}
}

export const mergeSortAnimations = array =>
{
	// console.log("START");
	// console.log(array);
	const animations = [];
	const arrCopy = array.slice();
	let len = arrCopy.length;

	mergeSort(animations, array, arrCopy, 0, len - 1);
	// console.log("END");
	// console.log(array);
	return animations;
}

function mergeSort(animations, arr, arrCopy, l, r)
{
	// console.log("MERGE SORT " + arr.slice(l, r + 1));
	// Base case
	if (l >= r)
	{
		// console.log("BASE CASE");
		return;
	}
	// let m = l + parseInt((r-l)/2);
	// let m = l + Math.floor((r - l) / 2);
	let m = Math.floor((l + r) / 2);
	// console.log(arr.slice(l, m + 1) + " | " + arr.slice(m + 1, r + 1));
	// Call recursively on each half of arr
	mergeSort(animations, arr, arrCopy, l, m);
	mergeSort(animations, arr, arrCopy, m + 1, r);
	// Merge
	merge(animations, arr, arrCopy, l, m, r);
}

function merge(animations, arr, arrCopy, l, m, r)
{
	// console.log("MERGE " + arr.slice(l, m + 1) + " AND " + arr.slice(m + 1, r + 1));
	// console.log("MERGE " + arrCopy.slice(l, m + 1) + " AND " + arrCopy.slice(m + 1, r + 1));
	// console.log(`l: ${l}, m: ${m}, r: ${r}`);
	// console.log(arr.slice(l, r + 1));

	let arr2 = arr.slice();

	let i = l;
	let j = m + 1;
	let k = l;

	while(i <= m && j <= r) {
		// console.log(`Comparing ${arr2[i]} and ${arr2[j]}`);
		if(arr2[i] <= arr2[j]) {
			// If overwriting, add to animations
			animations.push([k, arr2[i]]);
			arr[k++] = arr2[i++];
		} else {
			animations.push([k, arr2[j]]);
			arr[k++] = arr2[j++];
		}
	}

	while(i <= m) {
		animations.push([k, arr2[i]]);
		arr[k++] = arr2[i++];
	}

	// console.log("AFTER MERGE: " + arr.slice(l, r + 1));

}

function swap(arr, a, b)
{
	let temp = arr[a];
	arr[a] = arr[b];
	arr[b] = temp;
}