import { RouterProvider, createBrowserRouter, Link } from "react-router-dom";
import Calculator from "./pages/Calculator";
import MarkdownPreviewer from "./pages/MarkdownPreviewer";
import Drum from "./pages/Drum";
import RandomQuotes from "./pages/RandomQuotes";
import Pomodoro from "./pages/Pomodoro";

const Home = () => {
	return (
		<div className='min-h-screen flex justify-center items-center bg-slate-800'>
			<div className='flex flex-col gap-3 items-center justify-center w-[500px] h-fit py-5 rounded-md font-semibold text-2xl bg-[#fff480]'>
				<Link to={"/calculator"}>Calculator</Link>
				<Link to={"/markdown-previewer"}>Markdown Previewer</Link>
				<Link to={"/drum"}>Drumpad</Link>
				<Link to={"/random-quotes"}>Random Quotes</Link>
				<Link to={"/pomodoro"}>25 + 1 Clock</Link>
			</div>
		</div>
	);
};

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/calculator",
		element: <Calculator />,
	},
	{
		path: "/markdown-previewer",
		element: <MarkdownPreviewer />,
	},
	{
		path: "/drum",
		element: <Drum />,
	},
	{
		path: "/random-quotes",
		element: <RandomQuotes />,
	},
	{
		path: "/pomodoro",
		element: <Pomodoro />,
	},
]);

const App = () => {
	return (
		<RouterProvider router={router}>
			<Home />
		</RouterProvider>
	);
};

export default App;
