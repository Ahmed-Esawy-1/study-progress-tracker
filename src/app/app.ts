import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from './components/nav/nav';
import { Footer } from './components/footer/footer';
import { ChatWidget } from './components/chat-widget/chat-widget';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, Nav, Footer, ChatWidget],
    templateUrl: './app.html',
    styleUrl: './app.css',
})
export class App {
    protected readonly title = signal('study-progress-tracker');
}
