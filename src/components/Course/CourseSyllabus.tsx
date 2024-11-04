import type { Course } from '@/payload-types';

interface CourseSyllbusProps {
	syllabus: Course['syllabus'];
}

export default function CourseSyllbus({ syllabus }: CourseSyllbusProps) {
	if (!syllabus?.length) {
		return null;
	}

	return (
		<article>
			<h2 className="py-8 text-2xl font-bold lg:py-8">¿Qué te propongo?</h2>

			<ul className="flex flex-col gap-5 pl-4 lg:gap-10">
				{syllabus.map(({ id, unit }) => {
					if (!unit) {
						return null;
					}

					return (
						<li key={id} className="list-[square] text-xl marker:text-cyan-700 lg:text-xl">
							{unit}
						</li>
					);
				})}
			</ul>
		</article>
	);
}
