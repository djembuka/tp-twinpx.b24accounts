//не срабатывает на iPhone
export const isOnIOS: RegExpMatchArray | null = navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i);

export const unloadEventName: string = isOnIOS ? 'pagehide' : 'beforeunload';

