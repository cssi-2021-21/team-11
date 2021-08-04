testList = ["word1","word2","word3","word4","word1","word1"]

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

console.log(count(testList))