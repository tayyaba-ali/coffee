'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProgressBar from '../components/ProgressBar';
import { IoIosArrowBack } from 'react-icons/io';
import { Audio } from 'react-loader-spinner'; // Import the loader

function FeedbackForm() {
	const searchParams = useSearchParams();
	const selected = searchParams.get('selected');
	const router = useRouter();
	const [feedback, setFeedback] = useState('');
	const [loading, setLoading] = useState(false); // Add loading state

	const handleNext = async () => {
		setLoading(true); // Show loader

		// Simulate a delay (e.g., API call or processing)
		await new Promise((resolve) => setTimeout(resolve, 1500));

		router.push(`/office-track?selected=${selected}&feedback=${encodeURIComponent(feedback)}`);
	};

	return (
		<div className='relative'>
			{loading && ( // Loader overlay
				<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-lg z-50'>
					<Audio height='100' width='100' color='#BD1521' ariaLabel='loading' />
				</div>
			)}

			<IoIosArrowBack
				size={30}
				className='
          absolute 
          top-[5%] 
		  left-0
          sm:top-20 sm:left-6
          md:top-20 md:left-8
          lg:top-20 lg:left-10
          hover:bg-[#BD1521]/10 
          text-[#BD1521]
          p-1 rounded-full 
          transition-colors
        '
				onClick={() => router.push('/office-6')}
			/>

			<ProgressBar step={4} />
			<div className='max-w-2xl mx-auto p-8 space-y-8'>
				<h1 className='text-lg sm:text-3xl font-bold text-center text-[#BD1521]'>Anything else we should know?</h1>

				<textarea
					value={feedback}
					onChange={(e) => setFeedback(e.target.value)}
					className='
            w-full h-64 p-4 
            border-2 border-[#BD1521]/30 rounded 
            focus:border-[#BD1521] 
            outline-none resize-none 
            placeholder-gray-400
          '
					placeholder='Tell us more...'
				/>

				<button
					onClick={handleNext}
					disabled={loading} // Disable button while loading
					className='
            w-full p-4 
            bg-[#BD1521] text-white 
            hover:bg-[#a9121c] 
            transition-colors rounded-xl
          '>
					{loading ? 'LOADING...' : 'NEXT'} {/* Change button text when loading */}
				</button>
			</div>
		</div>
	);
}

export default function Page() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<FeedbackForm />
		</Suspense>
	);
}
