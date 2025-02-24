'use client';

import { useState } from 'react';
import NextImage from 'next/image';
import toast, { Toaster } from 'react-hot-toast';

/* Images */
import UserIcon from '@images/icons/user.svg';
import EmiIcon from '@images/emilce-sm.png';
import SendIcon from '@images/icons/send.svg';

/* Components */
import Spinner from '@/components/Spinner';

/* Utils */
import { cn } from '@/lib/utils/classNames';

/* Actions */
import { sendComment } from '../../actions/sendComment';

/* Types */
import type { Comment } from '@/payload-types';

interface CourseLessonCommentsMobileProps {
	courseId: string;
	blockId: string;
	lessonId: string;
	comments: Comment[];
	author: string;
	isLoading: boolean;
	refetchComments: (courseId: number, blockId: string, lessonId: string) => Promise<void>;
}

export default function CourseLessonCommentsMobile({
	courseId,
	blockId,
	author,
	comments,
	lessonId,
	isLoading,
	refetchComments,
}: CourseLessonCommentsMobileProps) {
	const [comment, setComment] = useState('');
	const [isSending, setIsSending] = useState(false);

	/* Handlers */
	async function handleSendComment() {
		setIsSending(true);
		const isHighlighted = author === 'Emilce Brusa';

		await sendComment(comment, courseId, blockId, lessonId, author, isHighlighted).catch(
			(error) => {
				// eslint-disable-next-line no-console
				console.error(error);
				toast.error('Error al enviar el comentario. Por favor, intenta nuevamente más tarde.');
			},
		);

		setComment('');
		setIsSending(false);
		toast.success('Comentario enviado correctamente.');
		await refetchComments(Number(courseId), blockId, lessonId);
	}

	return (
		<div className="w-full">
			<div className="relative flex items-center justify-center">
				<textarea
					rows={1}
					disabled={isSending}
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					placeholder={isSending ? 'Enviando...' : 'Escribe tu comentario aquí'}
					className="h-[40px] min-h-12 w-full appearance-none border-b-2 border-[#373F3F] bg-[#FFFCEE] p-2 px-14 text-gray-900 ring-0 placeholder:text-gray-600 focus:outline-[#E5CD4A]"
				/>

				<NextImage
					src={UserIcon as string}
					alt="User"
					width={24}
					height={24}
					className="absolute left-5 top-5 -translate-y-1/2"
				/>

				{isSending ? (
					<Spinner className="absolute right-6 top-[12px] text-cyan-600" size="sm" />
				) : (
					<NextImage
						src={SendIcon as string}
						alt="Send"
						width={20}
						height={20}
						className="absolute right-5 top-5 -translate-y-1/2"
						onClick={() => void handleSendComment()}
					/>
				)}
			</div>

			<Toaster
				toastOptions={{
					success: {
						style: {
							background: '#b6e8e9',
							fontWeight: 'bold',
						},
					},
					error: {
						style: {
							background: '#fbdedc',
							fontWeight: 'bold',
						},
					},
				}}
			/>

			{isLoading ? (
				<div className="mt-10 flex h-full w-full items-center justify-center gap-2">
					<Spinner className="text-cyan-600" size="sm" />
					<span className="text-gray-600">Cargando comentarios...</span>
				</div>
			) : comments.length > 0 ? (
				<ul className="relative flex w-full flex-col justify-self-center">
					{comments.map((comment) => (
						<li
							key={comment.id}
							className={cn(
								'flex w-full flex-col border-b-2 border-b-gray-500 px-5 first-of-type:pt-8',
								{
									'bg-pink-50': comment.highlighted,
								},
							)}
						>
							<p className="flex flex-col gap-2 py-3">
								<span className="flex gap-2 font-bold">
									{comment.highlighted ? (
										<NextImage src={EmiIcon} alt="User" width={24} height={24} />
									) : (
										<NextImage src={UserIcon as string} alt="User" width={24} height={24} />
									)}
									{comment.author ?? 'Anónimo'}
								</span>
								<span className="text-gray-600">{comment.comment}</span>
							</p>
						</li>
					))}
				</ul>
			) : (
				<div className="mt-10 flex h-full w-full flex-col items-center justify-center gap-2">
					<p className="text-gray-600">Aún nadie ha comentado esta clase.</p>
					<div className="h-px w-full bg-gray-500" role="separator" />
				</div>
			)}
		</div>
	);
}
