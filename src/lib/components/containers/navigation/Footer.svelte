<script lang="ts">
    import type { Snippet } from "svelte";
    import Row from "../Row.svelte";
    import { getTheme } from "../../../index.ts";
    import ThemeButton from "$lib/components/buttons/ThemeButton.svelte";
    import { page } from "$app/state";
    import { MediaQuery } from "svelte/reactivity";
    import Symbol from "$lib/components/text/Symbol.svelte";
    import type { Auth } from "../../../types.ts";
    import LoginButton from "$lib/components/buttons/LoginButton.svelte";
    import UserToast from "$lib/components/buttons/UserToast.svelte";
    import { PUBLIC_MOBILE_SIZE_PX, PUBLIC_TABLET_SIZE_PX } from "$env/static/public";

    interface FooterNavigation {
        label: string;
        pathname: string;
        symbol: string;
    }

    interface FooterProps {
        emoji?: string;
        copyright?: string;

        nav?: FooterNavigation[];
    }

    let theme = $state(getTheme());

    let {
        emoji = "🦆",
        copyright = "madeby",

        nav = [],
    }: FooterProps = $props();

    function getNav() {
        return nav;
    }

    nav = [
        {
            label: "Home",
            pathname: "/",
            symbol: "home",
        },
        ...getNav(),
    ];

    const mobileQuery = new MediaQuery(`max-width: ${PUBLIC_MOBILE_SIZE_PX}px`);
    const tabletQuery = new MediaQuery(`max-width: ${PUBLIC_TABLET_SIZE_PX}px`);
</script>

<div style="">
    <!-- <Row justifyContent="space-between"> -->
        <Row justifyContent="space-between" widthPx="fit" gapEm={1}>
            <Row justifyContent="flex-start" widthPx="fit">
                <p class="font-emoji" id="emoji">{copyright === "madeby" ? "🦆" : emoji}</p>
                {#if copyright !== "madeby"}
                    <p class="font-bold">&copy; {copyright} {new Date().getFullYear()}</p>
                    {:else if copyright === "madeby"}
                    <p class="font-normal italic sep">Website made by <a href="https://ducky.wiki" target="_blank" class="yellow">ducky</a></p>
                {/if}
            </Row>
            {#if nav.length > 0}
                <!-- {#if !mobileQuery.current}<p class="font-normal sep">|</p>{/if} -->
                <Row widthPx="fit" gapEm={mobileQuery.current ? 1 : 1.33}>
                    {#each nav as n}
                        <a
                            href={n.pathname}
                            class="font-semibold{page.url.pathname ===
                            n.pathname
                                ? ' current'
                                : ''}"
                        >
                            {#if mobileQuery.current}
                                <Symbol
                                    name={n.symbol}
                                    sizePx={24}
                                    inheritColor={true}
                                />
                            {:else if tabletQuery.current}
                                {n.label}
                            {:else if !tabletQuery.current}
                                <Row gapEm={0.33}>
                                    
                                    {n.label}
                                </Row>
                            {/if}
                        </a>
                    {/each}
                </Row>
            {/if}
        </Row>
        
        
    <!-- </Row> -->
</div>

<style>
    @import url("../../../styles/globals.css");

    div {
        /* position: absolute; */
        /* left: 5%; */
        /* bottom: 0.33em; */

        box-sizing: border-box;
        padding: 0 0.66em;
        margin-top: 3em;
        /* margin-left: auto;
        margin-right: auto; */

        width: 90%;
        height: 2.33em;

        border-radius: var(--border-md);
        background-color: var(--surface-0);

        filter: drop-shadow(0 3px 3px var(--crust));

        user-select: none;
        z-index: 100;
    }

    a {
        margin: 0;
        line-height: 1em;
    }

    #emoji {
        font-size: 1.2em;
    }
</style>
