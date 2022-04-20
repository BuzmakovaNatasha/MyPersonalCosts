export default {
    install(Vue) {
        if(this.installed) {
            return
        }

        this.install = true
        this.caller = null

        Vue.prototype.$menu = {
            EventBus: new Vue(),

            show({event, actions}) {
                const caller = event.target;
                if(caller != this.caller) {
                    this.caller = caller;
                    this.EventBus.$emit('shown', { actions, caller })
                    console.log("showMenu");
                }else {
                    this.hide();
                }
            },
            hide() {
                this.EventBus.$emit('hide')
                this.caller = null
                console.log('hideMenu');
            },
        }
    }
}