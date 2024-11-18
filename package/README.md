
# 🪁 joggle - Animate On Scroll

<img src="https://badgen.net/bundlephobia/min/joggle" alt="/bundlephobia/min/joggle"> 
<img src="https://badgen.net/bundlephobia/minzip/joggle" alt="/bundlephobia/min/joggle"> 

## Usage
index.html
```html
<h1  
    data-joggle="slide-up" 
    data-aos-joggle-visible="true" 
    data-joggle-duration="400" 
    data-joggle-threshold="0.2" 
    data-joggle-trigger=".my-wrapper" 
>
    Header slide-up
</h1>
```

app.js
```ts
import { create } from "joggle"
import "joggle/animations/main.css"
import "joggle/animations/fade.css"
import "joggle/animations/flip.css"
import "joggle/animations/zoom.css"
import "joggle/animations/slide.css"

export const joggle = create();
addEventListener("load", event => joggle.load());
```

## Predefined animations 🦄

**Fade**
```
fade
fade-up
fade-down
fade-left
fade-right
fade-up-right
fade-up-left
fade-down-right
fade-down-left
```
**Flip**
```
flip-up
flip-down
flip-left
flip-right
```
**Slide**
```
slide-up
slide-down
slide-left
slide-right
```
**Zoom**
```
zoom-in
zoom-in-up
zoom-in-down
zoom-in-left
zoom-in-right
zoom-out
zoom-out-up
zoom-out-down
zoom-out-left
zoom-out-right
```

## Custom animations

style.scss
```scss
[data-joggle][data-joggle='my-animation'] {
    // initial state
    transform: translate3d(0, 100%, 0);
    opacity: 0;

    &.joggle-animate {
        // in view state
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
}
```

## Global options

```scss
[data-joggle] {
    --joggle-delay: 100ms;
    --joggle-duration: 600ms;
    --joggle-offset: 100px;
}
```

## Acknowledgments 💌

Inspired by [michalsnik/aos](https://github.com/michalsnik/aos/tree/v2)