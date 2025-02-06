'use client';

import { useEffect, useState, type ReactNode } from 'react';

export default function ClientOnly({ children }: { children: ReactNode }) {
	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
		setHasMounted(true);
	}, []);

	if (!hasMounted) return null;

	return <>{children}</>;
}
