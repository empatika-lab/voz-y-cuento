/* Components */
import RegisterForm from './components/RegisterForm';
import RegisterHeader from './components/RegisterHeader';
import RegisterFooter from './components/RegisterFooter';
import RegisterBackButton from './components/RegisterBackButton';

export default function Register() {
	return (
		<article className="bg-cyan-25 min-h-full flex items-center flex-col py-10">
			<div className="max-w-[356px] px-5">
				<RegisterHeader />
				<RegisterForm />
				<RegisterFooter />
				<RegisterBackButton />
			</div>
		</article>
	);
}
