const r = new snoowrap(snoo);



const fetch = (word, sub) => {
  let total = 0;
  let count = 0;
  newPosts = r.getNew(sub);
  newPosts.forEach(post => {
    postTitle = post.title.split(" ");
    postTitle.forEach(currWord => {
      total += 1;
      if (currWord.toLowerCase() == word.toLowerCase()) {
        count += 1;
      }
    });
  }).then(() => {
    let ratio = (count / total) * 100;
    document.querySelector("#result").innerHTML = `${ratio}%`;
  })
}

document.querySelector("#searchButton").addEventListener("click", function() {
  fetch(document.querySelector("#wordInput").value, document.querySelector("#subInput").value)
});


//fetch("How", "redditdev");
