var visit = require('unist-util-visit')
var is = require('unist-util-is')

module.exports = attacher

function attacher() {
    return transformer

    function transformer(tree, file) {
        visit(tree, 'paragraph', visitor)

        function visitor(node) {
            var children = node.children

            children.forEach(function (child, index) {
                if (is(child, 'text')) {
                    let todos = child.value.match(/(\[.{1}\])/);
                    if (todos) {
                        todos.forEach(todo => {
                            switch (todo) {                                
                                case '[x]':
                                case '[X]':
                                    child.value = child.value.replace(todo, '✅')
                                    break;
                                case '[*]':
                                    child.value = child.value.replace(todo, '🛠️')
                                default:
                                    child.value = child.value.replace(todo, '⬜')
                            }
                        })
                    }
                }
            })
        }
    }
}