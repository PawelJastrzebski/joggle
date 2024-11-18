export const isWindows = () => typeof document != "undefined"
export const listen = (...args: Parameters<typeof window.addEventListener>) => window.addEventListener(...args)
export const queryAll = (query: string) => document.querySelectorAll(query) ?? []
export const query = (query: string) => document.querySelector(query)
export const pasiveListen = { passive: true }
export const clamp = (num: number, min: number, max: number) => {
    return num <= min
        ? min
        : num >= max
            ? max
            : num
}

const scrollTop = (el: Element) => {
    let e = el;
    let top = 0;
    do {
        top += (e.scrollTop ?? 0);
        e = e.parentNode as Element;
    } while (!!e)
    return top;
}

export const inView = (el?: HTMLElement | null) => {
    if (!el) return 0;
    const pos = el.getBoundingClientRect();
    if (pos.width < 1 || pos.height < 1) return 0
    const y = el.offsetTop - scrollTop(el)
    // const y = pos.y;

    const left = clamp(pos.x, 0, window.innerWidth)
    const right = clamp(pos.x + pos.width, 0, window.innerWidth)
    const top = clamp(y, 0, window.innerHeight)
    const bottom = clamp(y + pos.height, 0, window.innerHeight);
    return ((right - left) * (bottom - top)) / (pos.width * pos.height)
}

export function debounce<T extends (...args: any) => any>(callback: T, wait?: number): (...args: Parameters<T>) => void {
    if (!isWindows()) return callback;
    let timeoutId = null;
    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => callback(...args), wait ?? 100);
    };
}

export const observeNodeChange = (node: Element, change: () => any) => {
    if (!window.MutationObserver) return
    const config = { attributes: false, childList: true, subtree: true };
    const observer = new MutationObserver((mutationList) => {
        for (const mutation of mutationList) {
            if (mutation.type === "childList") {
                return change()
            }
        }
    });
    observer.observe(node, config)
}
