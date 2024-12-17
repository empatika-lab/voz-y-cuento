'use server';

import { getPayload } from 'payload';
import config from '@payload-config';

export const markCourseLessonAsViewed = async (
	courseId: number,
	studentId: number,
	blockId: number,
	lessonId: string,
) => {
	const payload = await getPayload({
		config,
	});

	const courseLessonStudentViews = await payload.find({
		collection: 'course-lesson-views',
		where: {
			and: [
				{
					course: {
						equals: courseId,
					},
				},
				{
					student: {
						equals: studentId,
					},
				},
			],
		},
	});

	// First case: the student does not have views for any block
	if (courseLessonStudentViews.totalDocs === 0) {
		await payload.create({
			collection: 'course-lesson-views',
			data: {
				course: courseId,
				student: studentId,
				data: { [blockId]: [lessonId] },
			},
		});
	}

	// Second case: the student has views for some blocks but not for this block
	if (courseLessonStudentViews.totalDocs > 0 && !courseLessonStudentViews.docs[0].data?.[blockId]) {
		const updatedStudentViews = {
			...courseLessonStudentViews.docs[0].data,
			[blockId]: [lessonId],
		};

		await payload
			.update({
				collection: 'course-lesson-views',
				data: {
					data: updatedStudentViews,
				},
				id: courseLessonStudentViews.docs[0].id,
			})
			.catch((error) => {
				// eslint-disable-next-line no-console
				console.log('Error updating course lesson views - Case 2', error);
			});
	}

	// Third case: the student has views for this block but not for this lesson
	if (courseLessonStudentViews.totalDocs > 0 && courseLessonStudentViews.docs[0].data?.[blockId]) {
		const updatedStudentViews = {
			...courseLessonStudentViews.docs[0].data,
			[blockId]: [...courseLessonStudentViews.docs[0].data[blockId], lessonId],
		};

		await payload
			.update({
				collection: 'course-lesson-views',
				data: {
					data: updatedStudentViews,
				},
				id: courseLessonStudentViews.docs[0].id,
			})
			.catch((error) => {
				// eslint-disable-next-line no-console
				console.log('Error updating course lesson views - Case 3', error);
			});
	}
};