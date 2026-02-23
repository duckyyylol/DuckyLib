<script lang="ts">
    import { browser } from "$app/environment";
    import Symbol from "../text/Symbol.svelte";
    import {getTheme} from "../../index.ts"
    import { onMount } from "svelte";

    interface ThemeButtonProps {
        mode: "icon_only" | "with_text";
        changeTheme: (theme: string) => void;
    }

    let {mode, changeTheme}: ThemeButtonProps = $props();

    const themeSymbolMap = {
        "dark": "dark_mode",
        "system": "desktop_windows",
        "light": "light_mode",
    }

    const themesTooltipMap = {
        "dark": "Dark Mode",
        "light": "Light Mode",
        "system": "Match System Theme"
    }

    let systemMode = browser ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : "dark";

    const themes: string[] = Object.keys(themeSymbolMap);

    let theme = $state(getTheme());

    onMount(() => {
        if(browser) {
            themes.filter(t => t !== (theme === "system" ? systemMode : theme)).forEach(t => document.body.classList.remove(t))
            document.body.classList.add(theme === "system" ? systemMode : theme)
        }
    })

    function switchTheme() {
        let ind = themes.indexOf(theme) + 1;
        if(!themes[ind]) ind = 0;
        let it = themes[ind]
        theme = it as any;
        if(browser) {
            window.localStorage.setItem("theme", it)

            let ev = new CustomEvent("theme", {detail: {theme: it}})
            window.dispatchEvent(ev);

            themes.filter(t => t !== (theme === "system" ? systemMode : theme)).forEach(t => document.body.classList.remove(t))
            document.body.classList.add(theme === "system" ? systemMode : theme)
        }

        changeTheme(it);
        
    }
</script>

<button onclick={switchTheme} class="{mode} btn-{theme === "system" ? systemMode : theme}" title={themesTooltipMap[theme]} data-theme="{theme}">
    {#if mode === "icon_only"}
    <Symbol name={themeSymbolMap[theme]} inheritColor={true} />
    {:else if mode === "with_text"}
    <Symbol name={themeSymbolMap[theme]} inheritColor={true} sizePx={24} />
    <p class="font-bold">{themesTooltipMap[theme]}</p>
    {/if}
</button>

<style>
    @import url("../../styles/globals.css");

    button {
        cursor: pointer;
        
        display: flex;
        flex-direction: row;

        align-items: center;
        justify-content: center;

        outline: none;
        border: none;

        color: var(--text);
    }
    
    .icon_only {
        background-color: transparent;
        
        aspect-ratio: 1/1;
    }

    .icon_only[data-theme="dark"] {
        color: var(--yellow);
    }

    .icon_only[data-theme="light"] {
        color: var(--accent);
    }

    .icon_only[data-theme="system"] {
        color: var(--teal)
    }

    .with_text {
        padding: 0.2em 0.66em;
        border-radius: var(--border-md);
        background-color: var(--overlay-2);
        color: var(--base);
        gap: 0.66em;
        
        font-size: 1em;
    }

    .btn-dark:not(.icon_only):not([data-theme="system"]) {
        color: var(--yellow);
        & {
            p {
                color: var(--base);
            }
        }
    }

    .btn-light:not(.icon_only) {
        color: var(--surface-0);
    }
</style>
