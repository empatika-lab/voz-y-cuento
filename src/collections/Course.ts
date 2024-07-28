import type { CollectionConfig } from 'payload';

export const Course: CollectionConfig = {
	slug: 'courses',
	admin: {
		useAsTitle: 'name',
		description: 'Los cursos de Voz y Cuento.',
	},
	labels: {
		singular: 'Curso',
		plural: 'Cursos',
	},
	fields: [
		{
			type: 'tabs',
			tabs: [
				{
					label: 'Ficha Técnica',
					fields: [
						{
							admin: {
								description: 'El nombre del curso',
								width: '100%',
							},
							label: 'Nombre',
							name: 'name',
							required: true,
							type: 'text',
							maxLength: 100,
						},
						{
							label: 'Es gratuito',
							name: 'isFree',
							required: false,
							defaultValue: false,
							type: 'checkbox',
						},
						{
							type: 'row',
							fields: [
								{
									admin: {
										description:
											'Pequeña introducción al curso. Se muestra en la tarjeta del curso.',
										width: '50%',
									},
									label: 'Descripción Corta',
									name: 'shortDescription',
									required: true,
									type: 'textarea',
									maxLength: 100,
								},

								{
									admin: {
										description:
											'Descipción detallada del curso. Se muestra en la página de detalle del curso',
										width: '50%',
									},
									label: 'Descripción Larga',
									name: 'longDescription',
									required: true,
									type: 'textarea',
								},
							],
						},
						{
							type: 'row',
							admin: {
								condition: (_data, sibling) => {
									return !sibling.isFree;
								},
							},
							fields: [
								{
									admin: {
										width: '50%',
										description: 'El precio para alumnos dentro de Argentina.',
										style: { marginTop: '2rem' },
									},
									label: 'Precio en Pesos',
									name: 'arsPrice',
									required: true,
									type: 'number',
								},
								{
									admin: {
										width: '50%',
										description: 'El precio para alumnos fuera de Argentina.',
										style: { marginTop: '2rem' },
									},
									label: 'Precio en Dólares',
									name: 'usdPrice',
									required: true,
									type: 'number',
								},
							],
						},
						{
							type: 'array',
							name: 'syllabus',
							label: 'Temario',
							minRows: 1,
							labels: { plural: 'Temas', singular: 'Tema' },
							admin: {
								description: 'Se muestra en el detalle del Curso.',
							},
							fields: [
								{
									label: 'Tema',
									name: 'unit',
									type: 'text',
									maxLength: 64,
								},
							],
						},
					],
				},
			],
		},
	],
};
