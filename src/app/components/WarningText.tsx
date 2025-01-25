import React from 'react';

interface WarningTextProps {
	text: string;
}

function WarningText({text}: WarningTextProps) {
	return (
		<div className='flex items-center justify-center min-h-screen'>
			<h3 className="text-center text-white font-semibold text-xl">{text}</h3>
		</div>
	);
}

export default WarningText;