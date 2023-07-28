import { marked } from "marked";
import { AiTwotoneEdit } from "react-icons/ai";
import { MdPreview } from "react-icons/md";
import { useState } from "react";

const MarkdownPreviewer = () => {
	const defaultMarkdownText = `
  # heading one
  ## heading two
  
  [Freecode Camp](https://www.freecodecamp.org)
  
  here is inline code \`<h1>Hello World</div>\`
  
  \`\`\`
  // this is multi-line code:
  
  function anotherExample(firstLine, lastLine) {
    if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
      return multiLineCode;
    }
  }
  \`\`\`
  here is a list item
  
  1. And there are numbered lists too.
  1. Use just 1s if you want!
  1. And last but not least, let's not forget embedded images:
  
  
  > Block Quotes!
  
  ![random photos](https://picsum.photos/200/200)
  This is the first line.\nThis is the second line.
  
  **this is bolded text**`;
	const [textToMarkDown, setTextToMarkDown] = useState(defaultMarkdownText);

	const handleChange = (event) => {
		setTextToMarkDown(event.target.value);
	};

	marked.use({
		breaks: true,
	});

	return (
		<div className='bg-[#3d4852] min-h-screen flex flex-col items-center'>
			<h1 className='text-2xl mt-5 text-white'>Markdown Previewer</h1>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-8 py-8'>
				<div className='h-[500px] bg-[#fff480] p-5 flex flex-col items-center border-8 border-black rounded-md'>
					<h2 className='inline-flex text-2xl items-center font-semibold'>
						<AiTwotoneEdit style={{ marginRight: "6px" }} />
						Editor
					</h2>
					<textarea
						value={textToMarkDown}
						onChange={(event) => handleChange(event)}
						id='editor'
						className='mt-5 w-full h-full max-h-[300px] overflow-y-scroll border-4 border-black rounded-lg p-3 text-lg'
					/>
				</div>
				<div className='bg-cyan-400 border-8 border-black rounded-md p-5 h-[500px] w-[700px] overflow-y-scroll'>
					<h2 className='inline-flex text-2xl items-center font-semibold'>
						<MdPreview style={{ marginRight: "6px" }} />
						Preview
					</h2>
					<div
						id='preview'
						className='bg-white overflow-x-scroll h-[390px] p-3'
						dangerouslySetInnerHTML={{
							__html: marked.parse(textToMarkDown),
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default MarkdownPreviewer;
