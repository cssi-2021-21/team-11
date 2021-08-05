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

// Takes dictionary of words where the values represent the number of words and outputs sorted 2d array
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

// Creates HTML list which is added to the results <ul> element
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

const createChart = (canvas, sorted_words, wordsTotal) => {
    const ctx = canvas.getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sorted_words.map(ar => ar[0]),
            datasets: [{
                label: 'frequency',
                data: sorted_words.map(ar => 100*ar[1]/wordsTotal),
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        // Include a percent sign in the ticks
                        callback: function(value, index, values) {
                            return  value + '%';
                        }
                    }
                }
            }
        }
    });
}

sorted_words = sortWordsByFrequency(count(testList))
const chart = document.querySelector("#myChart2")
createChart(chart,sorted_words,testList.length)
