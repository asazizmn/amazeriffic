var main = function (todoObjects) {
    'use strict';


    /* 
     *  Model: Created dynamically form the json retrieved from todos.json 
     *  please note that, although technically this could be moved to within the scope where
     *  the click handler is being attached... this being a model, deserves to be here instead 
     */
    var todos = todoObjects.map(function (todoObject) {
        return todoObject.description;
    });


    /*
     * Takes 'todos' objects (organised by tasks),
     * and returns a modified structure which is organised by tags
     */
    var organizeByTag = function () {

        // create array of unique tags to be uses as intermediary
        var tags = [];

        // create array of unique tags to be uses as intermediary
        todoObjects.forEach(function (todoObject) {
            todoObject.tags.forEach(function (tag) {
                if (tags.indexOf(tag) === -1) {
                    tags.push(tag);
                }
            });
        });

        // for every tag, search and create array of associated todos
        var tagObjects = tags.map(function (tag) {
            var tagTodos = [];
            todoObjects.forEach(function (todoObject) {
                if (todoObject.tags.indexOf(tag) !== -1) {
                    tagTodos.push(todoObject.description);
                }
            });

            return { name: tag, todos: tagTodos };
        });

        return tagObjects;
    };


    // 
    //  attach click handlers to all the tabs that exist, so that every click ...
    //  ... 1. activates the appropriate tab
    //  ... 2. replaces with the appropriate content
    //

    $('.tabs a span').toArray().forEach(function (element) {

        // declare all variables at the top of the parent function, as per best practice
        var $element = $(element);


        // attach click handler to the current tab/span in iteration
        $element.on('click', function () {

            var $content,
                $inputLabelDesc,
                $inputDesc,
                $wrapperDesc,
                $inputLabelTags,
                $inputTags,
                $wrapperTags,
                $button,
                $wrapperBtn,
                add_note,
                organizedByTag;

            //
            // activate appropriate tab
            //

            // activate appropriate tab
            $('.tabs a span').removeClass('active');
            $element.addClass('active');

            // empty the main content to enable re-generation
            $('main .content').empty();


            //
            // begin content re-generation
            //

            // 1st tab
            if ($element.parent().is(':nth-child(1)')) {

                // create 'ul' jquery object, w/ $('<ul>') as appossed to $('ul') 
                // otherwise all the 'ul' dom elements will be returned
                $content = $('<ul>');

                // push 'todo' array items into 'ul' in reverse order
                todos.forEach(function (todoItem) {
                    var $li = $('<li>').text(todoItem);
                    $content.prepend($li);
                });

                // 2nd tab
            } else if ($element.parent().is(':nth-child(2)')) {

                $content = $('<ul>');

                // push 'todo' array items into 'ul' in "as-is" order
                todos.forEach(function (todoItem) {
                    var $li = $('<li>').text(todoItem);
                    $content.append($li);
                });

                // 3rd tab
            } else if ($element.parent().is(':nth-child(3)')) {

                organizedByTag = organizeByTag();
                organizedByTag.forEach(function (tag) {
                    var $tagName = $('<h3>').text(tag.name);
                    var $content = $('<ul>');

                    tag.todos.forEach(function (description) {
                        var $li = $('<li>').text(description);
                        $content.append($li);
                    });

                    $('main .content').append($tagName);
                    $('main .content').append($content);
                });

                // 4th tab
            } else if ($element.parent().is(':nth-child(4)')) {

                // add DOM elements ...

                // description
                $inputLabelDesc = $('<h3>').text('Description');
                $inputDesc = $('<input>');
                $wrapperDesc = $('<div>').append($inputLabelDesc).append($inputDesc);

                // tags
                $inputLabelTags = $('<h3>').text('Tags');
                $inputTags = $('<input>');
                $wrapperTags = $('<div>').append($inputLabelTags).append($inputTags);

                // button
                $button = $('<button>').text('Add Note');
                $wrapperBtn = $('<div class="wrapperBtn">').append($button);

                // form
                $content = $('<div class="form">').append($wrapperDesc).append($wrapperTags).append($wrapperBtn);


                /*
                 *   Function: extracts value from description input and adds to todos model,
                 *   and then empties the input for further input readiness
                 */
                add_note = function () {
                    var desc = $inputDesc.val(),
                        tags = $inputTags.val().split(','),
                        
                        // create new to do
                        todo = {description: desc, tags: tags};

                    if (desc !== '') {
                        todoObjects.push(todo);

                        // send post request to the server
                        // 1st arg - request url
                        // 2nd arg - data object
                        // 3rd arg - response callback
                        $.post("todo", todo, function (res) {

                            // this callback is called when the server responds
                            console.log('posted todo object [' + todo +  '] to the server and it responded with the following:');
                            console.log(res);
                        });

                        todos = todoObjects.map(function (todoObject) {
                            return todoObject.description;
                        });

                        $inputDesc.val('');
                        $inputTags.val('');
                    }
                };


                // please note that 'direct' event handlers using selectors won't work 
                // because the respective elements don't exist in dom yet
                // $('main .content button').on('click', function (event) {
                // so instead you could make use of 'delegated' event handlers or
                // attach the handler to the jquery object instead     
                $button.on('click', function (event) {
                    add_note();
                });

                //
                //  attach keypress and click handlers
                //
                /*$inputDesc.on('keypress', function (event) {
                    // check for 'enter' keypress
                    if (event.keyCode === 13) {
                        add_note();
                    }
                });*/
            }


            // append content to main
            $('main .content').append($content);


            // prevent follow-through of the link
            // which is causing a reload of the entire page
            return false;
        });
    });

    // simulate click
    $('.tabs a:first-child span').trigger('click');
};

// please note how this has been modified from calling main directly
// to retrieving todos.json beforehand separately and 
// then passing the retrieved json result to main
// however, practically speaking, the same result would be achieved by
// moving the getJSON method call to within main
$(document).ready(function () {

    // this is no longer accessing todos.json
    // but rather it will invoke the node express route for '/todos.json'
    $.getJSON("todos.json", function (todoObjects) {
        main(todoObjects);
    });
});
