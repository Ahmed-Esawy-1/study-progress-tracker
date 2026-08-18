import {
    Component,
    ElementRef,
    ViewChild,
    AfterViewChecked,
    ChangeDetectorRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat-widget';

interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

@Component({
    selector: 'app-chat-widget',
    imports: [FormsModule],
    templateUrl: './chat-widget.html',
    styleUrl: './chat-widget.css',
})
export class ChatWidget implements AfterViewChecked {
    @ViewChild('chatBody') private chatBody?: ElementRef<HTMLDivElement>;

    isOpen = false;
    draft = '';
    loading = false;
    messages: ChatMessage[] = [];

    constructor(
        private chatService: ChatService,
        private cdr: ChangeDetectorRef,
    ) {}

    ngAfterViewChecked(): void {
        this.scrollToBottom();
    }

    togglePanel(): void {
        this.isOpen = !this.isOpen;

        if (this.isOpen) {
            setTimeout(() => this.scrollToBottom());
        }
    }

    send(): void {
        const text = this.draft.trim();

        if (!text || this.loading) return;

        // Add user message
        this.messages = [
            ...this.messages,
            {
                role: 'user',
                content: text,
            },
        ];

        this.draft = '';
        this.loading = true;

        this.chatService.sendMessage(this.messages).subscribe({
            next: (reply) => {
                // Add assistant response
                this.messages = [
                    ...this.messages,
                    {
                        role: 'assistant',
                        content: reply,
                    },
                ];

                this.loading = false;

                // Make sure Angular updates the UI immediately
                this.cdr.detectChanges();

                setTimeout(() => this.scrollToBottom());
            },

            error: (err) => {
                console.error('Chat error:', err);

                this.messages = [
                    ...this.messages,
                    {
                        role: 'assistant',
                        content: 'Something went wrong. Please try again.',
                    },
                ];

                this.loading = false;

                this.cdr.detectChanges();

                setTimeout(() => this.scrollToBottom());
            },
        });
    }

    private scrollToBottom(): void {
        if (!this.chatBody) return;

        const element = this.chatBody.nativeElement;

        element.scrollTop = element.scrollHeight;
    }
}
