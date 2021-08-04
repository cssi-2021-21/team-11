const r = new snoowrap(snoo);



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
    });
    } catch (error) {
        console.log(error);
    }
  }).then(() => {
      return words.flat();
  })
}


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

search = (sub) => {
    console.log(count(fetch(sub)))
}


document.querySelector("#searchButton").addEventListener("click", function() {
  search(document.querySelector("#subInput").value)
});


