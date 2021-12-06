import React from "react";
import Gradient from "javascript-color-gradient";
import "./SortingVisualizer.css";
import "../sortingAlgorithms/sortingAlgorithms.js";
import {
	bubbleSortAnimations,
	heapSortAnimations,
	mergeSortAnimations,
	selectionSortAnimations,
} from "../sortingAlgorithms/sortingAlgorithms.js";

// Animation speed
const ANIMATION_SPEED_MS = 0.5;

// Bars in array
const NUM_ARRAY_BARS = 512;

const NUM_COLORS = 400;
const colorGradient = new Gradient();
colorGradient.setGradient(
	"#ff0000",
	"#ff6600",
	"fff200",
	"10ff00",
	"00e1ff",
	"000cff",
	"ae00ff"
);
colorGradient.setMidpoint(NUM_COLORS);
const colorArr = colorGradient.getArray();
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
		const array = [];
		for (let i = 0; i < NUM_ARRAY_BARS; i++) {
			array.push(randomIntInRange(0, NUM_COLORS - 1));
			// array.push(randColor());
		}
		this.setState({ array });
	}

	bubbleSort() {
		const animations = bubbleSortAnimations(this.state.array);
		this.runAnimations(animations, ANIMATION_SPEED_MS);
	}

	selectionSort() {
		const animations = selectionSortAnimations(this.state.array);
		this.runAnimations(animations, ANIMATION_SPEED_MS);
	}

	heapSort() {
		const animations = heapSortAnimations(this.state.array);
		this.runAnimations(animations, ANIMATION_SPEED_MS);
	}

	mergeSort() {
		const animations = mergeSortAnimations(this.state.array);
		this.runAnimations(animations, 2);
	}

	runAnimations(animations, speed) {
		for (let i = 0; i < animations.length; i++) {
			const arrBars = document.getElementsByClassName("array-bar");
			const [idx, val] = animations[i];
			const barStyle = arrBars[idx].style;
			const color = colorArr[val]; // New color
			setTimeout(() => {
				barStyle.backgroundColor = color;
			}, i * speed);
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
					<button onClick={() => this.mergeSort()}>Merge Sort</button>
					<button onClick={() => this.heapSort()}>Quick Sort</button>
				</div>
				<div className="array-container">
					{array.map((value, idx) => (
						<div
							className="array-bar"
							key={idx}
							style={{
								backgroundColor: colorArr[value],
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
