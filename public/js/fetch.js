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
    console.log("Final Ratio: ")
    console.log(count / total);
  })
}

fetch("How", "redditdev");
