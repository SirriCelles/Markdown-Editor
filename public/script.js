window.onload = function() {
    // using  Showdown js markdown to HTML bidirectional converter
    var converter = new showdown.Converter();
    var pad = document.getElementById('pad');
    var markdownArea = document.getElementById('markdown');

    // make tab focus on page
    pad.addEventListener('keydown', function(e) {
        if(e.code === 'Tab') {
            let start = this.selectionStart;
            let end = this.selectionEnd;

            let target = e.target;
            let value = target.value;

            // set textarea value to text before caret and tab and text after

            target.value = value.substring(0, start) + "\t" + value.substring(end);

            // put caret at the right position again
            this.selectionStart = this.selectionEnd = start + 1;

            // prevent default focus lose
            e.preventDefault();
        }
    });

    var previousMarkdownValue;

    var convertTextAreaToMarkdown = function() {
        var markdownText = pad.value;
        html = converter.makeHtml(markdownText);
        markdownArea.innerHTML = html;
    };

// listen and update text area every second after a change
    var didChangeOccur = function() {
        if(previousMarkdownValue != pad.value) {
            return true;
        }
        return false;
    };

    // do check after every second
    setInterval(() => {
        if(didChangeOccur()) {
            convertTextAreaToMarkdown();
        }
    },1000);

    pad.addEventListener('input', convertTextAreaToMarkdown);


    if(document.location.pathname.length > 1) {
        // attaching the changes textarea to the current page page
        sharejs.open(document.location.pathname, 'text', function(error, doc) {
            doc.attach_textarea(pad);
            convertTextAreaToMarkdown();
        });
    }

    convertTextAreaToMarkdown();

}