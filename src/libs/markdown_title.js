
const firstLevelTitleRegexp = /\#(?<title>[^\#^\n]+)/

module.exports = {
    fromContent: (content) => {
        if (content && content.length > 0) {
            const m = content.match(firstLevelTitleRegexp)        
            const title = m && m.hasOwnProperty('groups') ? m.groups.title.trim() : false
            
            return title ? title : content.substring(0, 40)
        } else {
            return "Empty note"
        }
    }
}

