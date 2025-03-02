'use client';
import { useState, ChangeEvent, FormEvent } from 'react';

interface ContactFormData {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
}

export default function ContactForm() {
	const [form, setForm] = useState<ContactFormData>({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
	});
	const [loading, setLoading] = useState<boolean>(false);
	const [message, setMessage] = useState<string>('');

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await fetch('/api/proxy', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(form),
			});

			if (!response.ok) {
				throw new Error('Failed to send contact');
			}

			setMessage('Contact sent successfully!');
		} catch (error) {
			if (error) {
				setMessage('Error occurred. Try again.');
			}
		}

		setLoading(false);
	};

	return (
		<div className='max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-[#BD1521]'>
			<h2 className='text-2xl font-bold mb-4 text-center text-[#BD1521]'>Send Contact to GHL</h2>
			<form onSubmit={handleSubmit} className='space-y-4'>
				<input
					type='text'
					name='firstName'
					placeholder='First Name'
					onChange={handleChange}
					value={form.firstName}
					required
					className='w-full p-2 border border-[#BD1521] rounded focus:outline-none focus:ring-2 focus:ring-[#BD1521]'
				/>
				<input
					type='text'
					name='lastName'
					placeholder='Last Name'
					onChange={handleChange}
					value={form.lastName}
					required
					className='w-full p-2 border border-[#BD1521] rounded focus:outline-none focus:ring-2 focus:ring-[#BD1521]'
				/>
				<input
					type='email'
					name='email'
					placeholder='Email'
					onChange={handleChange}
					value={form.email}
					required
					className='w-full p-2 border border-[#BD1521] rounded focus:outline-none focus:ring-2 focus:ring-[#BD1521]'
				/>
				<input
					type='text'
					name='phone'
					placeholder='Phone'
					onChange={handleChange}
					value={form.phone}
					required
					className='w-full p-2 border border-[#BD1521] rounded focus:outline-none focus:ring-2 focus:ring-[#BD1521]'
				/>
				<button
					type='submit'
					disabled={loading}
					className='w-full bg-[#BD1521] text-white p-2 rounded hover:bg-[#a2121c] transition disabled:bg-[#BD1521]/50'>
					{loading ? 'Sending...' : 'Send to GHL'}
				</button>
			</form>
			{message && <p className='mt-4 text-center text-[#BD1521] font-semibold'>{message}</p>}
		</div>
	);
}
