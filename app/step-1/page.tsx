"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaBuilding, FaStore } from 'react-icons/fa';
import { useOrder } from '../context/OrderContext';
import Link from 'next/link';
import { Audio } from 'react-loader-spinner';

export default function StepOne() {
	const router = useRouter();
	const { selected, setSelected } = useOrder();
	const [loading, setLoading] = useState(false); // <-- Add loading state

	const handleSelect = (option: string) => {
		setSelected(option);
	};

	const handleNext = () => {
		if (!selected) return;

		setLoading(true); 

		
		setTimeout(() => {
			if (selected === 'OFFICE') {
				router.push('/step-2');
			} else if (selected === 'HOSPITALITY') {
				router.push('/hospital-step-2');
			}
		}, 1500);
	};

	return (
		<div className='py-5 px-7 md:p-0 relative w-full min-h-screen grid place-items-center flex-col items-center pb-6 text-[#BD1521] bg-white'>
			{loading && (
				<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-lg z-50'>
					<Audio height='100' width='100' color='#BD1521' ariaLabel='loading' />
				</div>
			)}
			{/* Heading */}
			<h2 className='text-center text-2xl md:text-3xl font-semibold mb-8 mt-10'>
				Let&apos;s get started! Do you need coffee for...
			</h2>

			{/* Selection Boxes */}
			<div className='grid md:grid-cols-2 gap-6 max-w-2xl w-full mt-6'>
				<div
					className={`border-2 rounded-2xl p-5 sm:p-16 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 shadow-md ${
						selected === 'OFFICE'
							? 'bg-[#BD1521] text-white border-[#BD1521] scale-105'
							: 'bg-white text-[#BD1521] border-[#BD1521] hover:bg-[#FCE4E6] hover:scale-105'
					}`}
					onClick={() => handleSelect('OFFICE')}>
					<FaBuilding size={70} />
					<h3 className='mt-4 font-semibold'>OFFICE</h3>
				</div>

				<div
					className={`border-2 rounded-2xl p-5 sm:p-16 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 shadow-md ${
						selected === 'HOSPITALITY'
							? 'bg-[#BD1521] text-white border-[#BD1521] scale-105'
							: 'bg-white text-[#BD1521] border-[#BD1521] hover:bg-[#FCE4E6] hover:scale-105'
					}`}
					onClick={() => handleSelect('HOSPITALITY')}>
					<FaStore size={70} />
					<h3 className='mt-4 font-semibold text-center'>HOSPITALITY BUSINESS</h3>
				</div>
			</div>

			{/* Alternative Option */}
			<div className='mt-6'>
				<Link href='/form'>
					<p className='text-sm underline font-medium text-[#BD1521] hover:text-[#a2121c] transition-colors'>
						Looking for something else?
					</p>
				</Link>
			</div>

			<button
				className={`inline-block w-full sm:w-1/2  mt-5 md:mt-0 py-3 px-6 font-semibold rounded-lg text-base shadow-lg transition-all duration-200 ${
					selected
						? 'bg-[#BD1521] text-white hover:bg-[#a2121c] hover:scale-105 active:scale-95'
						: 'bg-[#FCE4E6] text-[#BD1521] cursor-not-allowed'
				}`}
				onClick={handleNext}
				disabled={!selected}>
				NEXT
			</button>
		</div>
	);
}
