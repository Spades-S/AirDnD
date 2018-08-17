<template>
    <div @input="input" :contenteditable="editable" @focus="isLocked = true" @blur="isLocked = false">{{content}}</div>
</template>
<script>

    export default {
        props: ['value', 'editable'],
        data() {
            return {
                content: this.value,
                isLocked: false
            }
        },
        watch: {
            value() {
                if (!this.isLocked) {
                    this.content = this.value
                }
            }
        },
        methods: {
            input(e) {
                this.$emit('input', e.target.innerText)
            }
        }

    }
</script>