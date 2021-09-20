import { Component } from "react";
import axios from "axios";

class Crudops extends Component{
    constructor(props){
        super(props);
        this.state = {
            posts : [],
            id : "",
            userId : "",
            title : "",
            body : "" 
        };
        
    }

    createPost = async()=>{
        try{
           const {data : post} = await axios.post("https://jsonplaceholder.typicode.com/posts",{
                userId : this.state.userId,
                title : this.state.title,
                body : this.state.body
            });
            //console.log(res);
            const nposts = [...this.state.posts];
            nposts.push(post);
            this.setState({posts : nposts, userId : "", title : "", body : ""})
            
        }catch(err){
            console.log("Error while creating post");
        }
        

    }
  
    getPosts = async()=>{
        try{
            const {data} = await axios.get(
                "https://jsonplaceholder.typicode.com/posts");
            this.setState({posts : data});
            console.log(data);
    }catch(err){
        console.log("Error while fetching data from server",err);
        }
    }

    updatePost = async() =>{
        try{
            const {data : post} = await axios.put(
                `https://jsonplaceholder.typicode.com/posts/${this.state.id}`,{
                 userId : this.state.userId,
                 title : this.state.title,
                 body : this.state.body
             });
             console.log(post);
             const nposts = [...this.state.posts];
             const index = nposts.findIndex((post)=> post.id === this.state.id);
             console.log(index);
             nposts[index] = post
             this.setState({posts : nposts, id : "", userId : "", title : "", body : ""});
             
         }catch(err){
             console.log("Error while updating post");
         }
         
    }

    deletePost = async(postId) =>{
        console.log(postId);
        try{
            await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
            let nposts = [...this.state.posts];
            nposts = nposts.filter((post)=>post.id !== postId);
            this.setState({posts : nposts})

        }catch(err){
            console.log("Error while deleting post");
        }
        
    }


    componentDidMount(){
        this.getPosts();
    }

    selectPostToUpdate = (post) =>{
        console.log(post);
        this.setState({
            id : post.id,
            userId : post.userId,
            title : post.title,
            body : post.body
        })

    }
    handleChange = ({target :{name, value}}) =>{
        this.setState({[name] : value})
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        if(this.state.id)
            this.updatePost();
        else 
            this.createPost();
    }
    render(){
       return(
        <div className = "container">
            <h2 className = "text-center">POST APP</h2>
            <div className = "m-2 p-2">
                <form onSubmit = {this.handleSubmit}>
                    <label className = "p-2" htmlFor = "userId">UserId </label>
                    <input type = "number" 
                    name = "userId"
                    value = {this.state.userId}
                    onChange = {this.handleChange}
                    />
                    
                    <label className = "p-2" htmlFor = "title">Title </label>
                    <input type = "text"
                     name = "title"
                     value = {this.state.title}
                     onChange = {this.handleChange}
                    />
                    
                    <label className = "p-2" htmlFor = "body">Body </label>
                    <input type = "text"
                     name = "body"
                     value = {this.state.body}
                     onChange = {this.handleChange}
                     />
                    
                    <button className = "btn-success m-2" type = "submit">submit</button>
                </form>
            </div>
            <div className = "m-3">
                <table className = "table table-striped table-bordered">
                    <thead className = "thead-dark">
                        <tr>
                            <th>UserID</th>
                            <th>PostID</th>
                            <th>Title</th>
                            <th>Body</th>
                            <th>Actions</th>
                        </tr>  
                    </thead>
                    <tbody>
                    {this.state.posts.map((post)=>{
                        return(
                         
                            <tr key = {post.id}>
                                <td>{post.id}</td>
                                <td>{post.userId}</td>
                                <td>{post.title}</td>
                                <td>{post.body}</td>
                                <td>
                                    <button className = "btn btn-danger m-1"onClick = {()=>this.deletePost(post.id)}>Delete</button>
                                    <button className = "btn btn-primary m-1" onClick = {()=>this.selectPostToUpdate(post)}>Update</button>
                                </td>
                            </tr>    

                        );
                       })}
                    </tbody>
                </table>
            </div>
        </div>
        )
    }
    
}

export default Crudops;