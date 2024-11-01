import Image from 'next/image';

/* Assets */
import QuoteLeft from '@images/icons/quote.svg';
import QuoteRight from '@images/icons/quote-right.svg';

/* Types */
import type { PropsWithClassName } from '@/lib/types';
import type { StaticImageData } from 'next/image';

/* Utils */
import { cn } from '@/lib/utils/classNames';

export interface TestimonialCardProps extends PropsWithClassName {
	testimonial: string;
	profileImage: string | StaticImageData;
	name: string;
}

export default function TestimonialCard({
	className,
	testimonial,
	// profileImage,
	name,
}: TestimonialCardProps) {
	return (
		<li
			className={cn(
				'flex min-w-[320px] flex-col rounded-2xl bg-white p-8 shadow-lg lg:h-[322px] lg:w-[356px] lg:px-10 lg:py-5',
				className,
			)}
		>
			{/* Testimonial */}
			<div className="relative w-full flex-1 py-3">
				<div className="absolute left-0 top-0">
					<Image alt="Opening Quote" className="w-auto" height={24} src={QuoteLeft} width={24} />
				</div>
				<p className="mt-5 leading-6 text-gray-950 lg:mb-6 lg:mt-8 lg:text-xl lg:leading-7">
					{testimonial}
				</p>
				<div className="absolute bottom-0 right-0">
					<Image alt="Closing Quote" className="w-auto" height={24} src={QuoteRight} width={24} />
				</div>
			</div>

			{/* Profile Image and Name */}
			<div className="flex w-full items-center gap-3 pt-4 lg:mt-2 lg:pt-5">
				{/* <div className="rounded-full">
					<Image alt="Profile Image" className="h-12 w-12 lg:h-16 lg:w-16" src={profileImage} />
				</div> */}
				<p className="font-semibold text-grey-950">{name}</p>
			</div>
		</li>
	);
}
