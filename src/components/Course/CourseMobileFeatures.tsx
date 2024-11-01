import NextImage from 'next/image';

interface CourseMobileFeaturesProps {
	features: { id: number; label: string; icon: string }[];
}

export default function CourseMobileFeatures({ features }: CourseMobileFeaturesProps) {
	return (
		<article className="mt-16 rounded-2xl bg-cyan-25 p-4 lg:hidden">
			<ul>
				{features.map((feature) => {
					return (
						<li key={feature.id} className="mt-4 flex gap-4 font-medium [&:first-of-type]:mt-0">
							<NextImage
								alt={feature.label}
								className="h-auto w-auto"
								height={16}
								src={feature.icon}
								width={16}
							/>
							<p>{feature.label}</p>
						</li>
					);
				})}
			</ul>
		</article>
	);
}
