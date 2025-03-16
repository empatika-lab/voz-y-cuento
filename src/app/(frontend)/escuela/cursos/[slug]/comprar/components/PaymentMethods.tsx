import NextImage from 'next/image';

/* Assets */
import Bank from '@images/icons/bank.svg';
import MercadoPago from '@images/icons/mercado-pago.svg';
import PayPal from '@images/icons/paypal.svg';

/* Components */
import { Accordion, AccordionItem } from '@/components/Accordion';

/* Icons */
import plusIcon from '@images/icons/plus.svg';
import minusIcon from '@images/icons/minus.svg';

/* Utils */
import { cn } from '@/lib/utils/classNames';

export default function PaymentMethods() {
	return (
		<article className="mt-12 flex flex-col gap-4">
			<h2 className="text-xl font-bold lg:mb-10">Medios de pago</h2>

			{/* Payment Methods - Mobile */}
			<Accordion className="lg:hidden">
				<AccordionItem
					key="bank"
					id="bank"
					content={
						<dl className="p-2">
							<p className="mb-2">Banco de la Provincia de Buenos Aires</p>

							<dt className="inline-block">Titular:</dt>
							<dd className="inline-block">&nbsp; Emilce Noemí Brusa</dd>
							<br />
							<dt className="inline-block">Cuenta N°:</dt>
							<dd className="inline-block">&nbsp;5020-21367/5 </dd>
							<br />
							<dt className="inline-block">CBU N°:</dt>
							<dd className="inline-block">&nbsp;0140079303502002136756</dd>
						</dl>
					}
					header={
						<header className="flex w-full items-center justify-between">
							<div className="flex gap-2">
								<NextImage src={Bank} alt="Transferencia Bancaria" width={32} height={32} />
								<p className="px-2 py-4">Transferencia Bancaria</p>
							</div>
							<NextImage
								alt="Ver detalles"
								className={cn(
									'opacity-1 absolute right-2 transition-opacity duration-200 ease-linear group-data-[state=open]:opacity-0',
								)}
								height={16}
								src={plusIcon}
								width={16}
							/>
							<NextImage
								alt="Esconder detalles"
								className={cn(
									'absolute right-2 opacity-0 transition-opacity duration-200 ease-linear group-data-[state=open]:opacity-100',
								)}
								height={16}
								src={minusIcon}
								width={16}
							/>
						</header>
					}
				/>

				<AccordionItem
					key="mercado-pago"
					id="mercado-pago"
					content={
						<dl className="p-2">
							<p className="mb-2">Banco de la Provincia de Buenos Aires</p>

							<dt className="inline-block">Titular:</dt>
							<dd className="inline-block">&nbsp; Emilce Noemí Brusa</dd>
							<br />
							<dt className="inline-block">Cuenta N°:</dt>
							<dd className="inline-block">&nbsp;5020-21367/5 </dd>
							<br />
							<dt className="inline-block">CBU N°:</dt>
							<dd className="inline-block">&nbsp;0140079303502002136756</dd>
						</dl>
					}
					header={
						<header className="flex w-full items-center justify-between">
							<div className="flex gap-2">
								<NextImage src={MercadoPago} alt="Mercado Pago" width={32} height={32} />
								<p className="px-2 py-4">Mercado Pago</p>
							</div>
							<NextImage
								alt="Ver detalles"
								className={cn(
									'opacity-1 absolute right-2 transition-opacity duration-200 ease-linear group-data-[state=open]:opacity-0',
								)}
								height={16}
								src={plusIcon}
								width={16}
							/>
							<NextImage
								alt="Esconder detalles"
								className={cn(
									'absolute right-2 opacity-0 transition-opacity duration-200 ease-linear group-data-[state=open]:opacity-100',
								)}
								height={16}
								src={minusIcon}
								width={16}
							/>
						</header>
					}
				/>

				<AccordionItem
					key="pay-pal"
					id="pay-pal"
					content={
						<dl className="p-2">
							<p className="mb-2">Banco de la Provincia de Buenos Aires</p>

							<dt className="inline-block">Titular:</dt>
							<dd className="inline-block">&nbsp; Emilce Noemí Brusa</dd>
							<br />
							<dt className="inline-block">Cuenta N°:</dt>
							<dd className="inline-block">&nbsp;5020-21367/5 </dd>
							<br />
							<dt className="inline-block">CBU N°:</dt>
							<dd className="inline-block">&nbsp;0140079303502002136756</dd>
						</dl>
					}
					header={
						<header className="flex w-full items-center justify-between">
							<div className="flex gap-2">
								<NextImage src={PayPal} alt="PayPal" width={32} height={32} />
								<p className="px-2 py-4">PayPal</p>
							</div>
							<NextImage
								alt="Ver detalles"
								className={cn(
									'opacity-1 absolute right-2 transition-opacity duration-200 ease-linear group-data-[state=open]:opacity-0',
								)}
								height={16}
								src={plusIcon}
								width={16}
							/>
							<NextImage
								alt="Esconder detalles"
								className={cn(
									'absolute right-2 opacity-0 transition-opacity duration-200 ease-linear group-data-[state=open]:opacity-100',
								)}
								height={16}
								src={minusIcon}
								width={16}
							/>
						</header>
					}
				/>
			</Accordion>

			{/* Payment Methods - Desktop */}
			<ul className="mt-12 hidden gap-4 lg:flex">
				<li className="relative w-[358px] rounded-lg bg-white px-4 pb-9 pt-12">
					<div className="absolute left-[50%] top-0 flex h-[76px] w-[76px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white">
						<NextImage src={Bank} alt="Transferencia bancaria" width={32} height={32} />
					</div>

					<p className="text-center text-2xl font-bold">Transferencia bancaria</p>

					<p className="mt-7">Banco de la Provincia de Buenos Aires</p>
					<dl>
						<dt className="inline-block">Titular:</dt>
						<dd className="inline-block">&nbsp; Emilce Noemí Brusa</dd>
						<br />
						<dt className="inline-block">Cuenta N°:</dt>
						<dd className="inline-block">&nbsp;5020-21367/5 </dd>
						<br />
						<dt className="inline-block">CBU N°:</dt>
						<dd className="inline-block">&nbsp;0140079303502002136756</dd>
					</dl>
				</li>

				<li className="relative w-[358px] rounded-lg bg-white px-4 pb-9 pt-12">
					<div className="absolute left-[50%] top-0 flex h-[76px] w-[76px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white">
						<NextImage src={MercadoPago} alt="Mercado Pago" width={32} height={32} />
					</div>

					<p className="text-center text-2xl font-bold">Mercado Pago</p>

					<dl className="mt-7">
						<dt className="inline-block">Titular:</dt>
						<dd className="inline-block">&nbsp; Emilce Noemí Brusa</dd>
						<br />
						<dt className="inline-block">Cuenta N°:</dt>
						<dd className="inline-block">&nbsp;5020-21367/5 </dd>
						<br />
						<dt className="inline-block">CBU N°:</dt>
						<dd className="inline-block">&nbsp;0140079303502002136756</dd>
					</dl>
				</li>

				<li className="relative w-[358px] rounded-lg bg-white px-4 pb-9 pt-12">
					<div className="absolute left-[50%] top-0 flex h-[76px] w-[76px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white">
						<NextImage src={PayPal} alt="PayPal" width={32} height={32} />
					</div>

					<p className="text-center text-2xl font-bold">PayPal</p>

					<p className="mt-7">Banco de la Provincia de Buenos Aires</p>
					<dl>
						<dt className="inline-block">Titular:</dt>
						<dd className="inline-block">&nbsp; Emilce Noemí Brusa</dd>
						<br />
						<dt className="inline-block">Cuenta N°:</dt>
						<dd className="inline-block">&nbsp;5020-21367/5 </dd>
						<br />
						<dt className="inline-block">CBU N°:</dt>
						<dd className="inline-block">&nbsp;0140079303502002136756</dd>
					</dl>
				</li>
			</ul>
		</article>
	);
}
