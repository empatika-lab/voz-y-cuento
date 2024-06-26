/* Components */
import TestimonialCard from './components/TestimonialCard';

/* Assets */
import Avatar1 from '@images/placeholder-avatar-1.png';
import Avatar2 from '@images/placeholder-avatar-2.png';
import Avatar3 from '@images/placeholder-avatar-3.png';

const testimonials = [
	{
		text: 'Genial! Gracias. Me encantó cada idea, los autores que nos presentaste en el Bloque. Gracias, gracias, gracias.',
		name: 'Natalia Perez',
		image: Avatar1,
	},
	{
		text: 'Emilce, destaco mucho lo clara que sos en los videos.',
		name: 'Agustina Perez',
		image: Avatar2,
	},
	{
		text: 'Gracias por cada propuesta. Estoy fascinada.',
		name: 'Marcela Perez',
		image: Avatar3,
	},
];

export default function Testimonials() {
	return (
		<section className="bg-gradient-2">
			<div className="container py-16 pr-0 lg:py-[112px]">
				<h2 className="ml-[-20px] text-center font-display text-4xl lg:ml-[0px] lg:text-7xl">
					Testimonios de estudiantes
				</h2>

				<ul className="relative -ml-4 mt-4 flex snap-x snap-mandatory gap-2 overflow-scroll p-5 lg:ml-0 lg:mt-8 lg:gap-8 lg:px-4 xl:-mx-4">
					{testimonials.map((testimony) => (
						<TestimonialCard
							key={testimony.name}
							className="snap-center"
							name={testimony.name}
							profileImage={testimony.image}
							testimonial={testimony.text}
						/>
					))}
				</ul>
			</div>
		</section>
	);
}
