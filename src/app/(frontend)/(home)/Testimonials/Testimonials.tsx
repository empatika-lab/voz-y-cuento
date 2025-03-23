/* Components */
import TestimonialCard from './components/TestimonialCard';

/* Assets */
import Avatar1 from '@images/placeholder-avatar-1.png';
import Avatar2 from '@images/placeholder-avatar-2.png';
import Avatar3 from '@images/placeholder-avatar-3.png';

const testimonials = [
	{
		text: 'Genial! Gracias. Me encantó cada idea, los autores que nos presentaste en el Bloque. Gracias, gracias, gracias.',
		name: 'Natalia',
		image: Avatar1,
	},
	{
		text: 'Emilce, destaco mucho lo clara que sos en los videos.',
		name: 'Agustina',
		image: Avatar2,
	},
	{
		text: 'Gracias por cada propuesta. Estoy fascinada.',
		name: 'Marcela',
		image: Avatar3,
	},
];

export default function Testimonials() {
	return (
		<section className="bg-gradient-2">
			<div className="container py-12 pr-0 lg:py-[112px]">
				<h2 className="subtitle ml-[-20px] text-center font-display lg:ml-[0px]">
					Testimonios de estudiantes
				</h2>

				<ul className="relative mt-4 flex snap-x snap-mandatory gap-2 overflow-hidden py-5 !pl-1 !pr-2 lg:mt-7 lg:gap-8">
					{testimonials.map((testimony) => (
						<TestimonialCard
							key={testimony.name}
							className="snap-center"
							name={testimony.name}
							testimonial={testimony.text}
						/>
					))}
				</ul>
			</div>
		</section>
	);
}
