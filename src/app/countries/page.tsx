'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CountryListPage() {
	interface Country {
		countryCode: string;
		name: string;
	}
	const [countries, setCountries] = useState<Country[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchCountries = async () => {
			try {
				const response = await fetch('http://localhost:3123/countries');
				// if (!response.ok) {
				// 	throw new Error('Failed to fetch countries');
				// }
				const data = await response.json();
				setCountries(data.data || []);
				setLoading(false);
			} catch (err: Error) {
				setError(err.message);
				setLoading(false);
			}
		};

		fetchCountries();
	}, []);

	if (loading) {
		return <div className="text-center text-white">Loading...</div>;
	}

	if (error) {
		return <div className="text-center text-red-500">{error}</div>;
	}

	return (
		<main className="min-h-screen bg-gray-900 text-white">
			<div className="max-w-4xl mx-auto py-10">
				<h1 className="text-4xl font-bold text-center text-purple-400 mb-6">
					Country List
				</h1>
				<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{countries.map((country) => (
						<li key={country.countryCode} className="group">
							<Link
								href={`/countries/${country.countryCode}`}
								className="block p-4 bg-gray-800 rounded-lg shadow-md hover:bg-purple-600 transition duration-200"
							>
								<p className="text-xl text-center font-medium group-hover:text-white">
									{country.name}
								</p>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</main>
	);
}