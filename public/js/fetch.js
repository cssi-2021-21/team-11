const r = new snoowrap(snoo);

const getReplies = (comment) => {
  result = [];
  return comment.replies.fetchAll().forEach(reply => {
    result.push(reply.body.split(" "));
    result.push(getReplies(reply));
  }).then(() => {
    return result.flat();
  });
}

const fetch = (sub) => {
  newPosts = r.getNew(sub);
  let words = [];
  return newPosts.forEach(post => {
    words.push(post.title.split(" "));
   try {
     words.push(post.selftext.split(" "))
   } catch (error) {
        console.log(error);
    }
    try {
    post.comments.fetchAll().forEach(comment => {
        words.push(comment.body.split(" "))
        //words.push(getReplies(comment))
    });
    } catch (error) {
        console.log(error);
    }
  }).then(() => {
      return words.flat();
  })
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

const search = (sub) => {
    console.log(count(fetch(sub)))
}


document.querySelector("#searchButton").addEventListener("click", function() {
  search(document.querySelector("#subInput").value)
});


