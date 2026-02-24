import { browser } from "$app/environment";
import type {Auth} from "./types.ts"

export {default as LoginButton} from "./components/buttons/LoginButton.svelte";
export {default as ThemeButton} from "./components/buttons/ThemeButton.svelte";
export {default as Button} from "./components/buttons/Button.svelte";
export {default as UserToast} from "./components/buttons/UserToast.svelte";

export {default as InfoCard} from "./components/containers/cards/InfoCard.svelte";
export {default as ButtonCard} from "./components/containers/cards/ButtonCard.svelte";

export {default as Footer} from "./components/containers/navigation/Footer.svelte";
export {default as Header} from "./components/containers/navigation/Header.svelte";
export {default as SearchBar} from "./components/containers/navigation/SearchBar.svelte"

export {default as AgeConfirm} from "./components/containers/AgeConfirm.svelte"
export {default as Column} from "./components/containers/Column.svelte";
export {default as Row} from "./components/containers/Row.svelte";
export {default as Website} from "./components/containers/Website.svelte";
export {default as HorizontalRule} from "./components/containers/HorizontalRule.svelte";

export {default as Markdown} from "./components/text/Markdown.svelte";
export {default as Typewriter} from "./components/text/Typewriter.svelte";
export {default as Heading} from "./components/text/Heading.svelte";
export {default as Text} from "./components/text/Text.svelte";
export {default as Code} from "./components/text/Code.svelte";

export * from "./types.ts"
export * from "./styles/globals.css"
export * from "./styles/fonts.css"
export * from "./styles/emojis.css"
export * from "./styles/icons.css"
export * from "./styles/theme.css"

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

export function getAgeVerified(): boolean {
    if(browser) {
        if(window.localStorage.getItem("av") !== null) {
            let it = window.localStorage.getItem("av")
            return it === "true";
        } else {
            window.localStorage.setItem("av", "false");
            
            return false;
        }
    } else {
        return false;
    }
}

export function getUserData(): Auth.User | null {
    if(browser) {
        if(window.localStorage.getItem("av") !== null) {
            let it: string | null = window.localStorage.getItem("userData")
            if(!it) {
                window.localStorage.setItem("userData", "null");
            
            return null;
            }

            let obj: Auth.User = JSON.parse(it);
            return obj;
        } else {
            window.localStorage.setItem("userData", "null");
            
            return null;
        }
    } else {
        return null;
    }
}

export function setUserData(user: Auth.User): void {
    if(browser) {
        window.localStorage.setItem("userData", JSON.stringify(user));
    }
}