import { redirect } from 'next/navigation';

export default function Home() {
	redirect('/step-1'); // Redirect to Step 1
	return null; // This ensures nothing renders on '/'
}
