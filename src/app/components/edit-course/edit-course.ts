import { Component, OnInit } from '@angular/core';
import { Course } from '../../interfaces/course';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-edit-course',
    imports: [ReactiveFormsModule],
    templateUrl: './edit-course.html',
    styleUrl: './edit-course.css',
})
export class EditCourse implements OnInit {
    id: string | null = '';
    course: Course | undefined;

    courseData: FormGroup = new FormGroup({
        name: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
        ]),
        hoursStudied: new FormControl(0, [Validators.required, Validators.pattern(/^[0-9]+$/)]),
        target: new FormControl('', [
            Validators.required,
            Validators.min(1),
            Validators.pattern(/^[0-9]+$/),
        ]),
    });

    constructor(
        public courseService: CourseService,
        public rout: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.id = this.rout.snapshot.paramMap.get('id');
        console.log(this.id);
        this.course = this.courseService.getCourseById(this.id);

        if (!this.course) {
            console.log('Course not found');
            return;
        }
        console.log(this.course);

        this.courseData.setValue({
            name: this.course.name,
            hoursStudied: this.course.hoursStudied,
            target: this.course.target,
        });
    }

    editCourse(): void {
        if (!this.id || !this.course || this.courseData.invalid) {
            return;
        }

        const updatedCourse: Course = {
            ...this.course,
            ...this.courseData.value,
        };

        this.courseService.editCourse(this.id, updatedCourse);
    }
}
