'use client';

import { Document, Page, pdfjs } from 'react-pdf';
import { useState, useCallback } from 'react';
import Image from 'next/image';

/* Styles */
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Icons
import ZoomIn from '@images/icons/zoom-in.svg';
import ZoomOut from '@images/icons/zoom-out.svg';
import Download from '@images/icons/download-light.svg';
import Play from '@images/icons/play.svg';

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
		<article className="relative z-0 mx-auto h-[650px] overflow-hidden border border-grey-900 lg:h-[968px] lg:w-[600px]">
			<div className="bg-grey-50 absolute inset-0 border bg-gray-50">
				<nav className="flex h-14 items-center justify-end gap-4 pr-5">
					<button onClick={() => setScale((prev) => Math.max(0.5, prev - 0.1))} className="h-8 w-8">
						<Image src={ZoomOut as string} alt="Zoom Out" className="h-auto w-4" />
					</button>
					<button onClick={() => setScale((prev) => Math.min(2, prev + 0.1))} className="h-8 w-8">
						<Image src={ZoomIn as string} alt="Zoom In" className="h-auto w-4" />
					</button>
					<button
						className="flex h-8 w-[153px] items-center justify-center gap-1 rounded-xl border border-grey-900 font-bold"
						onClick={() => window.open(file, '_blank')}
					>
						Descargar
						<Image src={Download as string} alt="Download" className="h-auto w-4" />
					</button>
				</nav>
				<div ref={containerRef} className="w-full overflow-auto">
					<div
						style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}
						className="w-full"
					>
						<Document
							file={file}
							onLoadSuccess={onDocumentLoadSuccess}
							loading={
								<div className="flex h-32 items-center justify-center">
									<p className="text-gray-600">Cargando...</p>
								</div>
							}
							externalLinkTarget="_blank"
						>
							<Page
								pageNumber={pageNumber}
								width={containerWidth ?? undefined}
								renderTextLayer={false}
								renderAnnotationLayer={true}
								className="h-full w-full"
							/>
						</Document>
					</div>
				</div>
			</div>
			<footer className="absolute bottom-0 left-0 right-0 h-14">
				{numPages && (
					<div className="flex h-full items-center justify-center">
						<div className="flex gap-2 pb-2">
							<button
								onClick={() => setPageNumber((prev) => Math.max(1, prev - 1))}
								disabled={pageNumber <= 1}
								className="flex gap-2 text-sm font-normal"
							>
								<Image
									src={Play as string}
									alt="Anterior"
									className="h-auto w-4 rotate-180 text-black"
								/>
							</button>
							<p>
								Página {pageNumber} de {numPages}
							</p>
							<button
								onClick={() => setPageNumber((prev) => Math.min(numPages, prev + 1))}
								disabled={pageNumber >= numPages}
								className="flex gap-2 text-sm font-normal disabled:opacity-30"
							>
								<Image src={Play as string} alt="Siguiente" className="h-auto w-4" />
							</button>
						</div>
					</div>
				)}
			</footer>
		</article>
	);
}
