window.onload = function() {
    // using  Showdown js markdown to HTML bidirectional converter
    var converter = new showdown.Converter();
    var pad = document.getElementById('pad');
    var markdownArea = document.getElementById('markdown');

    var previousMarkdownValue;pre

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

// attaching the changes textarea to the current page page
    sharejs.open(document.location.pathname, 'text', function(error, doc) {
        doc.attach_textarea(pad);
        convertTextAreaToMarkdown();
    });

}