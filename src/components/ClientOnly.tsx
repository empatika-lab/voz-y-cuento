'use client';

import { useEffect, useState, type ReactNode } from 'react';

export default function ClientOnly({ children }: { children: ReactNode }) {
	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
		// Use requestAnimationFrame to ensure DOM is fully rendered
		const frame = requestAnimationFrame(() => {
			setHasMounted(true);
		});

		return () => {
			cancelAnimationFrame(frame);
		};
	}, []);

	if (!hasMounted) return <div style={{ height: '100%', minHeight: '200px' }} />;

	return <>{children}</>;
}
