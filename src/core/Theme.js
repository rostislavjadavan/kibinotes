import Settings from "@/core/Settings"

export default new class {
    setup() {
        document.body.id = this.get()
    }
    
    set(theme) {
        document.body.id = theme;
        Settings.set('theme', theme)
    }

    get() {
        return Settings.get('theme', 'light')
    }
}
