'use client';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountryDetails } from '@/redux/countries/countriesOperation';
import { AppDispatch } from '@/redux/store';
import {
	selectCountryDetails,
	selectError,
	selectLoading,
} from '@/redux/countries/countriesSelector';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Link from 'next/link';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function CountryInfoPage() {
	const { countryCode } = useParams();
	const dispatch = useDispatch<AppDispatch>();
	const countryInfo = useSelector(selectCountryDetails);
	const loading = useSelector(selectLoading);
	const error = useSelector(selectError);

	useEffect(() => {
		if (countryCode) {
			dispatch(fetchCountryDetails(countryCode as string));
		}
	}, [dispatch, countryCode]);

	if (loading) {
		return <div className="text-center text-white">Loading...</div>;
	}

	if (error) {
		return <div className="text-center text-red-500">{error}</div>;
	}

	if (!countryInfo) {
		return <div className="text-center text-white">No details available</div>;
	}

	const populationData = {
		labels: countryInfo.population.map((item: any) => item.year),
		datasets: [
			{
				label: 'Population',
				data: countryInfo.population.map((item: any) => item.value),
				borderColor: '#9333ea',
				backgroundColor: 'rgba(147, 51, 234, 0.2)',
			},
		],
	};

	return (
		<main className="min-h-screen bg-gray-900 text-white">
			<div className="max-w-4xl mx-auto py-10">
				<div className="text-center mb-6">
					<h1 className="text-4xl font-bold text-purple-400">{countryInfo.countryInfo.commonName}</h1>
					<img
						src={countryInfo.flag}
						alt={`${countryInfo.countryInfo.commonName} flag`}
						className="mx-auto mt-4 w-32"
					/>
				</div>
				<div className="mb-6">
					<h2 className="text-2xl font-semibold mb-4">Border Countries</h2>
					<ul className="flex flex-wrap gap-4">
						{countryInfo.countryInfo.borders.map((border: any) => (
							<li key={border.countryCode}>
								<Link
									href={`/countries/${border.countryCode}`}
									className="p-2 bg-gray-800 rounded hover:bg-purple-600 transition duration-200"
								>
									{border.commonName}
								</Link>
							</li>
						))}
					</ul>
				</div>
				<div>
					<h2 className="text-2xl font-semibold mb-4">Population Over Time</h2>
					<Line data={populationData} />
				</div>
			</div>
		</main>
	);
}
