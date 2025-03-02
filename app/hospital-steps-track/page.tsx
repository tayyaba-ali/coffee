'use client';

import { useState, useEffect, Suspense } from 'react';
import { FaCoffee, FaMapMarkerAlt, FaCheck } from 'react-icons/fa';
import { BiCoffeeTogo } from 'react-icons/bi';
import { useRouter, useSearchParams } from 'next/navigation';
import ProgressBar from '../components/ProgressBar';
import { useOrder } from '../context/OrderContext';
import { IoIosArrowBack } from 'react-icons/io';
import { Audio } from 'react-loader-spinner';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ReviewContent() {
	const {
		fullName,
		email,
		phone,
		additionalInfo,
		wantsSample,
		setFullName,
		setEmail,
		setPhone,
		setAdditionalInfo,
		setWantsSample,
		selected,
		selectedCoffee,
		region,
		companyName,
		selectedEmployees,
		coffeeQuantity,
	} = useOrder();

	const [formData, setFormData] = useState({
		fullName: fullName,
		email: email,
		phone: phone,
		additionalInfo: additionalInfo,
		wantsSample: wantsSample,
	});
	const [loading, setLoading] = useState<boolean>(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const selections = [
		{
			icon: FaCoffee,
			label: selected || 'Select cafe',
			value: selected || '',
		},
		{
			icon: FaMapMarkerAlt,
			label: region || 'Select Region',
			value: region || '',
		},
		{
			icon: BiCoffeeTogo,
			label: selectedCoffee ? [selectedCoffee] : ['Select Coffee'],
			value: '',
		},
	];

	const router = useRouter();
	const handleNext = () => {
		router.push('/office-confirm');
	};

	useEffect(() => {
		setFullName(formData.fullName);
		setEmail(formData.email);
		setPhone(formData.phone);
		setAdditionalInfo(formData.additionalInfo);
		setWantsSample(formData.wantsSample);
	}, [formData, setFullName, setEmail, setPhone, setAdditionalInfo, setWantsSample]);

	const searchParams = useSearchParams();
	const selectedOptions = searchParams.get('selected')?.split(',') || [];
	const feedback = searchParams.get('feedback') || '';

	const handleSubmit = async (): Promise<void> => {
		setLoading(true);
		try {
			const response = await fetch('/api/proxy', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					fullName: formData.fullName,
					email: formData.email,
					phone: formData.phone,
					companyName,
					selected,
					selectedEmployees,
					region,
					coffeeQuantity,
					additionalInfo: feedback,
					wantsSample: formData.wantsSample,
					selectedOptions,
				}),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Failed to send contact');
			}

			handleNext();
		} catch (error) {
			if (error) {
				toast.error('An error occurred. Please try again.');
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='relative container-fluid'>
			{loading && (
				<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-lg z-50'>
					<Audio height='100' width='100' color='#BD1521' ariaLabel='loading' />
				</div>
			)}

			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>

			<IoIosArrowBack
				size={30}
				className='absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 lg:top-10 lg:left-10 hover:bg-[#BD1521]/20 p-1 rounded-full transition-colors text-[#BD1521] cursor-pointer'
				onClick={() => router.push('/office-7')}
			/>

			<ProgressBar step={5} />

			<div className='p-4 '>
				<div className='mx-1 flex items-center justify-between'>
					<div className='px-0 text-center flex-1'>
						<h2 className="font-['Noe_Display'] text-2xl sm:text-3xl lg:text-4xl text-[#BD1521] font-bold m-0">
							{companyName}
						</h2>
					</div>
					<div className='w-[24px]'></div>
				</div>
			</div>

			<div className='max-w-3xl mx-auto my-8'>
				{selections.map((item, index) => (
					<div key={index} className='w-full max-w-lg px-4 sm:px-0 mx-auto my-4'>
						<div className='flex items-center bg-[#F5F5F5] min-h-[50px] mx-1 py-3 rounded-lg transform transition-all duration-200 hover:scale-105'>
							<div className='w-16 text-center'>
								<item.icon className='w-6 h-6 mx-auto text-[#BD1521]' />
							</div>
							<div className='flex-1'>
								{Array.isArray(item.label) ? (
									item.label.map((text, i) => (
										<div key={i} className="font-['Apercu-Medium'] text-lg sm:text-xl text-[#BD1521] font-bold">
											{text}
										</div>
									))
								) : (
									<span className="font-['Apercu-Medium'] text-lg sm:text-xl text-[#BD1521] font-bold">
										{item.label}
									</span>
								)}
							</div>
						</div>
					</div>
				))}

				<div className='max-w-lg mx-auto mb-12 mt-16 px-8 sm:px-0 flex flex-col items-center'>
					<h3 className="text-center font-['Apercu'] text-2xl sm:text-3xl text-[#BD1521] font-[900] mb-12 pb-2 border-b border-[#BD1521]">
						Your Details
					</h3>

					<form className='w-full'>
						<div className='mb-8 text-center'>
							<label className='block uppercase text-[#BD1521] mb-4 font-bold text-sm sm:text-base'>Full Name *</label>
							<input
								type='text'
								name='fullName'
								value={formData.fullName}
								onChange={handleInputChange}
								className="w-full text-center py-3 px-4 border-b border-[#BD1521] focus:outline-none font-['Apercu'] text-sm sm:text-base text-[#BD1521] placeholder:text-[#BD1521]/50"
								placeholder='Enter your name...'
							/>
						</div>

						<div className='mb-8 text-center'>
							<label className='block uppercase text-[#BD1521] mb-4 font-bold text-sm sm:text-base'>Email *</label>
							<input
								type='email'
								name='email'
								value={formData.email}
								onChange={handleInputChange}
								className="w-full text-center py-3 px-4 border-b border-[#BD1521] focus:outline-none font-['Apercu'] text-sm sm:text-base text-[#BD1521] placeholder:text-[#BD1521]/50"
								placeholder='Enter your email...'
							/>
						</div>

						<div className='mb-8 text-center'>
							<label className='block uppercase text-[#BD1521] mb-4 font-bold text-sm sm:text-base'>Phone</label>
							<input
								type='tel'
								name='phone'
								value={formData.phone}
								onChange={handleInputChange}
								className="w-full text-center py-3 px-4 border-b border-[#BD1521] focus:outline-none font-['Apercu'] text-sm sm:text-base text-[#BD1521] placeholder:text-[#BD1521]/50"
								placeholder='Enter your phone...'
							/>
						</div>
					</form>
				</div>

				<div className='max-w-lg mx-auto mb-12 mt-16 px-0 text-center'>
					<h3 className="text-center font-['Apercu'] text-2xl sm:text-3xl text-[#BD1521] font-[900] mb-12 pb-2 border-b border-[#BD1521] inline-block">
						Your Needs
					</h3>

					<div className='flex flex-wrap gap-4 justify-center mb-6'>
						{selectedOptions.map((option) => (
							<div
								key={option}
								className='w-full md:w-[calc(50%-1rem)] bg-[#BD1521] rounded py-4 px-6 border border-white transform transition-all duration-200 hover:scale-105'>
								<p className="font-['Apercu'] text-lg sm:text-xl text-white mb-0 flex items-center justify-center">
									<FaCheck className='w-5 h-5 mr-3' />
									{option.replace('-', ' ')}
								</p>
							</div>
						))}
					</div>
				</div>

				<div className='max-w-lg mx-auto mb-12 mt-16 px-5 sm:px-0 flex flex-col items-center'>
					<h3 className="text-center font-['Apercu'] text-2xl sm:text-3xl text-[#BD1521] font-[900] mb-12 pb-2 border-b border-[#BD1521]">
						Additional Info
					</h3>

					<div className="w-full p-4 border border-[#BD1521] rounded font-['Apercu'] text-sm sm:text-base text-[#BD1521] min-h-[200px] bg-[#F5F5F5]">
						{feedback ? feedback : 'No additional information provided.'}
					</div>
				</div>

				<div className='max-w-lg mx-auto my-8 px-4 sm:px-0'>
					<div className='w-full sm:w-4/5 mx-auto text-center p-1 bg-[#BD1521] rounded transform transition-all duration-200 hover:scale-105'>
						<label className='flex items-center justify-center text-white cursor-pointer py-3'>
							<input
								type='checkbox'
								checked={formData.wantsSample}
								onChange={(e) => setFormData({ ...formData, wantsSample: e.target.checked })}
								className='ml-3'
							/>
							<span className=" w-full uppercase text-xs  font-bold font-['Apercu-Medium'] sm:text-base">
								I would like a free coffee sample
							</span>
						</label>
					</div>
				</div>
			</div>

			<div className='text-center mb-12 px-4 sm:px-0'>
				<button
					onClick={handleSubmit}
					disabled={loading}
					className=" w-full sm:w-[300px] h-[50px] bg-[#BD1521] text-white uppercase font-['Apercu-Medium'] text-sm sm:text-base rounded hover:bg-[#a2121c] hover:scale-105 transition-all duration-200">
					{loading ? 'Submitting...' : 'Submit'}
				</button>
			</div>
		</div>
	);
}

export default function ReviewPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<ReviewContent />
		</Suspense>
	);
}
