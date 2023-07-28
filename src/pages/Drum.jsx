import { useState, useEffect } from "react";

const drumPad = [
	{
		letter: "Q",
		text: "Heater-1",
		audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
	},
	{
		letter: "W",
		text: "Heater-2",
		audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
	},
	{
		letter: "E",
		text: "Heater-3",
		audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
	},
	{
		letter: "A",
		text: "Heater-4",
		audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
	},
	{
		letter: "S",
		text: "Clap",
		audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
	},
	{
		letter: "D",
		text: "Open-HH",
		audio: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
	},
	{
		letter: "Z",
		text: "Kick-n'Hat",
		audio: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
	},
	{
		letter: "X",
		text: "Kick",
		audio: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
	},
	{
		letter: "C",
		text: "Closed-HH",
		audio: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
	},
];

const Drum = () => {
	const [currentAudio, setCurrentAudio] = useState();

	const handleClick = (event) => {
		const drumId = event.target.innerText;
		onPlay(drumId);

		setCurrentAudio(event.target.id);
	};

	const onPlay = (letter) => {
		const audio = document.getElementById(letter);
		audio.play();
	};

	useEffect(() => {
		const handleKeyPress = (event) => {
			const drum = drumPad.find(
				(drum) => drum.letter === event.key.toUpperCase()
			);
			if (drum) {
				const pad = document.getElementById(drum.text);
				pad.click();
			}
		};

		document.addEventListener("keydown", handleKeyPress);

		return () => {
			document.removeEventListener("keydown", handleKeyPress);
		};
	}, []);

	return (
		<div className='bg-cyan-400 min-h-screen flex items-center justify-center '>
			<div
				id='drum-machine'
				className='grid grid-cols-2 gap-8 bg-[#fff480] p-6 rounded-xl border-4 border-black w-[600px]'>
				<div className='grid grid-cols-3 gap-3 h-[230px]'>
					{drumPad.map((drum) => (
						<div
							key={drum.letter}
							id={drum.text}
							className='bg-cyan-400 drum-pad font-semibold rounded-md text-center text-xl cursor-pointer flex justify-center items-center'
							onClick={handleClick}>
							{drum.letter}
							<audio src={drum.audio} id={drum.letter} className='clip' />
						</div>
					))}
				</div>
				<div className='flex justify-center flex-col'>
					<div
						id='display'
						className='h-10 rounded-md border-4 border-black text-center'>
						{currentAudio}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Drum;
