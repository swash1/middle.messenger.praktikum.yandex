export class EventBus {
    listeners: Record<string, Array<(params?: Record<string, any>) => void>>;

    constructor() {
        this.listeners = {};
    }

    on(event: string, callback: (params?: Record<string, any>) => void) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    off(event: string, callback: (params?: Record<string, any>) => void) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
    }

    emit(event: string, params?: Record<string, any>) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event].forEach((listener) => {
            listener(params);
        });
    }
}
