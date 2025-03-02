'use client';

import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function MessageSent() {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen px-4 text-center bg-white'>
			<h1 className='text-2xl font-bold text-[#BD1521] md:text-3xl'>MESSAGE SENT</h1>

			<div className='mt-6 bg-white p-6 border border-[#BD1521] rounded-lg shadow-md w-full max-w-md'>
				<div className='flex justify-center'>
					<CheckCircle className='w-10 h-10 text-[#BD1521]' />
				</div>
				<p className='mt-4 text-[#1D1D1D] text-sm md:text-base'>
					Thanks for getting in touch. We’ll get back to you as soon as possible.
				</p>
			</div>

			<p className='mt-6 text-xs text-[#BD1521] uppercase'>IN THE MEANTIME</p>

			<div className='mt-4 space-y-4 w-full max-w-xs'>
				<Link href='/blog'>
					<button className='w-full px-4 py-2 text-white bg-[#BD1521] rounded-md hover:bg-[#9E1217] transition'>
						READ OUR BLOG
					</button>
				</Link>
				<Link href='/'>
					<button className='w-full mt-4  px-4 py-2 text-white bg-[#BD1521] rounded-md hover:bg-[#9E1217] transition'>
						RETURN TO HOMEPAGE
					</button>
				</Link>
			</div>
		</div>
	);
}
