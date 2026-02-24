<script lang="ts">
    import { browser } from "$app/environment";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import Heading from "../text/Heading.svelte";
    import Text from "../text/Text.svelte"
    import { getTheme } from "../../index.ts";

    interface ButtonProps {
        label: string;
        type?: "success" | "danger" | "primary" | "secondary";
        onclick?: (e: MouseEvent) => void;
        href?: string | null;

        size?: "large" | "normal";
    }

    let {
        label,
        type = "secondary",
        onclick = (e) => {
            console.log(`Voided Mouse Event`, e.timeStamp);
        },
        href = null,
        size = "normal"
    }: ButtonProps = $props();

    let systemMode = browser ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : "dark";
    let theme = $state(getTheme());

    onMount(() => {
        window.addEventListener("theme", (e: any) => {
            theme = e.detail.theme;
        })
    })
</script>

<button
data-theme="{theme === "system" ? systemMode : theme}"
    class={type}
    onclick={(e) => {
        if (browser && href) {
            goto(href);
        } else if (browser) {
            onclick(e);
        }
    }}><Heading size={size === "normal" ? 6 : 5} inheritColor={true}>{label}</Heading></button
>


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

        padding: 0.66em 1.33em;
        border-radius: var(--border-md);
        background-color: var(--overlay-2);
        color: var(--text);

        font-size: 0.7em;
        font-weight: 700;
    }

    button:hover {
        transition: all 0.2s;
        transform: scale(1.02) translateY(1px);
        filter: brightness(1.1);
    }

    button:not(:hover) {
        transition: all 0.2s;
        transform: scale(1) translateY(0);
        filter: brightness(1);
    }

    .danger {
        background-color: var(--maroon);
        color: var(--base);
    }

    .primary {
        background-color: var(--accent);
        color: var(--base);
    }

    .secondary {
        background-color: var(--overlay-0);
        color: var(--base);
    }

    .success {
        background-color: var(--green);
        color: var(--base);
        
    }

    /* .success[data-theme="dark"]  */
</style>