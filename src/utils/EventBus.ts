export class EventBus {
    private listeners: Record<string, Array<(params?: Record<string, any>) => void>>;

    public constructor() {
        this.listeners = {};
    }

    public on(event: string, callback: (params?: Record<string, any>) => void) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    public off(event: string, callback: (params?: Record<string, any>) => void) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
    }

    public emit(event: string, params?: Record<string, any>) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event].forEach((listener) => {
            listener(params);
        });
    }
}
