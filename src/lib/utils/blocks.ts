export function getBlockTypeName(blockType: string): string {
	switch (blockType) {
		case 'video':
			return 'Video';
		case 'exercise':
			return 'Ejercicio';
		case 'additional-material':
			return 'Material Adicional';
		case 'presentation':
			return 'Presentación';
		case 'text':
			return 'Texto';
		case 'archive':
			return 'Prácticas de alumnos anteriores';
		case 'dossier':
			return 'Cuadernillo de Lectura';
		case 'exercises':
			return 'Cuadernillo de Ejercicios';
		default:
			return blockType;
	}
}
