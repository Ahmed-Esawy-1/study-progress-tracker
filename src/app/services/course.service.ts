import { Injectable } from '@angular/core';
import { Course } from '../interfaces/course';

@Injectable({
    providedIn: 'root',
})
export class CourseService {
    courses: Course[] = [];

    constructor() {
        const stored = localStorage.getItem('courses');
        this.courses = stored ? JSON.parse(stored) : [];
    }

    getAllCourses(): Course[] {
        console.log(this.courses);
        return this.courses;
    }

    getCourseById(id: string | null): Course | undefined {
        return this.courses.find((c) => c.id == id);
    }

    addCourse(course: Omit<Course, 'id'>): void {
        const newCourse: Course = { id: crypto.randomUUID(), ...course, start: new Date() };
        this.courses = [...this.courses, newCourse];
        localStorage.setItem('courses', JSON.stringify(this.courses));
    }

    editCourse(id: string | null, course: Course): void {
        this.courses = this.courses.map((c) => (c.id !== id ? c : { ...course, id: c.id }));
        localStorage.setItem('courses', JSON.stringify(this.courses));
    }

    deleteCourse(id: string) {
        this.courses = this.courses.filter((c) => c.id !== id);
        localStorage.setItem('courses', JSON.stringify(this.courses));
    }
}
