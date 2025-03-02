'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Head from 'next/head';
import ProgressBar from '../components/ProgressBar';
import { useOrder } from '../context/OrderContext';
import { IoIosArrowBack } from 'react-icons/io';
import { Audio } from 'react-loader-spinner';

function CoffeeSelectionComponent() {
	const { companyName, setCompanyName, selectedCoffee, setSelectedCoffee } = useOrder();
	const [selectedOptions, setSelectedOptions] = useState<string[]>(selectedCoffee ? selectedCoffee.split(',') : []);
	const [loading, setLoading] = useState(false);
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
			setLoading(true);

			await new Promise((resolve) => setTimeout(resolve, 1500));

			setSelectedCoffee(selectedOptions.join(','));
			const params = new URLSearchParams();
			params.append('companyName', companyName);
			selectedOptions.forEach((option) => params.append('option', option));
			router.push(`/office-5?${params.toString()}`);
		}
	};

	const isOptionSelected = (option: string) => selectedOptions.includes(option);

	return (
		<div className='relative min-h-screen bg-white'>
			{loading && (
				<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-lg z-50'>
					<Audio height='100' width='100' color='#BD1521' ariaLabel='loading' />
				</div>
			)}

			<IoIosArrowBack
				size='10vw'
				className='absolute top-[5%] left-0 sm:top-[12%] sm:left-6 md:top-[15%] md:left-8 lg:top-20 lg:left-10 
              max-h-[30px] hover:bg-red-100 p-1 rounded-full transition-colors 
              hover:bg-[#a2121c]/20 text-[#BD1521]'
				onClick={() => router.push('/office-3')}
			/>

			<ProgressBar step={2.5} />

			<div className='p-5 flex flex-col items-center justify-center max-w-6xl mx-auto'>
				<Head>
					<title>Coffee Selection</title>
					<meta name='description' content='Select how you want your coffee served' />
					<link rel='icon' href='/favicon.ico' />
				</Head>

				<main className='py-10 flex flex-col items-center justify-center w-full'>
					<h1 className='mb-8 text-lg sm:text-2xl md:text-4xl font-bold text-center leading-snug'>
						How do you serve your coffee at <span className='text-[#BD1521]'>{companyName || 'Your Business'}</span>?
					</h1>

					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-4xl'>
						{coffeeOptions.map((option) => (
							<div
								key={option}
								className={`p-6 sm:p-10 border rounded-lg flex justify-center items-center cursor-pointer transition-all h-32 sm:h-40 text-center text-sm sm:text-base md:text-lg font-medium ${
									isOptionSelected(option)
										? 'bg-[#BD1521] text-white border-[#BD1521]'
										: 'border-gray-200 hover:border-[#BD1521] bg-white text-[#BD1521]'
								}`}
								onClick={() => handleOptionClick(option)}>
								{option}
							</div>
						))}
					</div>

					<div className='mt-10 w-full flex justify-center'>
						<button
							className={`w-full max-w-xs sm:max-w-sm md:max-w-md py-3 sm:py-4 px-6 sm:px-12 text-base sm:text-xl font-medium uppercase rounded transition-all ${
								companyName && selectedOptions.length > 0
									? 'bg-[#BD1521] text-white hover:bg-red-800'
									: 'bg-red-100 text-red-300 cursor-not-allowed'
							}`}
							onClick={handleNext}
							disabled={!companyName || selectedOptions.length === 0 || loading}>
							{loading ? 'LOADING...' : 'NEXT'}
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
