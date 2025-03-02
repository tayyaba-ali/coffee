'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import cafe from '../../public/cafe.svg';
import restaurant from '../../public/restaurant.svg';
import hotel from '../../public/hotel.svg';
import others from '../../public/other.svg';
import Image from 'next/image';
import ProgressBar from '../components/ProgressBar';
import { IoIosArrowBack } from 'react-icons/io';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Audio } from 'react-loader-spinner';

const businessTypes = [
	{ image: cafe, label: 'Cafe' },
	{ image: restaurant, label: 'Restaurant' },
	{ image: hotel, label: 'Hotel' },
	{ image: others, label: 'Others' },
];

export default function BusinessInfo() {
	const [companyName, setCompanyName] = useState('');
	const [selectedBusinessType, setSelectedBusinessType] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleNext = async () => {
		if (companyName && selectedBusinessType) {
			setLoading(true);
			await new Promise((resolve) => setTimeout(resolve, 1500));
			router.push(`/hospital-step-3?companyName=${encodeURIComponent(companyName)}`);
		}
	};

	return (
		<div className='relative w-full min-h-screen font-sans flex flex-col items-center pb-6 bg-white text-[#BD1521] overflow-hidden'>
			{loading && (
				<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-lg z-50'>
					<Audio height='100' width='100' color='#BD1521' ariaLabel='loading' />
				</div>
			)}

			{/* Back Button */}
			<button
				onClick={() => router.push('/step-1')}
				className='absolute top-10 left-0 sm:top-6 sm:left-6 p-2 rounded-full hover:bg-gray-200 transition-colors'>
				<IoIosArrowBack size={24} className=' absolute left-0  ms-3 sm:ms-0 sm:block' />
			</button>

			{/* Progress Bar */}
			<ProgressBar step={1.5} />

			{/* Heading */}
			<h2 className='text-center text-xl sm:text-2xl md:text-3xl font-bold mb-6 mt-8 sm:mt-10'>
				Tell us about your business
			</h2>

			{/* Business Name Input */}
			<div className='text-center w-full max-w-sm px-10 sm:px-0'>
				<h3 className='text-sm font-semibold text-[#BD1521]'>BUSINESS NAME</h3>
				<input
					type='text'
					placeholder='Enter your company name...'
					value={companyName}
					onChange={(e) => setCompanyName(e.target.value)}
					className='mt-2 border-b-2 border-[#BD1521] outline-none text-center w-full p-2 text-[#BD1521] placeholder-gray-400'
				/>
			</div>

			{/* Carousel for Business Types */}
			<div className='w-full max-w-[200px] sm:max-w-md mt-8 px-4'>
				<Carousel>
					<CarouselContent className='flex-nowrap'>
						{businessTypes.map((item, index) => (
							<CarouselItem key={index} className='w-full flex-shrink-0'>
								<div className='p-1'>
									<Card
										onClick={() => setSelectedBusinessType(item.label)}
										className={`cursor-pointer border-2 rounded-lg transition-all duration-200 ${
											selectedBusinessType === item.label
												? 'bg-[#BD1521] text-white border-[#BD1521]'
												: 'border-[#BD1521]'
										}`}>
										<CardContent className='flex flex-col items-center justify-center p-3 sm:p-4 md:p-6'>
											<Image className='rounded-md' src={item.image} alt={item.label} width={100} height={100} />
											<p
												className={`text-sm mt-1 rounded-lg ${
													selectedBusinessType === item.label ? 'text-white' : 'text-[#BD1521]'
												}`}>
												{item.label}
											</p>
										</CardContent>
									</Card>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</div>

			{/* Next Button */}
				<button
					className={`mt-8 w-100 w-1/2 sm:w-auto px-6 py-3 text-sm sm:text-base font-medium uppercase rounded-lg transition-all duration-200 ${
						companyName && selectedBusinessType
							? 'bg-[#BD1521] text-white hover:opacity-90'
							: 'bg-gray-200 text-gray-400 cursor-not-allowed'
					}`}
					onClick={handleNext}
					disabled={!companyName || !selectedBusinessType || loading}>
					{loading ? 'LOADING...' : 'NEXT'}
				</button>
		</div>
	);
}