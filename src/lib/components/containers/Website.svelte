<script lang="ts">
    import { browser } from "$app/environment";
    import { getTheme } from "../../index.ts";
    import { onMount, type Snippet } from "svelte";
    import type { SvelteHTMLElements } from "svelte/elements";

    interface WebsiteProps {
        children: Snippet;
        as?: keyof SvelteHTMLElements;
        options: {
            theme?: "system" | "light" | "dark";
        }
    }
    const { children, options, as = "div" }: WebsiteProps = $props();

    let systemMode = browser ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : "dark";

    let theme = $state(getTheme());

    let w = $state(0)
    let h = $state(0);

    
    onMount(() => {
        if(browser) {
            w = window.outerWidth
            h = window.outerHeight
                
            window.onresize = () => {
                w = window.outerWidth
                h = window.outerHeight

                

                console.log(`${w} W x ${h} H`)
            }

            window.addEventListener("theme", (e: any) => {
                theme = e.detail.theme;
            })
            
        }
                console.log(`${w} W x ${h} H`)

    })

</script>

<svelte:element this={as} class="{theme === "system" ? systemMode : theme} font-normal" id="outer" style="width: {w}px; height: {h}px;">
<div id="inner">
    {@render children()}
</div>
</svelte:element>


<style>
@import url("../../styles/globals.css");

    #outer {
        position: absolute;
        top: 0;
        left: 0;

        /* width: 100%;*/
        height: 100%; 

        padding: 0.33em;
        margin: 0;
        box-sizing: border-box;

        background-color: var(--base);
        color: var(--text);
    }

    #inner {
        position: relative;
        width: 100%;
        height: 100%;

        scrollbar-width: thin;
    }
</style>