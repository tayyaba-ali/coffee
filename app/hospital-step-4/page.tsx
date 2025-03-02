'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Head from 'next/head';
import ProgressBar from '../components/ProgressBar';
import { useOrder } from '../context/OrderContext';
import { IoIosArrowBack } from 'react-icons/io';
import { Audio } from 'react-loader-spinner'; // Import the loader

function CoffeeSelectionComponent() {
	const { companyName, setCompanyName, selectedCoffee, setSelectedCoffee } = useOrder();
	const [selectedOptions, setSelectedOptions] = useState<string[]>(selectedCoffee ? selectedCoffee.split(',') : []);
	const [loading, setLoading] = useState(false); // Add loading state
	const router = useRouter();
	const searchParams = useSearchParams();

	const coffeeOptions = [
		'TRADITIONAL ESPRESSO MACHINE',
		'THROUGH A BEAN TO CUP MACHINE',
		'FILTER COFFEE SERVES',
		'PODS',
	];

	useEffect(() => {
		const companyNameFromParams = searchParams.get('companyName');
		if (companyNameFromParams) {
			setCompanyName(companyNameFromParams);
		}
	}, [searchParams, setCompanyName]);

	const handleOptionClick = (option: string) => {
		setSelectedOptions((prev) => (prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]));
	};

	const handleNext = async () => {
		if (companyName && selectedOptions.length > 0) {
			setLoading(true); // Show loader

			// Simulate a delay (e.g., API call or processing)
			await new Promise((resolve) => setTimeout(resolve, 1500));

			setSelectedCoffee(selectedOptions.join(','));
			const params = new URLSearchParams();
			params.append('companyName', companyName);
			selectedOptions.forEach((option) => params.append('option', option));
			router.push(`/hospital-step-5?${params.toString()}`);
		}
	};

	const isOptionSelected = (option: string) => selectedOptions.includes(option);

	return (
		<div className='relative min-h-screen bg-white'>
			{loading && ( // Loader overlay
				<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-lg z-50'>
					<Audio height='100' width='100' color='#BD1521' ariaLabel='loading' />
				</div>
			)}

			<IoIosArrowBack
				size={30}
				className='absolute top-[5%] left-0 sm:top-20 sm:left-6 md:top-20 md:left-8 lg:top-20 lg:left-10 hover:bg-red-100 p-1 rounded-full transition-colors'
				onClick={() => router.push('/hospital-step-3')}
			/>

			<ProgressBar step={2.5} />

			<div className='px-4 flex flex-col items-center justify-center max-w-6xl mx-auto'>
				<Head>
					<title>Coffee Selection</title>
					<meta name='description' content='Select how you want your coffee served' />
					<link rel='icon' href='/favicon.ico' />
				</Head>

				<main className='py-5 sm:py-16 flex flex-col items-center justify-center w-full'>
					<h1 className='mb-12 text-2xl  sm:text-4xl font-bold text-center ps-4 sm:ps-0'>
						How do you serve your coffee at <span className='text-[#BD1521]'>{companyName || 'Your Business'}</span> ?
					</h1>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl'>
						{coffeeOptions.map((option) => (
							<div
								key={option}
								className={`px-5 py-10 sm:p-10  border rounded flex justify-center items-center cursor-pointer transition-all h-25 sm:h-40 text-center ${
									isOptionSelected(option)
										? 'bg-[#BD1521] text-white border-[#BD1521]'
										: 'border-gray-200 hover:border-[#BD1521] bg-white text-[#BD1521]'
								}`}
								onClick={() => handleOptionClick(option)}>
								<h2 className='sm:text-xl font-medium'>{option}</h2>
							</div>
						))}
					</div>

					<div className='mt-12 w-full sm:w-auto flex justify-center'>
						<button
							className={`py-4 w-full px-12 text-xl font-medium uppercase rounded transition-all ${
								companyName && selectedOptions.length > 0
									? 'bg-[#BD1521] text-white hover:bg-red-800'
									: 'bg-red-100 text-red-300 cursor-not-allowed'
							}`}
							onClick={handleNext}
							disabled={!companyName || selectedOptions.length === 0 || loading}>
							{' '}
							{/* Disable button while loading */}
							{loading ? 'LOADING...' : 'NEXT'} {/* Change button text when loading */}
						</button>
					</div>
				</main>
			</div>
		</div>
	);
}

export default function CoffeeSelection() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<CoffeeSelectionComponent />
		</Suspense>
	);
}
