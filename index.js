import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const postArray = ["I woke up this morning with a dream I could barely remember, but the feeling of it stuck with me. It got me thinking—why do we dream? Are they windows into our subconscious, messages from the past, or just random synapses firing?",
   "Yesterday, I watched a little bird hop along the beach, pecking at crumbs. It wasn’t anything extraordinary, but in that small moment, time seemed to pause.",
  "It’s funny how the ocean seems so simple—blue, vast, endless—but it’s full of hidden colors. I went to the beach yesterday, and as I stared out into the waves, I saw how the water shifted from pale turquoise near the shore to deeper emeralds further out, and then to a mysterious midnight blue in the distance.",
  "In a world that constantly encourages productivity, I’ve learned that there’s something magical about doing absolutely nothing.",
  "Has anyone seen Tim?"
  ];

app.use(bodyParser.urlencoded({ extended: true }));

/* Write your code here:
Step 1: Render the home page "/" index.ejs
Step 2: Make sure that static files are linked to and the CSS shows up.
Step 3: Add the routes to handle the render of the about and contact pages.
  Hint: Check the nav bar in the header.ejs to see the button hrefs
Step 4: Add the partials to the about and contact pages to show the header and footer on those pages. */

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use(express.static("public"));
app.use('/images', express.static('images'));

app.get("/", (req, res) => {
  res.render("index.ejs", {posts: postArray});
});

app.post("/post", (req, res) => {
  //console.log(req.body["postComposer"]);
  if(req.body["postComposer"] != "Create a post here"){
    postArray.push(req.body["postComposer"]);
  }
  res.render("index.ejs", {posts: postArray});
});

app.post("/editSubmit", (req, res) => {
  console.log(req.body.postNumber);
  if(req.body.postNumber != null){
    postArray[req.body.postNumber] = req.body.editedPost;
    
  }
  res.render("index.ejs", {posts: postArray});
});

app.post("/delete", (req, res) => {
  console.log(req.body.postNumber);
  
  if(req.body.postNumber){
    console.log(req.body.postNumber);
    
    console.log("index: "+ req.body.postNumber);
    console.log(req.body.postNumber);
    postArray.splice(req.body.postNumber, 1);
    console.log(postArray.length);
  }
  res.render("index.ejs", {posts: postArray});
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});
