'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProgressBar from '../components/ProgressBar';
import { IoIosArrowBack } from 'react-icons/io';
import { Audio } from 'react-loader-spinner';

const options = [
	{ id: 'coffee-training', label: 'COFFEE TRAINING' },
	{ id: 'coffee-advice', label: 'COFFEE ADVICE' },
	{ id: 'overall-guidance', label: 'OVERALL GUIDANCE' },
	{ id: 'new-equipment', label: 'NEW EQUIPMENT' },
	{ id: 'just-coffee', label: 'JUST COFFEE' },
];

function Step5Content() {
	const searchParams = useSearchParams();
	const [companyName, setCompanyName] = useState('');
	const [selected, setSelected] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const toggleOption = (id: string) => {
		setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
	};

	const handleNext = async () => {
		setLoading(true);
		await new Promise((resolve) => setTimeout(resolve, 1500));
		router.push(`/office-6?selected=${selected.join(',')}`);
	};

	useEffect(() => {
		const companyNameFromParams = searchParams.get('companyName');
		if (companyNameFromParams) {
			setCompanyName(companyNameFromParams);
		}
	}, [searchParams]);

	return (
		<div className='relative w-full min-h-screen flex flex-col items-center  pb-6 '>
			{loading && (
				<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-lg z-50'>
					<Audio height='80' width='80' color='#BD1521' ariaLabel='loading' />
				</div>
			)}

			<ProgressBar step={3} />

			<IoIosArrowBack
				size='30'
				className='absolute top-[2%] left-0 sm:top-[10%] sm:left-6 md:left-8 lg:left-10  max-w-[30px] max-h-[30px] hover:bg-red-100 p-1 rounded-full transition-colors hover:bg-[#a2121c]/20 text-[#BD1521]'
				onClick={() => router.push('/office-4')}
			/>

			<h1 className='text-3xl ps-3 sm:text-4xl font-bold text-center mt-10'>
				What does <span className='text-[#BD1521]'>{companyName}</span> need?
			</h1>

			<div className='w-full max-w-2xl mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 px-8'>
				{options.map(({ id, label }) => (
					<button
						key={id}
						onClick={() => toggleOption(id)}
						className={`w-full p-4 rounded-lg border-2 transition-all text-lg font-medium shadow-md transform text-center h-16 sm:h-20 md:h-24
							${
								selected.includes(id)
									? 'bg-[#BD1521] text-white border-[#BD1521] hover:bg-[#a2121c] hover:scale-105'
									: 'bg-white text-[#BD1521] border-[#BD1521]/50 hover:border-[#BD1521] hover:bg-[#BD1521]/10'
							}`}>
						{selected.includes(id) && '✓ '}
						{label}
					</button>
				))}
			</div>

			<button
				onClick={handleNext}
				className={`mt-12 w-[80%] sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-md font-semibold tracking-wider shadow-md transform transition-all duration-200 text-lg
					${
						selected.length > 0
							? 'bg-[#BD1521] text-white hover:bg-[#a2121c] hover:scale-105 active:scale-95'
							: 'bg-[#BD1521]/10 text-[#BD1521]/50 cursor-not-allowed'
					}`}
				disabled={selected.length === 0 || loading}>
				{loading ? 'LOADING...' : 'NEXT'}
			</button>
		</div>
	);
}

export default function Step5() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Step5Content />
		</Suspense>
	);
}
