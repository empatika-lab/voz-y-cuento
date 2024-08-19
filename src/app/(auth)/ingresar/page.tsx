/* Components */
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import LoginFooter from './components/LoginFooter';
import LoginBackButton from './components/LoginBackButton';

interface LoginProps {
	searchParams?: Record<string, string | undefined>;
}

export default function Login({ searchParams }: LoginProps) {
	return (
		<article className="bg-cyan-25 min-h-full flex items-center flex-col py-10">
			<div className="max-w-[356px] px-5">
				<LoginHeader />
				<LoginForm email={searchParams?.email} />
				<LoginFooter />
				<LoginBackButton />
			</div>
		</article>
	);
}
