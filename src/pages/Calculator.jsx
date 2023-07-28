import { useState } from "react";

const CalculatorData = [
	{
		id: "clear",
		value: "AC",
		is_operator: false,
	},
	{
		id: "divide",
		value: "/",
		is_operator: true,
	},
	{
		id: "multiply",
		value: "*",
		is_operator: true,
	},
	{
		id: "seven",
		value: "7",
		is_operator: false,
	},
	{
		id: "eight",
		value: "8",
		is_operator: false,
	},
	{
		id: "nine",
		value: "9",
		is_operator: false,
	},
	{
		id: "subtract",
		value: "-",
		is_operator: true,
	},
	{
		id: "four",
		value: "4",
		is_operator: false,
	},
	{
		id: "five",
		value: "5",
		is_operator: false,
	},
	{
		id: "six",
		value: "6",
		is_operator: false,
	},
	{
		id: "add",
		value: "+",
		is_operator: true,
	},
	{
		id: "one",
		value: "1",
		is_operator: false,
	},
	{
		id: "two",
		value: "2",
		is_operator: false,
	},
	{
		id: "three",
		value: "3",
		is_operator: false,
	},
	{
		id: "equals",
		value: "=",
		is_operator: false,
	},
	{
		id: "zero",
		value: "0",
		is_operator: false,
	},
	{
		id: "decimal",
		value: ".",
		is_operator: false,
	},
];

const Calculator = () => {
	const [display, setDisplay] = useState(0);
	const [query, setQuery] = useState([]);

	const isOperator = (char) => {
		const regex = /^[+-/*]+$/gi;
		return regex.test(char);
	};

	const addNumber = (event) => {
		const number = event.target.value;

		if (number.toString() === "0" && display.toString() === "0") return;

		if (isOperator(display)) {
			setQuery((prev) => [...prev, display]);
		}

		setDisplay((prev) =>
			prev.toString() !== "0" && !isOperator(display)
				? `${prev}${number}`
				: number.toString()
		);
	};

	const addOperator = (event) => {
		const operator = event.target.value;

		if (operator === "-" && isOperator(display)) {
			return setDisplay((prev) => `${prev}${operator}`);
		}

		if (isOperator(display)) {
			setDisplay(operator);
		} else {
			setQuery((prev) => [...prev, display]);
			setDisplay(operator);
		}
	};

	const addDecimal = () => {
		if (isOperator(display) || display.split("").includes(".")) return;

		setDisplay((prev) => `${prev}.`);
	};

	const equals = () => {
		const result = eval(
			isOperator(display) ? query.join("") : [...query, display].join("")
		);
		setDisplay(result);
		setQuery([]);
	};

	const clear = () => {
		setDisplay(0);
		setQuery([]);
	};

	return (
		<section className='min-h-screen flex flex-col items-center justify-center'>
			<div className='w-[500px] mx-auto'>
				<div className='text-2xl text-end'>
					{query.join(" ").replaceAll("*", "x")}
				</div>
				<div id='display' className='text-end text-2xl'>
					{display === "*" ? "x" : display}
				</div>
				<div className='grid grid-cols-4 gap-2 mt-5'>
					{CalculatorData.map((item) => (
						<button
							key={item.id}
							value={item.value}
							id={item.id}
							className={`py-2 px-4 border border-cyan-400 text-xl font-medium  ${
								item.id === "clear" || item.id === "zero"
									? "col-span-2"
									: item.id === "equals"
									? "row-span-2"
									: ""
							} ${item.id === "clear" ? "bg-red-600" : ""} ${
								item.id === "equals" ? "bg-cyan-400" : ""
							}`}
							onClick={
								item.id === "equals"
									? equals
									: item.id === "decimal"
									? addDecimal
									: item.id === "clear"
									? clear
									: !item.is_operator
									? addNumber
									: addOperator
							}>
							{item.value}
						</button>
					))}
				</div>
			</div>
		</section>
	);
};

export default Calculator;
