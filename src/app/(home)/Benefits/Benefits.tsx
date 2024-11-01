/* Assets */
import Clock from '@images/clock-circle.svg';
import Users from '@images/users-circle.svg';
import Board from '@images/board-circle.svg';
import Chatbox from '@images/chatbox-circle.svg';

/* Components */
import BenefitsCards from './components/BenefitsCard';

const benefits = [
	{
		title: 'Guiados',
		description: 'Practica tu narración y recibe una devolución de tus trabajos.',
		icon: Users,
	},
	{
		title: 'Didácticos',
		description: 'Aprende con videos, textos, ejercicios y recursos extra.',
		icon: Board,
	},
	{
		title: 'A tu ritmo',
		description: 'Accede a los cursos cuando quieras y para siempre.',
		icon: Clock,
	},
	{
		title: 'Interactivos',
		description: 'Formula preguntas y obtén respuesta de la docente.',
		icon: Chatbox,
	},
];

export default function Benefits() {
	return (
		<section className="container py-12">
			<h2 className="font-display text-center subtitle">Así son mis cursos</h2>

			<ul className="relative mt-5 flex snap-x snap-mandatory gap-5 overflow-scroll px-[24px] py-10 lg:-mx-4 lg:mt-12 lg:justify-between lg:gap-8">
				{benefits.map((benefit) => (
					<BenefitsCards
						key={benefit.title}
						description={benefit.description}
						icon={benefit.icon}
						title={benefit.title}
					/>
				))}
			</ul>
		</section>
	);
}
