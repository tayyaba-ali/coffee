'use client';
import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ProgressBar from '../components/ProgressBar';
import { Audio } from 'react-loader-spinner'; // Import the loader

const MessageSentPage = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false); // Add loading state

	const handleNext = async () => {
		setLoading(true); // Show loader

		// Simulate a delay (e.g., API call or processing)
		await new Promise((resolve) => setTimeout(resolve, 1500));

		router.push('/');
	};

	return (
		<div className='relative w-full min-h-screen font-sans flex flex-col items-center px-4 sm:px-6 lg:px-8 pb-6 text-[#BD1521]'>
			{loading && ( // Loader overlay
				<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-lg z-50'>
					<Audio height='100' width='100' color='#BD1521' ariaLabel='loading' />
				</div>
			)}

			<ProgressBar step={5} />
			<div className='container mx-auto px-4 sm:px-0 py-8 mt-5'>
				{/* Header Section */}
				<div className='my-6'>
					<h1 className='text-4xl font-bold text-center uppercase text-[#BD1521]'>Message Sent</h1>
				</div>

				{/* Message Content */}
				<div className='container mx-auto py-8 sm:py-5 max-w-[500px] px-4 sm:px-0'>
					<div className='bg-[#BD1521]/10 text-center py-6 rounded-lg'>
						<div className='py-6'>
							<div className='flex justify-center'>
								<div className='w-14 h-14 rounded-full bg-[#BD1521] flex items-center justify-center'>
									<Check className='w-8 h-8 text-white' />
								</div>
							</div>
							<p className='text-lg text-[#BD1521] font-bold pt-4 px-5'>
								Thanks for getting in touch! We will get back to you as soon as possible.
							</p>
						</div>
					</div>
				</div>

				{/* Bottom Section */}
				<div className='my-8 sm:my-6 text-center'>
					<p className='text-lg text-[#BD1521] uppercase mb-6'>In the meantime</p>
					<div className='flex flex-col items-center space-y-4'>
						<button className='w-full sm:w-[400px] bg-[#BD1521] text-white py-4 px-8 uppercase font-semibold rounded-md shadow-md hover:bg-[#a2121c] transition-all'>
							Read our blog
						</button>
						<button
							onClick={handleNext}
							disabled={loading} // Disable button while loading
							className='w-full sm:w-[400px] bg-[#BD1521] text-white py-4 px-8 uppercase font-semibold rounded-md shadow-md hover:bg-[#a2121c] transition-all disabled:bg-[#BD1521]/50'>
							{loading ? 'LOADING...' : 'Return to homepage'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MessageSentPage;
