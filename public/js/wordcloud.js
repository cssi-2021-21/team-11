

list = [['foo', 60], ['bar', 30]]

createWordCloud = (list) => {
    WordCloud(document.getElementById('my_canvas'), { list: list } );
}
createWrodCloud(list)
