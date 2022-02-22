import React from "react";
import "../sortingAlgorithms/sortingAlgorithms.js";
import
	{
		bubbleSortAnimations,
		heapSortAnimations,
		selectionSortAnimations
	} from "../sortingAlgorithms/sortingAlgorithms.js";
import "./SortingVisualizer.css";

// Animation speed
const ANIMATION_SPEED_MS = 0.5;

// Bars in array
const NUM_ARRAY_BARS = 360;

// const NUM_COLORS = 100;
// const colorGradient = new Gradient();
// colorGradient.setGradient(
// 	"#ff0000",
// 	"#ff6600",
// 	"fff200",
// 	"10ff00",
// 	"00e1ff",
// 	"000cff",
// 	"ae00ff"
// );
// colorGradient.setMidpoint(NUM_COLORS);
// const colorArr = colorGradient.getArray();
// console.log(colorArr);

export class SortingVisualizer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			array: [],
		};
	}

	componentDidMount() {
		this.resetArray();
	}

	resetArray() {
		let array = Array(NUM_ARRAY_BARS)
			.fill()
			.map((x, i) => i);

		function shuffle(arr) {
			let i, j, tmp;
			for (i = arr.length - 1; i > 0; i--) {
				j = Math.floor(Math.random() * (i + 1));
				tmp = arr[i];
				arr[i] = arr[j];
				arr[j] = tmp;
			}
			return arr;
		}

		array = shuffle(array);

		// for (let i = 0; i < NUM_ARRAY_BARS; i++) {
		// 	array.push(randomIntInRange(0, NUM_COLORS - 1));
		// 	// array.push(randColor());
		// }
		this.setState({ array });
	}

	bubbleSort() {
		const animations = bubbleSortAnimations(this.state.array);
		// console.log(animations);
		// Go through animations
		for (let i = 0; i < animations.length; i++) {
			const arrBars = document.getElementsByClassName("array-bar");
			const [idx, val] = animations[i];
			const barStyle = arrBars[idx].style;
			// const color = colorArr[val]; // New color
			const color = `hsl(${val}, 100%, 50%)`;
			setTimeout(() => {
				barStyle.backgroundColor = color;
			}, i * ANIMATION_SPEED_MS);
		}
	}

	selectionSort() {
		const animations = selectionSortAnimations(this.state.array);
		// Go through animations
		for (let i = 0; i < animations.length; i++) {
			const arrBars = document.getElementsByClassName("array-bar");
			const [idx, val] = animations[i];
			const barStyle = arrBars[idx].style;
			// const color = colorArr[val]; // New color
			const color = `hsl(${val}, 100%, 50%)`;
			setTimeout(() => {
				barStyle.backgroundColor = color;
			}, i * ANIMATION_SPEED_MS);
		}
	}

	heapSort() {
		const animations = heapSortAnimations(this.state.array);
		// Go through animations
		for (let i = 0; i < animations.length; i++) {
			const arrBars = document.getElementsByClassName("array-bar");
			const [idx, val] = animations[i];
			const barStyle = arrBars[idx].style;
			// const color = colorArr[val]; // New color
			const color = `hsl(${val}, 100%, 50%)`;
			setTimeout(() => {
				barStyle.backgroundColor = color;
			}, i * ANIMATION_SPEED_MS);
		}
	}

	sortTest() {}

	render() {
		const { array } = this.state;

		return (
			<>
				<div className="button-row">
					<button onClick={() => this.resetArray()}>Randomize</button>
					<button onClick={() => this.bubbleSort()}>Bubble Sort</button>
					<button onClick={() => this.selectionSort()}>Selection Sort</button>
					<button onClick={() => this.heapSort()}>Heap Sort</button>
				</div>
				<div className="array-container">
					{array.map((value, idx) => (
						<div
							className="array-bar"
							key={idx}
							style={{
								backgroundColor: `hsl(${value}, 100%, 50%)`,
								// height: `${75}vh`,
							}}
						></div>
					))}
				</div>
			</>
		);
	}
}

/**
 * Returns a random int from [min, max] inclusive
 * @param {min} min Minimum bound
 * @param {max} max Maximum bound
 */
function randomIntInRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

// function randColor() {
// 	return Math.floor(Math.random() * 0xffffff);
// }
