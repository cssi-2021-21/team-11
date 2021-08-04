testList = ["word1","word2","word3","word4","word1","word1","word4" ]

count = (list) => {
    words = {}
    list.forEach(word => {
        if (word in words) {
            words[word] += 1
        }else {
            words[word] = 1
        }
    })
    return words
}

const sortWordsByFrequency = (words) => {
    // items is words in 2d array form
    let items = Object.keys(words).map(function(key) {
        return [key, words[key]];
    });
    // Sort the array based on the second element - count
    items.sort(function(first, second) {
        return second[1] - first[1];
    });
    return items
}

const wordCounts = sortWordsByFrequency(count(testList))

results = document.querySelector("#results")
for (let i in wordCounts) {
    const word = wordCounts[i][0]
    const count = wordCounts[i][1]
    console.log(word,": ",count)
    const node = document.createElement("LI");    
    const textnode = document.createTextNode(`${word}: ${count} (${100*count/testList.length}%)`);         // Create a text node
    node.appendChild(textnode);         
    results.appendChild(node);
}

