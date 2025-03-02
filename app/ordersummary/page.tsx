'use client';

import { useOrder } from '../context/OrderContext';
import { ExternalLink, Coffee } from 'lucide-react';
import ProgressBar from '../components/ProgressBar';
const OrderSummary = () => {
	const { selected, companyName, selectedEmployees, selectedCoffee, coffeeQuantity } = useOrder();

	// Static price calculation
	const PRICE_PER_KG = 17.95;
	const totalPrice = coffeeQuantity.kg * PRICE_PER_KG;

	return (
		<div className='bg-white text-[#BD1521]'>
			<ProgressBar step={5} />
			<h1 className='text-[35px] font-extrabold mb-6 text-center mt-3'>Order Summary</h1>

			<div className='max-w-4xl mx-auto p-4 sm:p-6'>
				<h1 className='text-[28px] font-medium mb-6'>Order Details</h1>

				<div className='bg-[#BD1521] text-white rounded-lg p-6 space-y-4'>
					<div className='bg-white text-[#BD1521] rounded-lg p-4'>
						<div className='flex justify-between items-center mb-1'>
							<span className='text-sm font-medium'>COMPANY NAME</span>
							<ExternalLink className='w-4 h-4' />
						</div>
						<p className='text-xl font-medium'>{companyName}</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<div className='bg-white text-[#BD1521] rounded-lg p-4'>
							<div className='flex justify-between items-center mb-1'>
								<span className='text-sm font-medium'>ORGANISATION TYPE</span>
								<ExternalLink className='w-4 h-4' />
							</div>
							<p className='text-xl font-medium'>{selected}</p>
						</div>

						<div className='bg-white text-[#BD1521] rounded-lg p-4'>
							<div className='flex justify-between items-center mb-1'>
								<span className='text-sm font-medium'>EMPLOYEES</span>
								<ExternalLink className='w-4 h-4' />
							</div>
							<p className='text-xl font-medium'>{selectedEmployees}</p>
						</div>
					</div>

					<div className='bg-white text-[#BD1521] rounded-lg p-4'>
						<div className='flex justify-between items-center mb-1'>
							<span className='text-sm font-medium'>FREQUENCY</span>
							<ExternalLink className='w-4 h-4' />
						</div>
						<p className='text-xl font-medium'>
							{coffeeQuantity.kg}kg every {coffeeQuantity.days} days
						</p>
					</div>

					<div className='bg-white text-[#BD1521] rounded-lg p-4'>
						<div className='flex justify-between items-center mb-1'>
							<span className='text-sm font-medium'>BREW METHOD</span>
							<ExternalLink className='w-4 h-4' />
						</div>
						<div className='flex items-center gap-3'>
							<Coffee className='w-8 h-8' />
							<span className='text-xl font-medium'>{selectedCoffee || 'Pre-Ground Espresso'}</span>
						</div>
					</div>

					<div className='pt-4'>
						<h2 className='text-[28px] font-medium mb-6'>Order Summary</h2>
						<div className='space-y-6'>
							<div className='flex justify-between items-start border-b border-gray-200 pb-4'>
								<div>
									<p className='text-lg font-medium'>Bourbon Cream Espresso</p>
									<p className='text-[#fff]'> {coffeeQuantity.kg} x 1kg bag</p>
								</div>
								<p className='text-lg font-medium'>£{totalPrice.toFixed(2)}</p>
							</div>

							<div className='flex justify-between items-start border-b border-gray-200 pb-4'>
								<div>
									<p className='text-lg font-medium'>Delivery</p>
									<p className='text-[#fff]'>Royal Mail Tracked 24</p>
								</div>
								<p className='text-lg font-medium'>Free</p>
							</div>

							<div className='flex justify-between items-center'>
								<p className='text-lg font-medium'>Total</p>
								<p className='text-lg font-medium'>£{totalPrice.toFixed(2)}</p>
							</div>
						</div>

						<button className='w-full bg-[#BD1521] text-white py-3 rounded-md mt-6 font-medium'>ORDER PACKAGE</button>

						<p className='text-center text-sm mt-4'>
							If you are not ready or would like to discuss your organisations requirements please{' '}
							<a href='#' className='font-medium hover:underline'>
								get in touch &gt;
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderSummary;
