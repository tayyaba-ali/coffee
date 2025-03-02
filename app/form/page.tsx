'use client';

import { FormEvent, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { IoIosArrowBack } from 'react-icons/io';
import { useRouter } from 'next/navigation';



export default function ContactForm() {
	const router = useRouter();
	const [formData, setFormData] = useState({
		businessName: '',
		townCity: '',
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		message: '',
	});

	const [loading, setLoading] = useState<boolean>(false);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await fetch('/api/form-proxy', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Failed to send contact');
			}

			toast.success('Form submitted successfully');
			setFormData({
				businessName: '',
				townCity: '',
				firstName: '',
				lastName: '',
				email: '',
				phone: '',
				message: '',
			});
		} catch (error) {
			toast.error('An error occurred. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<div className='max-w-5xl mx-auto px-6 py-12 font-sans'>
			<IoIosArrowBack
								size={30}
								className='absolute top-[1%] md:top-[5%] left-0 sm:top-20 sm:left-6  md:left-8 lg:top-20 lg:left-10 hover:bg-[#a2121c]/20 text-[#BD1521] p-1 rounded-full transition-colors'
								onClick={() => router.push('/step-1')}
							/>
			<div className='text-center mb-12'>
				<h1 className='text-2xl md:text-3xl font-bold text-gray-800 mb-4'>
					WE&apos;D LOVE TO SPEAK TO YOU ABOUT YOUR COFFEE NEEDS.
				</h1>
				<p className='text-gray-600'>
					Whether it be a wholesale or retail opportunity, get in touch and let&apos;s grab a coffee.
				</p>
			</div>

			<form onSubmit={handleSubmit} className='space-y-6'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{[
						{ label: 'BUSINESS NAME', name: 'businessName' },
						{ label: 'TOWN/CITY', name: 'townCity' },
						{ label: 'FIRST NAME', name: 'firstName' },
						{ label: 'LAST NAME', name: 'lastName' },
						{ label: 'EMAIL', name: 'email', type: 'email' },
						{ label: 'PHONE NUMBER', name: 'phone', type: 'tel' },
					].map(({ label, name, type = 'text' }) => (
						<div className='space-y-2' key={name}>
							<label className='block text-sm font-medium text-gray-700'>{label}</label>
							<input
								type={type}
								name={name}
								value={formData[name as keyof typeof formData]}
								onChange={handleChange}
								className='w-full px-4 py-3 border border-[#BD1521] rounded-none focus:ring-1 focus:ring-[#BD1521] focus:border-[#BD1521] outline-none transition duration-200'
							/>
						</div>
					))}
				</div>

				<div className='space-y-2'>
					<label className='block text-sm font-medium text-gray-700'>HOW CAN WE HELP YOU?</label>
					<textarea
						name='message'
						value={formData.message}
						onChange={handleChange}
						rows={6}
						className='w-full px-4 py-3 border border-[#BD1521] rounded-none focus:ring-1 focus:ring-[#BD1521] focus:border-[#BD1521] outline-none transition duration-200 resize-none'
					/>
				</div>

				<div className='flex justify-center mt-8'>
					<button
						type='submit'
						className='rounded w-full md:w-80 bg-[#BD1521] text-white py-4 px-8 hover:bg-[#a2121c] transition duration-200'>
						{loading ? 'Submitting...' : 'GET IN TOUCH'}
					</button>
				</div>
			</form>
			<ToastContainer />
		</div>
	);
}
