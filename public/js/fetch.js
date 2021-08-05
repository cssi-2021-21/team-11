const r = new snoowrap(snoo);

const getReplies = async (comment) => {
  console.log("start getReplies")
  let result = [];
  const replies = await comment.replies.fetchAll()
    for (const reply of replies) {
    result.push(reply.body.split(" "));
    const subReplies = await getReplies(reply);
    result.push(subReplies);
  }
  console.log("getReplies run")
  console.log(result.flat())
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
        console.log(comment.body.split(" "))
        words.push(await getReplies(comment))
        console.log(await getReplies(comment))
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
    let wordsArray = (await fetch(sub))
    console.log(wordsArray)
    console.log(count(wordsArray))
}


document.querySelector("#searchButton").addEventListener("click", function() {
  search(document.querySelector("#subInput").value)
});


/*
const getReplies = (comment) => {
  let result = [];
  return comment.replies.fetchAll().forEach(reply => {
    result.push(reply.body.split(" "));
    result.push(getReplies(reply));
  }).then(() => {
    return result.flat();
  });
}

*/