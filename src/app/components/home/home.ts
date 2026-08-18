import { Component, OnInit } from '@angular/core';
import { Course } from '../../interfaces/course';
import { CourseService } from '../../services/course.service';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CourseProgressPipe } from '../../pipes/course-progress-pipe';
import { HighlightDirective } from '../../directives/highlight';
import { CourseProgress } from '../../interfaces/courseProgress';

@Component({
    selector: 'app-home',
    imports: [RouterLink, DatePipe, CourseProgressPipe, HighlightDirective],
    templateUrl: './home.html',
    styleUrl: './home.css',
})
export class Home implements OnInit {
    courses: Course[] = [];
    courseToDelete: CourseProgress | null = null;
    constructor(public courseService: CourseService) {}

    ngOnInit(): void {
        this.getAllCourses();
    }

    getAllCourses(): void {
        this.courses = this.courseService.getAllCourses();
    }

    selectCourseToDelete(course: CourseProgress): void {
        this.courseToDelete = course;
    }

    deleteCourse(): void {
        if (this.courseToDelete) {
            this.courseService.deleteCourse(this.courseToDelete.id);
            this.getAllCourses();
            this.courseToDelete = null;
        }
    }
}
