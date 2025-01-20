import type { CollectionConfig } from 'payload';

/* Fields */
import { slugField } from '../fields/slug';

/* Blocks */
import { CourseContentBlock } from './CourseBlock';

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
							unique: true,
						},
						{
							label: 'Está publicado',
							name: 'isPublished',
							required: false,
							defaultValue: false,
							type: 'checkbox',
							admin: {
								description: 'Si está seleccionado, el curso se mostrará en la lista de cursos.',
							},
						},
						{
							label: 'Mostrar como "Próximamente"',
							name: 'isComingSoon',
							required: false,
							defaultValue: false,
							type: 'checkbox',
							admin: {
								description:
									'Si está seleccionado, el curso se mostrará como "Próximamente" en la lista de Cursos.',
							},
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
									},
									label: 'Precio en Dólares',
									name: 'usdPrice',
									required: true,
									type: 'number',
								},
							],
						},
						{
							type: 'row',
							fields: [
								{
									admin: {
										description:
											'Pequeña introducción al curso. Se muestra en la tarjeta del curso. Máximo 100 caracteres.',
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
										style: {
											marginTop: '2rem',
										},
									},
									label: 'Descripción Larga',
									name: 'longDescription',
									required: true,
									type: 'textarea',
								},
							],
						},
						{
							name: 'image',
							label: 'Imágen de Portada',
							admin: {
								description: 'Esta imágen se muestra en la tarjeta del Curso.',
								style: {
									marginTop: '4rem',
								},
							},
							type: 'upload',
							relationTo: 'media',
							required: true,
						},
						{
							type: 'select',
							label: 'Categoría',
							name: 'category',
							required: true,
							admin: {
								description: 'Elegir el tipo de curso.',
							},
							options: [
								{ label: 'Taller', value: 'Taller' },
								{ label: 'Laboratorio', value: 'Laboratorio' },
								{ label: 'Seminario', value: 'Seminario' },
							],
							defaultValue: 'Taller',
						},
						{
							type: 'array',
							name: 'syllabus',
							label: 'Temario',
							minRows: 1,
							labels: { plural: 'Temas', singular: 'Tema' },
							admin: {
								description:
									'Un punteo de los temas que se ven en el curso (no van los títulos del los videos, sólo de qué trata cada curso). Se muestra en el detalle del Curso.',
							},
							fields: [
								{
									label: 'Tema',
									name: 'unit',
									type: 'text',
									maxLength: 128,
								},
							],
						},
						{
							type: 'array',
							name: 'blocks',
							admin: {
								description: 'Los bloques del curso.',
							},
							label: 'Bloques de Contenido',
							labels: { singular: 'Bloque', plural: 'Bloques' },
							fields: [
								{
									type: 'text',
									label: 'Nombre del Bloque',
									name: 'name',
								},
								CourseContentBlock,
							],
						},
					],
				},
			],
		},
		{ ...slugField('name') },
	],
};
