import { debounce, inView, isWindows, listen, query, queryAll, pasiveListen, observeNodeChange } from "./joggle_utils"

type RegistryItem = {
    n: HTMLElement, // node
    t?: HTMLElement // trigger
    th?: number // threshold
    o: boolean // once
}

type InitOptions = {
    disable?: boolean,
    detactLoop?: 200 | 500 | 1000
}

const init = "joggle-init";
const animate = "joggle-animate";

export const create = (options?: InitOptions) => {
    let registry = [] as RegistryItem[];
    let disable = options?.disable ?? false

    const setupRegistry = () => {
        registry = []
        for (let n of queryAll("[data-joggle]") as HTMLElement[]) {
            const meta = n.dataset ?? {};
            const t = query(meta.joggleTrigger) as HTMLElement
            const o = "joggleOnce" in meta
            const th = parseInt(meta.joggleThreshold) || 0.3
            registry.push({ n, t, th, o })
            n.classList.add(init)
        }
    }
    const detectVisible = () => {
        for (let e of registry) {
            const classL = e.n.classList;
            if (classL.contains(animate) && e.o) continue;
            if (disable || inView(e.t ?? e.n) > e.th) {
                classL.add(animate)
            } else {
                classL.remove(animate)
            }
        }
    }

    const setupRegistrydebounce = debounce(setupRegistry, 20)
    const detectVisibledebounce = debounce(detectVisible, 20)
    return {
        load() {
            if (!isWindows()) return;

            // change detection
            observeNodeChange(document.body, () => {
                setupRegistrydebounce()
                detectVisibledebounce()
            })
            listen("navigate", setupRegistrydebounce, pasiveListen)
            listen("hashchange", setupRegistrydebounce, pasiveListen)
            listen("click", setupRegistrydebounce, pasiveListen)
            setupRegistry()

            // visibility detection
            listen("scroll", detectVisibledebounce, pasiveListen)
            listen("resize", detectVisibledebounce, pasiveListen)
            listen("change", detectVisibledebounce, pasiveListen)
            setInterval(detectVisible, options?.detactLoop ?? 1_000)
            detectVisibledebounce()
        },
        detect: () => detectVisibledebounce(),
        reset: () => setupRegistrydebounce(),
        disable: () => {
            disable = true
            detectVisible()
        },
        enable: () => {
            disable = false
            setupRegistry()
            detectVisible()
        }
    }
}