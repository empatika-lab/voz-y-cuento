/* Components */
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import LoginFooter from './components/LoginFooter';
import LoginBackButton from './components/LoginBackButton';

export default function Login() {
	return (
		<article className="bg-cyan-25 min-h-full flex items-center flex-col py-10 ">
			<div className="max-w-[356px] px-5">
				<LoginHeader />
				<LoginForm />
				<LoginFooter />
				<LoginBackButton />
			</div>
		</article>
	);
}
