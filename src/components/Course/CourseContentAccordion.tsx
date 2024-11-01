import NextImage from 'next/image';

/* Components */
import { Accordion, AccordionItem } from '@/components/Accordion';

/* Utils */
import { cn } from '@/lib/utils/classNames';

/* Icons */
import plusIcon from '@images/icons/plus.svg';
import minusIcon from '@images/icons/minus.svg';

const items = [
	{
		title: 'Block number 1',
	},
	{
		title: 'Block number 2',
	},
	{
		title: 'Block number 3',
	},
	{
		title: 'Block number 4',
	},
	{
		title: 'Block number 5',
	},
];

export default function CourseContentAccordion() {
	return (
		<>
			<h2 className="py-7 text-2xl font-bold leading-8">Tabla de Contenido</h2>
			<Accordion>
				{items.map((item) => {
					return (
						<AccordionItem
							key={item.title}
							id={item.title}
							content={<p className="px-2 py-4">Yes, it is.</p>}
							header={
								<header key={item.title} className="flex w-full items-center justify-between">
									<p className="px-2 py-4"> Is it accessible?</p>
									<NextImage
										alt="Ver detalles"
										className={cn(
											'opacity-1 absolute right-2 transition-opacity duration-200 ease-linear group-data-[state=open]:opacity-0',
										)}
										height={16}
										src={plusIcon}
										width={16}
									/>
									<NextImage
										alt="Esconder detalles"
										className={cn(
											'absolute right-2 opacity-0 transition-opacity duration-200 ease-linear group-data-[state=open]:opacity-100',
										)}
										height={16}
										src={minusIcon}
										width={16}
									/>
								</header>
							}
						/>
					);
				})}
			</Accordion>
		</>
	);
}
