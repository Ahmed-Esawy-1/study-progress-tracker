import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

const apiValue = ''; // your api

@Injectable({ providedIn: 'root' })
export class ChatService {
    private apiUrl = 'https://api.groq.com/openai/v1/chat/completions';

    constructor(private http: HttpClient) {}

    sendMessage(messages: ChatMessage[]): Observable<string> {
        const body = { model: 'openai/gpt-oss-20b', messages };
        const headers = {
            Authorization: `Bearer ${apiValue}`,
            'Content-Type': 'application/json',
        };

        return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
            map((res) => {
                return res.choices[0].message.content;
            }),
        );
    }
}
