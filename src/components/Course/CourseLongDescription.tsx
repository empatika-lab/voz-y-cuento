interface CourseLongDescriptionProps {
	description: string;
}

export default function CourseLongDescription({ description }: CourseLongDescriptionProps) {
	return (
		<article className="mt-8 rounded-[20px] border-2 border-black bg-cyan-100 px-5 py-6 font-medium leading-6">
			{description}
		</article>
	);
}
