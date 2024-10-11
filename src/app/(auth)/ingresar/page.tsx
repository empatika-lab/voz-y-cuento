import { use } from 'react';

/* Components */
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import LoginFooter from './components/LoginFooter';
import LoginBackButton from './components/LoginBackButton';

interface LoginProps {
	searchParams: Promise<{ email?: string }>;
}

export default function Login({ searchParams }: LoginProps) {
	const { email } = use(searchParams);

	return (
		<article className="bg-cyan-25 min-h-full flex items-center flex-col py-10">
			<div className="max-w-[356px] px-5">
				<LoginHeader />
				<LoginForm email={email} />
				<LoginFooter />
				<LoginBackButton />
			</div>
		</article>
	);
}
