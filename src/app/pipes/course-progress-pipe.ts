import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Course } from '../interfaces/course';
import { CourseProgress } from '../interfaces/courseProgress';

@Pipe({
    name: 'courseProgress',
})
export class CourseProgressPipe implements PipeTransform {
    transform(courses: Course[]): CourseProgress[] {
        return courses.map((c) => ({
            id: c.id,
            name: c.name,
            progress: c.target > 0 ? Number(((c.hoursStudied / c.target) * 100).toFixed(2)) : 0,
            start: c.start,
        }));
    }
}
