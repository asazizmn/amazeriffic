var main = function (todoObjects) {
    "use strict";


    /*
     * Takes 'todos' objects (organised by tasks),
     * and returns a modified structure which is organised by tags
     */
    var organizeByTag = function () {

        /*
         * Returns true if the tag 'name' already exists within 'organizedByTag',
         * otherwise returns false
         
        var contains = function (organizedByTag, tagname) {
            var isContained = organizedByTag.some(function (tagObject) {
                return tagObject.name === tagname;
            });
            return isContained;
        };

        // create another array of objects organised by the tag name
        var organizedByTag = [];
        todoObjects.forEach(function (todoObject) {
            todoObject.tags.forEach(function (tag) {
                if (!contains(organizedByTag, tag)) {
                    organizedByTag.push({name: tag, todos: []});
                }
            });
        });

        // attach the relevant todo to each tag name within organizedByTag
        todoObjects.forEach(function (todoObject) {
            todoObject.tags.forEach(function (tag) {
                organizedByTag.forEach(function (tagObject) {
                    if (tag === tagObject.name) {
                        tagObject.todos.push(todoObject.description);
                    }
                });
            });
        });*/

        // create an empty tags array
        var tags = [];

        // create array of unique tags to be uses as intermediary
        todoObjects.forEach(function (toDo) {
            toDo.tags.forEach(function (tag) {
                if (tags.indexOf(tag) === -1) {
                    tags.push(tag);
                }
            });
        });

        // create array of objects using intermediary and all matching todos  
        var tagObjects = tags.map(function (tag) {
            var toDosWithTag = [];
            todoObjects.forEach(function (toDo) {
                if (toDo.tags.indexOf(tag) !== -1) {
                    toDosWithTag.push(toDo.description);
                }
            });

            return {"name": tag, "toDos": toDosWithTag};
        });
        
        console.log(tagObjects);
    };

    organizeByTag();
};

$(document).ready(function () {
    $.getJSON("todos.json", function (todoObjects) {
        main(todoObjects);
    });
});