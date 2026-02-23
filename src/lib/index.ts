import { browser } from "$app/environment";

export {default as LoginButton} from "./components/buttons/LoginButton.svelte";
export {default as ThemeButton} from "./components/buttons/ThemeButton.svelte";
export {default as UserToast} from "./components/buttons/UserToast.svelte";
export {default as InfoCard} from "./components/containers/cards/InfoCard.svelte";
export {default as LinkCard} from "./components/containers/cards/LinkCard.svelte";
export {default as Column} from "./components/containers/Column.svelte";
export {default as Footer} from "./components/containers/navigation/Footer.svelte";
export {default as Header} from "./components/containers/navigation/Header.svelte";
export {default as Row} from "./components/containers/Row.svelte";
export {default as Website} from "./components/containers/Website.svelte";
export {default as Markdown} from "./components/text/Markdown.svelte";
export {default as Typewriter} from "./components/text/Typewriter.svelte";

export function getTheme(): "dark" | "light" | "system" {
    if(browser) {
        if(window.localStorage.getItem("theme") !== null) {
            return window.localStorage.getItem("theme") as any;
        } else {
            window.localStorage.setItem("theme", "dark");
            
            return "dark";
        }
    } else {
        return "dark";
    }
}

