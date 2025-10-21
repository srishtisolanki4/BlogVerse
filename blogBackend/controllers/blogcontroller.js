const Blog= require('../model/blogs')

const home = async(req,res)=>{
    const blogs= await Blog.find().populate('author' , 'name');
    res.send(blogs);
}

const readBlog= async(req,res)=>{
    try{
            const response= await Blog.findOne({_id :req.params.id}).populate("author", "name");;
            res.send(response);
        }catch(err){
            console.log(err);
        }
};

const createBlog = async(req,res)=>{
    try{
            // Get blog data from request body
            const { title, content } = req.body;
            // Get the user from the verifyUser middleware
            const userId = req.user._id;

            // Create a new blog instance with the user's ID
            const newBlog = new Blog({
                title,
                content,
                author: req.user._id, // <-- Link the blog post to the user here
            });
            
            // Save the blog post
            await newBlog.save();
            
            console.log("Blog created successfully!");
            res.status(201).json(newBlog);
        }catch(err){
            console.error(err);
            res.status(500).json({ message: "Server error" });
        }
};

const editBlog= async(req,res)=>{
    const id = req.params.id;
        try{
            let updatedBlog = await Blog.findOneAndUpdate({_id:id} ,
            { $set : {title: req.body.title ,content: req.body.content , date:new Date()}} , {new:true}
        );
        res.send(updatedBlog);
    
        }catch(err){
            console.log(err);
        }
}

const deleteBlog = async(req,res)=>{
    const id= req.params.id;
        try{
            let deletedBlog = await Blog.findOneAndDelete({_id:id});
            res.send(deletedBlog);
        }catch(err){
            console.log(err);
        }
}

module.exports ={home,readBlog,createBlog,editBlog,deleteBlog};