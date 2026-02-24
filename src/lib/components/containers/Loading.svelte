<script lang="ts">
    import Heading from "../text/Heading.svelte";
    import Column from "./Column.svelte";
    import Text from "../text/Text.svelte"
    import { onMount } from "svelte";
    import Symbol from "../text/Symbol.svelte";


    let loaded = $state(false);

    onMount(() => {
        window.onscroll = (e) => {
            if(!loaded) {
                e.preventDefault();
                window.scrollTo({top: 0, behavior: "instant"})
            }
        }

        setTimeout(() => {
            loaded = true;
            
        }, 7e2)
    })

</script>

{#if !loaded}
<div>
<Column marginLeftPx="auto" marginRightPx="auto" textWrap={true}>
    <Column heightPx="fit" textWrap={true} widthPercent={95}>
        <Symbol name="hourglass" sizePx={64} />
        <Heading size={2} weight="boldest">Loading...</Heading>
        
        <Text weight="normal" classList={["italic"]}>Your content is loading. Thank you for your patience.</Text>
        
    </Column>
</Column>
</div>
{/if}

<style>
    @import url("../../styles/globals.css");

    div {
        position: absolute;
        top: 0;
        left: 0;

        width: 100%;
        height: 110%; 


        padding: 0.33em;
        margin: 0;
        box-sizing: border-box;

        background-color: var(--base);
        color: var(--text);

        z-index: 2000;
    }
</style>