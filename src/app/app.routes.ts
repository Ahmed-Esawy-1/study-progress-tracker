import { Routes } from '@angular/router';
import { Add } from './components/add/add';
import { Home } from './components/home/home';
import { CourseDetails } from './components/course-details/course-details';
import { EditCourse } from './components/edit-course/edit-course';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'course/add', component: Add },
    { path: 'course/details/:id', component: CourseDetails },
    { path: 'course/edit/:id', component: EditCourse },
];
