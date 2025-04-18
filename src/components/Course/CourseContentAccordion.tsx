import NextImage from 'next/image';

/* Components */
import { Accordion, AccordionItem } from '@/components/Accordion';

/* Utils */
import { cn } from '@/lib/utils/classNames';

/* Icons */
import plusIcon from '@images/icons/plus.svg';
import minusIcon from '@images/icons/minus.svg';
import videoIcon from '@images/icons/video.svg';
import pencilIcon from '@images/icons/pencil.svg';
import archiveIcon from '@images/icons/archive.svg';
import presentationIcon from '@images/icons/presentation.svg';

/* Types */
import type { Course } from '@/payload-types';

interface CourseContentAccordionProps {
	blocks?: Course['blocks'];
	courseCategory: 'Seminario' | 'Laboratorio' | 'Taller';
}

interface AccordionItemContentProps {
	content?: NonNullable<NonNullable<Course['blocks']>[number]['content']>;
}

function AccordionItemContent({ content }: AccordionItemContentProps) {
	if (!content) {
		return null;
	}

	function getIcon(blockType: string) {
		if (blockType === 'video' || blockType === 'archive') {
			return <NextImage alt="Video" height={16} src={videoIcon as string} width={16} />;
		}

		if (blockType === 'exercise') {
			return <NextImage alt="Ejercicio" height={16} src={pencilIcon as string} width={16} />;
		}

		if (blockType === 'additional-material') {
			return (
				<NextImage alt="Material Adicional" height={16} src={archiveIcon as string} width={16} />
			);
		}

		if (blockType === 'presentation') {
			return (
				<NextImage alt="Presentación" height={16} src={presentationIcon as string} width={16} />
			);
		}

		return null;
	}

	function getBlockTypeName(blockType: string) {
		if (blockType === 'video') {
			return 'Video';
		}

		if (blockType === 'exercise') {
			return 'Ejercicio';
		}

		if (blockType === 'additional-material') {
			return 'Material Adicional';
		}

		if (blockType === 'presentation') {
			return 'Presentación';
		}

		if (blockType === 'text') {
			return 'Texto';
		}

		if (blockType === 'archive') {
			return 'Prácticas de alumnos anteriores';
		}

		return blockType;
	}

	return (
		<ul className="bg-gray-50">
			{content.map((item) => {
				// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
				const title = item.blockName ? item.blockName : getBlockTypeName(item.blockType);

				return (
					<li key={item.id} className="flex items-center rounded-lg py-4 pl-5 lg:px-[152px]">
						{getIcon(item.blockType)}
						<p className="pl-4">{title}</p>
					</li>
				);
			})}
		</ul>
	);
}

export default function CourseContentAccordion({
	blocks,
	courseCategory,
}: CourseContentAccordionProps) {
	if (!blocks?.length) {
		return null;
	}

	return (
		<>
			<h2 className="py-7 text-2xl font-bold leading-8">Tabla de Contenido</h2>
			<Accordion>
				{blocks.map((block, index) => {
					const key = block.name ?? `block-${index}`;

					return (
						<AccordionItem
							key={key}
							id={key}
							content={<AccordionItemContent content={block.content ?? []} />}
							header={
								<header
									key={key}
									className="flex w-full items-center justify-between bg-cyan-25 px-4 lg:px-8"
								>
									{/* Mobile */}
									<p className="max-w-[85%] py-4 text-left font-bold lg:hidden">
										Bl {index + 1}
										{block.name && ':'}
										{block.name && <span className="pl-3 font-normal">{block.name}</span>}
									</p>

									{/* Desktop */}
									<p className="hidden truncate py-4 font-bold lg:block lg:max-w-[85%]">
										<span className="pr-10">
											{courseCategory === 'Seminario' ? 'Parte' : 'Bloque'} {index + 1}
										</span>
										{block.name && <span className="pl-3 font-normal">{block.name}</span>}
									</p>
									<NextImage
										alt="Ver detalles"
										className={cn(
											'opacity-1 absolute right-4 transition-opacity duration-200 ease-linear group-data-[state=open]:opacity-0 lg:right-8',
										)}
										height={16}
										src={plusIcon}
										width={16}
									/>
									<NextImage
										alt="Esconder detalles"
										className={cn(
											'absolute right-4 opacity-0 transition-opacity duration-200 ease-linear group-data-[state=open]:opacity-100 lg:right-8',
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
