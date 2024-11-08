'use client';

/* Radix UI */
import * as RadixAccordion from '@radix-ui/react-accordion';

/* Utils */
import { cn } from '@/lib/utils/classNames';

/* Types */
import type { ReactNode } from 'react';
import type { PropsWithClassName } from '@/lib/types';

type CourseDetailsAccordion = PropsWithClassName;

export function Accordion({ className, children }: CourseDetailsAccordion) {
	return (
		<RadixAccordion.Root className={cn('w-full shadow-4xl', className)} type="multiple">
			{children}
		</RadixAccordion.Root>
	);
}

export function AccordionItem({
	header,
	content,
	id,
}: {
	header: ReactNode;
	content: ReactNode;
	id: string;
}) {
	return (
		<RadixAccordion.Item
			className="focus-within:shadow-[0px 2px 6px 0px] border-b-grey mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10"
			value={id}
			key={id}
		>
			<RadixAccordion.Header className="flex bg-cyan-25">
				<RadixAccordion.Trigger className="group relative flex flex-1 cursor-default items-center justify-between outline-none">
					{header}
				</RadixAccordion.Trigger>
			</RadixAccordion.Header>

			<RadixAccordion.Content className="bg-[#F3F5F5] data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
				{content}
			</RadixAccordion.Content>
		</RadixAccordion.Item>
	);
}
