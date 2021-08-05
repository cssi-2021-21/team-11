const r = new snoowrap(snoo);

const getReplies = async (comment) => {
  let result = [];
  const replies = await comment.replies.fetchAll()
    for (const reply of replies) {
    result.push(reply.body.split(" "));
    const subReplies = await getReplies(reply);
    result.push(subReplies);
  }
  return result.flat()
}

const fetch = async (sub) => {
  newPosts = await r.getNew(sub);
  let words = [];
  for (const post of newPosts) {
    words.push(post.title.split(" "));
   try {
     words.push(post.selftext.split(" "))
   } catch (error) {
        console.log(error);
    }
    try {
    const comments = await post.comments.fetchAll()
      for(const comment of comments) {
        words.push(comment.body.split(" "))
        words.push(await getReplies(comment))
    }
    } catch (error) {
        console.log(error);
    }
  }
  return words.flat();
}


const count = (list) => {
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
    console.log("sorting")
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


const createChart = (canvas, sorted_words, wordsTotal, sub) => {
    const ctx = canvas.getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sorted_words.map(ar => ar[0]).slice(0,10),
            datasets: [{
                label: '% frequency of words in r/' + sub,
                data: sorted_words.map(ar => 100*ar[1]/wordsTotal).slice(0,10),
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

const renderWordCloud = (list) => {
    WordCloud(document.getElementById('myWordCloud'), { list: list} );
}

const createWordCloud = (slist, wordsTotal) => {
    console.log("Running create word cloud");
    const scaled_list = slist.map(ar => [ar[0],Math.round(5000*ar[1]/wordsTotal)]);
    renderWordCloud(scaled_list)

}

const search = async (sub) => {
    all_words = (await fetch(sub))
    console.log(all_words.length)
    let wordsArray = all_words
    console.log("words array: ", wordsArray)

    const counted_words = count(wordsArray)
    console.log("counted words: ", counted_words)

    const sorted_words = sortWordsByFrequency(counted_words)
    console.log("sorted_words: ", sorted_words)

    // Makes bar chart
    const chart = document.querySelector("#myBarChart")    
    createChart(chart, sorted_words,wordsArray.length,sub)

    // Makes word cloud
    const test = sorted_words.map(ar => [ar[0],ar[1]+1]);
    createWordCloud(test,all_words.length )
    
}


document.querySelector("#searchButton").addEventListener("click", function() {

    const ar = search(document.querySelector("#subInput").value)
    
});