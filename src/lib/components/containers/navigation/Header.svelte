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

    interface HeaderNavigation {
        label: string;
        pathname: string;
        symbol: string;
    }

    interface HeaderProps {
        children?: Snippet | null;

        emoji?: string;
        label?: string;

        withThemeButton?: boolean;
        withIcons?: boolean;

        user?: Auth.User | null;
        authFeatures?: boolean;

        nav?: HeaderNavigation[];
    }

    let theme = $state(getTheme());

    function onThemeChange(new_theme: string) {
        theme = new_theme as any;
        console.log(`Changed theme to ${theme}`);
    }

    let {
        children = null,
        withThemeButton = true,
        withIcons = true,
        emoji = "🦆",
        label = "",

        user = null,
        authFeatures = false,

        nav = [],
    }: HeaderProps = $props();

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

<div>
    <Row justifyContent="space-between">
        <Row justifyContent="flex-start" widthPx="fit" gapEm={1}>
            <Row justifyContent="flex-start" widthPx="fit">
                <p class="font-emoji" id="emoji">{emoji}</p>
                {#if label !== "" && !mobileQuery.current}
                    <p class="font-bolder">{label}</p>
                {/if}
            </Row>
            {#if nav.length > 0}
                {#if !mobileQuery.current}<p class="font-normal sep">|</p>{/if}
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
                                    sizePx={32}
                                    inheritColor={true}
                                />
                            {:else if tabletQuery.current}
                                {n.label}
                            {:else if !tabletQuery.current}
                                <Row gapEm={0.33}>
                                    {#if withIcons}
                                        <Symbol
                                            name={n.symbol}
                                            sizePx={24}
                                            inheritColor={true}
                                            hoverEffect={false}
                                        />
                                    {/if}
                                    {n.label}
                                </Row>
                            {/if}
                        </a>
                    {/each}
                </Row>
            {/if}
        </Row>
        {#if children !== null}
            <Row widthPx="fit" textAlign="center">
                {@render children()}
            </Row>
        {/if}
        <Row widthPx="fit">
            {#if authFeatures}
                <Row widthPx="fit">

                    {#if user !== null}
                        <UserToast {user} />
                    {:else}
                        <LoginButton label="Log in to Join" />
                    {/if}
                </Row>
            {/if}
            {#if withThemeButton}
                <ThemeButton
                    mode="icon_only"
                    changeTheme={(new_theme) => onThemeChange(new_theme)}
                />
            {/if}
        </Row>
    </Row>
</div>

<style>
    @import url("../../../styles/globals.css");

    div {
        position: sticky;
        top: 0.33em;

        box-sizing: border-box;
        padding: 0 0.66em;
        margin-bottom: 1em;
        margin-left: auto;
        margin-right: auto;

        width: 100%;
        height: 2.66em;

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
        font-size: 1.33em;
    }
</style>
