<script lang="ts">
    import { onMount } from "svelte";

    interface TypewriterProps {
        texts: string[];
    }

    let {texts}: TypewriterProps = $props();

    let content = $state("");
    let index = $state(0);

    let textIndex = $state(0)

    let text = $state("")

    const deleteEffect = () => {
		if (index > 0) {
			content = content.slice(0, --index);
			setTimeout(deleteEffect, 300);
		} else {
			textIndex = (textIndex + 1) % texts[textIndex].length;
			content = ''; // Clear text but keep zero-width space
			setTimeout(type, 3000);
		}
	};

    const type = () => {
		const currentString = texts[textIndex] || texts[0];
		const delay = currentString[index] === ' ' ? 160 : 300;

		if (index < currentString.length) {
			content += currentString[index++];
			setTimeout(type, delay);
		}else {
            setTimeout(deleteEffect, 2000);
        }
	};

    onMount(() => {
        setTimeout(type, 500);
    })
    
</script>

<!-- {type()} -->
{content}

<style>
    @import url("../../styles/globals.css");
</style>