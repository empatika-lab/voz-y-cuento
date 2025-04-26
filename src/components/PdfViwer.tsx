'use client';

import { Document, Page, pdfjs } from 'react-pdf';
import { useState, useCallback } from 'react';
import Image from 'next/image';

// Components
import Button from '@/components/Button';
/* Styles */
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Icons
import Arrow from '@images/icons/arrow-right.svg';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	'pdfjs-dist/build/pdf.worker.min.mjs',
	import.meta.url,
).toString();

export default function PDFViewer({ file }: { file: string }) {
	const [numPages, setNumPages] = useState<number | null>(null);
	const [pageNumber, setPageNumber] = useState(1);
	const [scale, setScale] = useState(1.0);
	const [containerWidth, setContainerWidth] = useState<number | null>(null);

	const containerRef = useCallback((node: HTMLDivElement | null) => {
		if (node) {
			setContainerWidth(node.getBoundingClientRect().width);
		}
	}, []);

	function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
		setNumPages(numPages);
	}

	return (
		<div className="flex w-full flex-col items-center">
			<div className="mb-4 flex gap-4">
				<button
					onClick={() => setScale((prev) => Math.max(0.5, prev - 0.1))}
					className="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300"
				>
					Zoom Out
				</button>
				<button
					onClick={() => setScale((prev) => Math.min(2, prev + 0.1))}
					className="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300"
				>
					Zoom In
				</button>
				{numPages && (
					<div className="mt-4 flex flex-col items-center justify-center">
						<p>
							Página {pageNumber} de {numPages}
						</p>
						<div className="mt-2 flex gap-2">
							<Button
								onClick={() => setPageNumber((prev) => Math.min(numPages, prev + 1))}
								disabled={pageNumber >= numPages}
								variant="ghost"
								className="flex gap-2 text-sm font-normal"
							>
								Siguiente <Image src={Arrow as string} alt="Siguiente" className="h-auto w-4" />
							</Button>
							<Button
								onClick={() => setPageNumber((prev) => Math.max(1, prev - 1))}
								disabled={pageNumber <= 1}
								className="flex gap-2 text-sm font-normal"
								variant="ghost"
							>
								<Image
									src={Arrow as string}
									alt="Anterior"
									className="h-auto w-4 rotate-180 text-black"
								/>
								Anterior
							</Button>
						</div>
					</div>
				)}
			</div>
			<div ref={containerRef} className="w-full overflow-auto p-4">
				<div
					style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}
					className="w-full"
				>
					<Document
						file={file}
						onLoadSuccess={onDocumentLoadSuccess}
						loading={
							<div className="flex h-32 items-center justify-center">
								<p className="text-gray-600">Cargando PDF...</p>
							</div>
						}
					>
						<Page
							pageNumber={pageNumber}
							width={containerWidth ?? undefined}
							renderTextLayer={false}
							renderAnnotationLayer={false}
						/>
					</Document>
				</div>
			</div>
		</div>
	);
}
