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

var ctx = document.getElementById('myChart2').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
