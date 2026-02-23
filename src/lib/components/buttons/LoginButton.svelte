<script lang="ts">
    import Symbol from "../text/Symbol.svelte";

    interface LoginButtonProps {
        label?: string;
        withIcon?: boolean;
    }

    let {label = "Log In", withIcon = true}: LoginButtonProps = $props();

    function login() {
        console.log("login")
    }
</script>

<button onclick={login}>
{#if withIcon}<Symbol name="account_circle" inheritColor={true} sizePx={20} hoverEffect={false} />{/if}
    <p class="font-bold">{label}</p>
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

        padding: 0.1em 0.66em;
        border-radius: var(--border-md);
        background-color: var(--mantle);
        color: var(--text);
        gap: 0.66em;
        
        font-size: 0.95em;
    }

    button:hover {
        transition: all 0.2s;
        transform: scale(1.02);
        filter: brightness(1.1);
    }

    button:not(:hover) {
        transition: all 0.2s;
        transform: scale(1);
        filter: brightness(1);
    }
</style>
