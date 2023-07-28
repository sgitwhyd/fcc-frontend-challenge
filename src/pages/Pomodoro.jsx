import { useEffect, useState, useRef, useMemo } from "react";

const Pomodoro = () => {
	const [breakLength, setBreakLength] = useState(5);
	const [sessionLength, setSessionLength] = useState(25);

	const audioRef = useRef();

	const [time, setTime] = useState(25 * 60);
	const [rest, setRest] = useState(false);

	const [timer, setTimer] = useState(false);
	const running = useMemo(() => Boolean(timer), [timer]);

	const formatTime = (secon) => {
		const fMinute =
			Math.floor(secon / 60) >= 10
				? Math.floor(secon / 60)
				: `0${Math.floor(secon / 60)}`;
		const fSecon = secon % 60 >= 10 ? secon % 60 : `0${secon % 60}`;
		return `${fMinute}:${fSecon}`;
	};

	const startTimer = () => {
		if (!timer)
			return setTimer(
				setInterval(() => {
					setTime((prev) => {
						if (prev === 0) {
							return 0;
						}

						if (prev - 1 > 0) {
							return prev - 1;
						} else {
							playAudio();
							return 0;
						}
					});
				}, 1000)
			);
	};

	useEffect(() => {
		if (time === 0) {
			setTimeout(() => {
				setRest((prev) => !prev);
			}, 2000);
		}
	}, [time]);

	useEffect(() => {
		setTime(rest ? breakLength * 60 : sessionLength * 60);
	}, [rest]);

	useEffect(() => {
		setTime((prev) => (rest ? breakLength * 60 : prev));
	}, [breakLength]);

	useEffect(() => {
		setTime((prev) => (!rest ? sessionLength * 60 : prev));
	}, [sessionLength]);

	function resetTimer() {
		stopTimer();
		setRest(false);
		setTime(25 * 60);
		setSessionLength(25);
		setBreakLength(5);
		stopAudio();
	}

	function stopTimer() {
		if (timer) {
			clearInterval(timer);
			setTimer(false);
		}
	}

	const stopAudio = () => {
		audioRef.current.pause();
		audioRef.current.currentTime = 0;
	};

	const playAudio = () => {
		audioRef.current.currentTime = 0;
		audioRef.current.play();
	};

	const handleIncrement = (e) => {
		const { name } = e.target;
		switch (name) {
			case "break-increment":
				setBreakLength(breakLength < 60 ? breakLength + 1 : breakLength);
				break;
			case "session-increment":
				setSessionLength(
					sessionLength < 60 ? sessionLength + 1 : sessionLength
				);
				break;
			default:
				break;
		}
	};

	const handleDecrement = (e) => {
		const { name } = e.target;
		switch (name) {
			case "break-decrement":
				setBreakLength(breakLength > 1 ? breakLength - 1 : breakLength);
				break;
			case "session-decrement":
				setSessionLength(sessionLength > 1 ? sessionLength - 1 : sessionLength);
				break;
			default:
				break;
		}
	};

	return (
		<div className='min-h-screen flex flex-col items-center justify-center bg-slate-800'>
			<div className='bg-[#fff480] w-[500px] p-5 flex justify-center flex-col border-8 border-black rounded-xl'>
				<h1 className='text-center font-bold text-3xl mb-5'>25 + 5 Clock</h1>
				<div className='grid grid-cols-2 gap-4 '>
					<div className='flex flex-col justify-center w-fit mx-auto'>
						<div id='break-label' className='text-2xl font-semibold mb-3'>
							Break Length
						</div>
						<div className='flex justify-between items-center'>
							<button
								className='font-semibold text-xl bg-cyan-400 border border-black rounded-md p-1 w-8'
								id='break-decrement'
								name='break-decrement'
								onClick={handleDecrement}
								disabled={running}>
								-
							</button>
							<div id='break-length' className='text-lg font-medium'>
								{breakLength}
							</div>
							<button
								className='font-semibold text-xl bg-cyan-400 border border-black rounded-md p-1 w-8'
								id='break-increment'
								name='break-increment'
								onClick={handleIncrement}
								disabled={running}>
								+
							</button>
						</div>
					</div>
					<div className='flex flex-col justify-center w-fit mx-auto'>
						<div id='session-label' className='text-2xl font-semibold mb-2'>
							Session Length
						</div>
						<div className='flex justify-between items-center'>
							<button
								className='font-semibold text-xl bg-cyan-400 border border-black rounded-md p-1 w-8'
								id='session-decrement'
								name='session-decrement'
								onClick={handleDecrement}
								disabled={running}>
								-
							</button>
							<div id='session-length' className='text-lg font-medium'>
								{sessionLength}
							</div>
							<button
								className='font-semibold text-xl bg-cyan-400 border border-black rounded-md p-1 w-8'
								id='session-increment'
								name='session-increment'
								onClick={handleIncrement}
								disabled={running}>
								+
							</button>
						</div>
					</div>
				</div>
				<div
					id='timer-label'
					className='h-[150px]  flex items-center justify-evenly flex-col p-5'>
					<div id='timer-label' className='font-semibold text-3xl'>
						{rest ? "Break" : "Session"}
					</div>
					<div id='time-left' className='font-medium text-2xl'>
						{formatTime(time)}
					</div>
				</div>
				<div className='flex gap-4 justify-center'>
					<button
						id='start_stop'
						onClick={running ? stopTimer : startTimer}
						className='bg-cyan-400 p-3 rounded-md font-semibold text-lg'>
						{running ? "Stop" : "Start"}
					</button>
					<button
						id='reset'
						onClick={resetTimer}
						className='bg-red-400 p-3 rounded-md font-semibold text-lg'>
						Reset
					</button>
				</div>
				<audio ref={audioRef} src='/beep-06.mp3' id='beep' />
			</div>
		</div>
	);
};

export default Pomodoro;
