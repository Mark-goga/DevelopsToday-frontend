'use client';
import {useEffect} from 'react';
import Link from 'next/link';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCountries} from '@/redux/countries/countriesOperation';
import {AppDispatch} from '@/redux/store';
import {selectCountries, selectError, selectLoading, selectPage} from "@/redux/countries/countriesSelector";
import Loader from "@/app/components/Loader";
import {setError, setPage} from "@/redux/countries/countriesSlice";
import {UNKNOWN_ERROR_MESSAGE} from "@/app/constants/errors";


export default function CountryListPage() {
	const dispatch = useDispatch<AppDispatch>();
	const countries = useSelector(selectCountries);
	const loading = useSelector(selectLoading);
	const error = useSelector(selectError);
	const currentPage = useSelector(selectPage);

	useEffect(() => {
		if (countries.length === 0 && currentPage === 1) {
			dispatch(fetchCountries(1));
			dispatch(setPage(2));
		}

	}, [dispatch, countries.length, currentPage]);

	const loadMoreHandler = () => {
		dispatch(fetchCountries(currentPage));
		dispatch(setPage(currentPage + 1));
	};

	if (error) {
		dispatch(setError(UNKNOWN_ERROR_MESSAGE));
	}

	return (
		<main className="min-h-screen bg-gray-900 text-white">
			<div className="max-w-4xl mx-auto py-10">
				<h1 className="text-4xl font-bold text-center text-purple-400 mb-6">Country List</h1>

				{loading && (<Loader styles={'mx-auto mt-20'}/>)}

				<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{countries.map((country) => (
						<li key={country.countryCode} className="group">
							<Link
								href={`/countries/${country.countryCode}`}
								className="block p-4 bg-gray-800 rounded-lg shadow-md hover:bg-purple-600 transition duration-200"
							>
								<p className="text-xl text-center font-medium group-hover:text-white">{country.name}</p>
							</Link>
						</li>
					))}
				</ul>
				{!loading && !error && (<div className="text-center mt-6">
					<button
						onClick={loadMoreHandler}
						className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded text-white font-semibold"
						disabled={loading}
					>
						load more
					</button>
				</div>)}
			</div>
		</main>
	);
}
