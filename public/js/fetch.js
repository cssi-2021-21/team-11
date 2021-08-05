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

const search = async (sub) => {
    all_words = (await fetch(sub))
    console.log(all_words.length)
    let wordsArray = all_words
    console.log("words array: ", wordsArray)

    const counted_words = count(wordsArray)
    console.log("counted words: ", counted_words)

    const sorted_words = sortWordsByFrequency(counted_words)
    console.log("sorted_words: ", sorted_words)

    const chart = document.querySelector("#myBarChart")
    createChart(chart, sorted_words,wordsArray.length)
}


document.querySelector("#searchButton").addEventListener("click", function() {

    const ar = search(document.querySelector("#subInput").value)
    
    createChart(chart,ar,ar.length)
});