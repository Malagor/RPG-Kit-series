import { GameObject } from "./GameObject.ts";

export type EventCallback = (value: any) => void;

interface IEventItem {
  id: number;
  eventName: number;
  caller: GameObject;
  callback: EventCallback;
}

class Events {
  callbacks: IEventItem[] = [];
  nextId: number = 0;

  emit(eventName: number, value: any): void {
    this.callbacks.forEach((stored: IEventItem): void => {
      if (stored.eventName === eventName) {
        stored.callback(value);
      }
    });
  }

  on(eventName: number, caller: GameObject, callback: EventCallback): number {
    this.nextId += 1;
    this.callbacks.push({
      id: this.nextId,
      eventName,
      caller,
      callback,
    });

    return this.nextId;
  }

  off(id: number): void {
    this.callbacks = this.callbacks.filter((stored) => stored.id !== id);
  }

  unsubscribe(caller: GameObject): void {
    this.callbacks = this.callbacks.filter(
      (stored) => stored.caller !== caller,
    );
  }
}
export const events = new Events();
