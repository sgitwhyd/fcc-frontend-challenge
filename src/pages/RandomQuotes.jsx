import axios from "axios";
import { useEffect, useState } from "react";
import { BsQuote, BsTwitter } from "react-icons/bs";

const RandomQuotes = () => {
	const [activeTheme, setActiveTheme] = useState({
		backgroundColor: "#FF8989",
		color: "#FF6666",
	});
	const [quotes, setQuotes] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const getRandomApi = async () => {
		await axios
			.get("https://api.quotable.io/quotes/random?minLength=50&maxLength=100")
			.then((response) => setQuotes(response.data[0]));
	};

	const handleRefreshQuote = () => {
		setIsLoading(true);
		getRandomApi().then(() => {
			setIsLoading(false);
		});

		getRandomizeTheme();
	};

	useEffect(() => {
		setIsLoading(true);
		getRandomApi().then(() => setIsLoading(false));
	}, []);

	const themeData = [
		{
			backgroundColor: "#FF8989",
			color: "#FF6666",
		},
		{
			backgroundColor: "#884A39",
			color: "#C38154",
		},
		{
			backgroundColor: "#A75D5D",
			color: "#D3756B",
		},
	];

	const getRandomizeTheme = () => {
		const index = Math.floor(Math.random() * themeData.length);
		const newTheme = themeData[index];
		if (newTheme === activeTheme) {
			getRandomizeTheme();
		} else {
			setActiveTheme(newTheme);
		}
	};

	return (
		<div
			className='flex flex-col justify-center h-screen mx-auto py-8 transition duration-300 ease-in-out'
			style={{
				backgroundColor: `${activeTheme.backgroundColor}`,
				color: `${activeTheme.color}`,
			}}>
			<div
				id='quote-box'
				className='p-5 w-[600px] h-[300px] rounded-[20px] bg-white inline-flex flex-col justify-center mx-auto'>
				<div className='h-[200px] flex flex-col justify-center items-center'>
					{isLoading ? (
						"loading"
					) : (
						<>
							<h2 id='text' className='text-2xl'>
								<BsQuote />
								{quotes.content}
							</h2>
							<p id='author' className='mt-3 ml-auto italic font-semibold'>
								- {quotes.author}
							</p>
						</>
					)}
				</div>
				<div className='flex justify-between items-center'>
					<a
						href={`https://twitter.com/intent/tweet?text=${quotes.content} - ${quotes.author}`}
						target='_blank'
						rel='noreferrer'
						id='tweet-quote'
						className='p-2 rounded-md flex justify-center items-center'
						style={{ backgroundColor: `${activeTheme.backgroundColor}` }}>
						<BsTwitter style={{ color: "white" }} />
					</a>
					<button
						style={{ backgroundColor: `${activeTheme.backgroundColor}` }}
						id='new-quote'
						className='p-2 w-fit rounded-md border-none font-bold text-xs cursor-pointer text-white'
						onClick={handleRefreshQuote}
						disabled={isLoading}>
						New Quote
					</button>
				</div>
			</div>
		</div>
	);
};

export default RandomQuotes;
