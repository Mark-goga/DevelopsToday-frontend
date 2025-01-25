'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries } from '@/redux/countries/countriesOperation';
import { AppDispatch } from '@/redux/store';
import {selectCountries, selectError, selectLoading} from "@/redux/countries/countriesSelector";


export default function CountryListPage() {
	const dispatch = useDispatch<AppDispatch>();
	const countries = useSelector(selectCountries);
	const loading = useSelector(selectLoading);
	const error = useSelector(selectError);

	useEffect(() => {
		dispatch(fetchCountries());
	}, [dispatch]);

	if (loading) {
		return <div className="text-center text-white">Loading...</div>;
	}

	if (error) {
		return <div className="text-center text-red-500">{error}</div>;
	}

	return (
		<main className="min-h-screen bg-gray-900 text-white">
			<div className="max-w-4xl mx-auto py-10">
				<h1 className="text-4xl font-bold text-center text-purple-400 mb-6">Country List</h1>
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
			</div>
		</main>
	);
}
