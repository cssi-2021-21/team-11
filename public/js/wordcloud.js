

list1 = [['canvas1', 90],['foo', 60], ['bar', 30]]
list2 = [['canvas2',90],['foo', 30], ['bar', 60]]

createWordCloud = (list) => {
    console.log("Running create word cloud")
    WordCloud(document.getElementById('myCanvas'), { list: list } );
}
createWordCloud(list1)
