import React, { Fragment } from 'react';
import NextLink from 'next/link';
import NextImage from 'next/image';

import {
	IS_BOLD,
	IS_CODE,
	IS_ITALIC,
	IS_STRIKETHROUGH,
	IS_SUBSCRIPT,
	IS_SUPERSCRIPT,
	IS_UNDERLINE,
} from './NodeFormat';
import type {
	DefaultNodeTypes,
	SerializedBlockNode,
	SerializedUploadNode,
} from '@payloadcms/richtext-lexical';

/* Icons */
import DownloadIcon from 'public/images/icons/download.svg';

/* Types */
import type { JSX } from 'react';
import type { Media } from '@/payload-types';
export type NodeTypes = DefaultNodeTypes | SerializedBlockNode | SerializedUploadNode;

interface Props {
	nodes: NodeTypes[];
}

export function SerializeLexical({ nodes }: Props): JSX.Element {
	return (
		<Fragment>
			{nodes?.map((node, index): JSX.Element | null => {
				if (node == null) {
					return null;
				}

				if (node.type === 'text') {
					let text = <React.Fragment key={index}>{node.text}</React.Fragment>;
					if (node.format & IS_BOLD) {
						text = <strong key={index}>{text}</strong>;
					}
					if (node.format & IS_ITALIC) {
						text = <em key={index}>{text}</em>;
					}
					if (node.format & IS_STRIKETHROUGH) {
						text = (
							<span key={index} style={{ textDecoration: 'line-through' }}>
								{text}
							</span>
						);
					}
					if (node.format & IS_UNDERLINE) {
						text = (
							<span key={index} style={{ textDecoration: 'underline' }}>
								{text}
							</span>
						);
					}
					if (node.format & IS_CODE) {
						text = <code key={index}>{node.text}</code>;
					}
					if (node.format & IS_SUBSCRIPT) {
						text = <sub key={index}>{text}</sub>;
					}
					if (node.format & IS_SUPERSCRIPT) {
						text = <sup key={index}>{text}</sup>;
					}

					return text;
				}

				if (node.type === 'upload') {
					// @ts-expect-error
					const isPdf = (node.value?.mimeType as string).includes('pdf');
					return (
						<article key={index}>
							{/* @ts-expect-error */}
							{node.value?.url && (
								<NextLink
									href={(node.value as unknown as Media).url!}
									target="_blank"
									className={`relative my-5 flex max-w-96 flex-col items-center border bg-white ${isPdf ? 'p-4' : ''}`}
									key={index}
									rel="noreferrer"
								>
									{isPdf && (
										<NextImage
											src={DownloadIcon as string}
											// @ts-expect-error
											alt={node.value.alt}
											width={16}
											height={16}
											className="mr-4"
										/>
									)}
									{/* @ts-expect-error */}
									{(node.value?.mimeType as string).includes('jpg') && (
										<NextImage
											// @ts-expect-error
											src={node.value.url}
											// @ts-expect-error
											alt={node.value.alt}
											// @ts-expect-error
											width={node.value.width}
											// @ts-expect-error
											height={node.value.height}
											className="rounded-md object-cover"
										/>
									)}
									{/* @ts-expect-error */}
									{(node.value?.mimeType as string).includes('jpeg') && (
										<NextImage
											// @ts-expect-error
											src={node.value.url}
											// @ts-expect-error
											alt={node.value.alt}
											// @ts-expect-error
											width={node.value.width}
											// @ts-expect-error
											height={node.value.height}
											className="rounded-md object-cover"
										/>
									)}
									{/* @ts-expect-error */}
									{(node.value?.mimeType as string).includes('png') && (
										<NextImage
											// @ts-expect-error
											src={node.value.url}
											// @ts-expect-error
											alt={node.value.alt}
											width={16}
											height={16}
											className="rounded-md object-cover"
										/>
									)}
									{/* @ts-expect-error */}
									{node.value?.alt && <div className="m-0 text-pretty">{node.value.alt}</div>}
								</NextLink>
							)}
						</article>
					);
				}

				// NOTE: Hacky fix for
				// https://github.com/facebook/lexical/blob/d10c4e6e55261b2fdd7d1845aed46151d0f06a8c/packages/lexical-list/src/LexicalListItemNode.ts#L133
				// which does not return checked: false (only true - i.e. there is no prop for false)
				const serializedChildrenFn = (node: NodeTypes): JSX.Element | null => {
					if (node.children == null) {
						return null;
					} else {
						if (node?.type === 'list' && node?.listType === 'check') {
							for (const item of node.children) {
								if ('checked' in item) {
									if (!item?.checked) {
										item.checked = false;
									}
								}
							}
						}
						return SerializeLexical({ nodes: node.children as NodeTypes[] });
					}
				};

				const serializedChildren = 'children' in node ? serializedChildrenFn(node) : '';

				if (node.type === 'block') {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
					const block = node.fields;

					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
					const blockType = block?.blockType;

					if (!block || !blockType) {
						return null;
					}

					switch (blockType) {
						default:
							return null;
					}
				} else {
					switch (node.type) {
						case 'linebreak': {
							return <br className="col-start-2" key={index} />;
						}
						case 'paragraph': {
							return (
								<p className="col-start-2" key={index}>
									{serializedChildren}
								</p>
							);
						}
						case 'heading': {
							const Tag = node?.tag;
							return (
								<Tag className="col-start-2 mt-10 text-lg" key={index}>
									{serializedChildren}
								</Tag>
							);
						}
						case 'list': {
							const Tag = node?.tag;
							return (
								<Tag className="list col-start-2" key={index}>
									{serializedChildren}
								</Tag>
							);
						}
						case 'listitem': {
							if (node?.checked != null) {
								return (
									<li
										aria-checked={node.checked ? 'true' : 'false'}
										className={` ${node.checked ? '' : ''}`}
										key={index}
										role="checkbox"
										tabIndex={-1}
										value={node?.value}
									>
										{serializedChildren}
									</li>
								);
							} else {
								return (
									<li key={index} value={node?.value}>
										{serializedChildren}
									</li>
								);
							}
						}
						case 'quote': {
							return (
								<blockquote className="col-start-2" key={index}>
									{serializedChildren}
								</blockquote>
							);
						}
						case 'link': {
							const fields = node.fields;

							return (
								<NextLink
									key={index}
									href={fields.url ?? ''}
									target="_blank"
									rel="noreferrer"
									className="font-bold text-cyan-800 underline hover:text-cyan-900"
								>
									{serializedChildren}
								</NextLink>
							);
						}

						default:
							return null;
					}
				}
			})}
		</Fragment>
	);
}
