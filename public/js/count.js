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

const createChart = (canvas, words, counts ) => {
    const ctx = canvas.getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: words,
            datasets: [{
                label: 'frequency',
                data: counts,
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

sortWordsByFrequency(count(testList))
const chart = document.querySelector("#myChart2")
const test_words = sortWordsByFrequency(count(testList)).map(ar => ar[0])
const test_data = sortWordsByFrequency(count(testList)).map(ar => 100*ar[1]/testList.length)

createChart(chart,test_words,test_data)
