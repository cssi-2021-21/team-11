const r = new snoowrap(snoo);



const fetch = (sub) => {
  newPosts = r.getNew(sub);
  let words = [];
  newPosts.forEach(post => {
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
  })
  return words;
}

document.querySelector("#searchButton").addEventListener("click", function() {
  fetch(document.querySelector("#wordInput").value, document.querySelector("#subInput").value)
});


//fetch("How", "redditdev");
