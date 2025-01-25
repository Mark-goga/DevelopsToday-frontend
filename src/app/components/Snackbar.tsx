'use client'
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "@/redux/store";
import {selectError} from "@/redux/countries/countriesSelector";
import {setError} from "@/redux/countries/countriesSlice";

function Snackbar() {
	const error = useSelector(selectError);
	const dispatch = useDispatch<AppDispatch>();
	const [showContent, setShowContent] = useState(false);

	useEffect(() => {
		let hideTimeout: NodeJS.Timeout;
		let removeTimeout: NodeJS.Timeout;

		if (error) {
			setShowContent(true);
			hideTimeout = setTimeout(() => {
				setShowContent(false);
				removeTimeout = setTimeout(() => {
					dispatch(setError(null));
				}, 200);
			}, 2000);
		}

		return () => {
			clearTimeout(hideTimeout);
			clearTimeout(removeTimeout);
		};
	}, [error]);

	return (
		<>
			{error && (
				<div
					className={`absolute bottom-6 right-6 p-2 bg-error rounded-md flex items-center gap-2 min-w-[200px] justify-between transition-all duration-200
          ${showContent ? "animate-fadeIn" : "animate-fadeOut"}`}
				>
					<p className="font-medium text-[18px]">{error}</p>
					<button
						onClick={() => dispatch(setError(null))}
						className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-700 transition duration-200"
						aria-label="Close"
					>
            <span className="block w-4 h-4 relative">
              <span
								className="absolute w-full h-[2px] bg-white rotate-45 top-1/2 left-0 transform -translate-y-1/2"
							></span>
              <span
								className="absolute w-full h-[2px] bg-white -rotate-45 top-1/2 left-0 transform -translate-y-1/2"
							></span>
            </span>
					</button>
				</div>
			)}
		</>
	);
}

export default Snackbar;
