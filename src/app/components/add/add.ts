import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseService } from '../../services/course.service';

@Component({
    selector: 'app-add',
    imports: [ReactiveFormsModule],
    templateUrl: './add.html',
    styleUrl: './add.css',
})
export class Add {
    constructor(public courseService: CourseService) {}

    courseData: FormGroup = new FormGroup({
        name: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
        ]),
        hoursStudied: new FormControl(0, [Validators.required, Validators.pattern(/^[0-9]+$/)]),
        target: new FormControl(0, [
            Validators.required,
            Validators.min(1),
            Validators.pattern(/^[0-9]+$/),
        ]),
    });

    get name() {
        return this.courseData.get('name');
    }
    get hoursStudied() {
        return this.courseData.get('hoursStudied');
    }
    get target() {
        return this.courseData.get('target');
    }

    addCourse(): void {
        if (this.courseData.invalid) {
            this.courseData.markAllAsTouched();
            return;
        }
        this.courseService.addCourse(this.courseData.value);
        this.courseData.reset();
    }
}
