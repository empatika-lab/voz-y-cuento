/* Assets */
import Clock from '@images/clock-circle.svg';
import Users from '@images/users-circle.svg';
import Board from '@images/board-circle.svg';
import Chatbox from '@images/chatbox-circle.svg';

/* Components */
import BenefitsCards from './components/BenefitsCard';

/* Types */
import type { StaticImageData } from 'next/image';

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
		<section className="container relative py-12 lg:py-[112px]">
			<h2 className="subtitle relative text-center font-display">Así son mis cursos</h2>

			<div className="mt-10">
				<div
					className="relative -mx-6 overflow-auto px-6"
					style={{
						msOverflowStyle: 'none',
						scrollbarWidth: 'none',
					}}
				>
					<ul className="flex w-max gap-6 py-10 lg:w-full lg:justify-between">
						{benefits.map((benefit) => (
							<BenefitsCards
								key={benefit.title}
								description={benefit.description}
								icon={benefit.icon as StaticImageData}
								title={benefit.title}
								className="mx-2"
							/>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
}
