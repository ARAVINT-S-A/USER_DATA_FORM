import {Show, createSignal } from "solid-js";
import Submit from "./aftersubmit";
import Search from "./searchform";
import EditForm from "./editform";
export default function Home(props) {
    const[aftersubmit,setAfterSubmit]=createSignal(false);
    const[showf,setShowf]=createSignal(false);
    const[editf,setEditF]=createSignal(false);
      
    const thanks=(event) =>{
        setAfterSubmit(true)
        sendFormData(event)
        Event.preventDefault();
    }
    const show=() =>{
        setShowf(true)
        Event.preventDefault();
    }
    async function getData(){
        const response=await fetch('/listedit',{method:"GET",});
        if(response.ok){
            const jsondata=await response.json();
            setEditF(jsondata);
        }
        else{
            alert("error");
        }
    }
    const edit=(event)=>{
        event.preventDefault();
        console.log("1");
        getData();

    }
    async function sendFormData(event)
    {        
        event.preventDefault();
        const data = new FormData(event.target);
        const values= Object.fromEntries(data.entries());
        const val=JSON.stringify(values);
        fetch('/storedb',{headers:{'Content-Type': 'application/json'}, method:'POST',body:val})
        .then(console.log("success"))
       .catch(function(response){alert(response);})
        
    } 
    return(
        <div>
        <Show when={!aftersubmit() && !showf() && !editf()}>
        <div >
    <div class="flex justify-center">
        <h1 class="flex justify-center rounded-full px-2 py-2 w-40 h-10 bg-yellow-400 border-spacing-10">
            Post your Query
        </h1>
    </div>
    <main class="flex justify-center">
        <div class="flex justify-center px-2 py-4 bg-black w-96 h-96 rounded-md">
            <div>
                <div class="bg-white rounded-md w-full p-2">
                <form onSubmit={thanks} id="form1" method="post" >
                <div>
                    <label  for="name">Name:</label>    
                    <input class="border-black border-spacing-2 shadow-lg shadow-black" type="text" name="name" placeholder="enter name" size="30" required id="name"></input>
                </div>
                <div>
                <label for="email">Email:</label>
                    <input class="mx-2 my-2 border-black border-spacing-2 shadow-lg shadow-black" id="email" type="text" name="Email" placeholder="abcxyz@gmail.com" size="30" required></input>
                </div>
                <div><label for="Gender">Gender:</label>
                    <input type="radio" name="Gender" value="Male"></input>
                
                <label for="Male">Male</label>
                    <input type="radio" name="Gender" value="Female"></input>
                <label for="Female">Female</label>
                    <input type="radio" name="Gender" value="Other"></input>
                    <label for="Other">Other</label>
                </div>
            
                    <label for="query">Query</label>
                    <textarea class="mx-2 my-2 border-black border-spacing-2 shadow-lg shadow-black" type="text" id="contents" query="contents" name="contents" placeholder="enter query under 50 words" rows="5" cols="40"></textarea>
                    <div>
                    
                    <input class="text-black" id="tnc" type="checkbox" name="tnc" required>agree to terms and conditions</input>
                    <label for="tnc">agree to terms and conditions</label>
                    </div>
                    <div class="flex justify-evenly">
                    <button type="submit"  id="btn" class="bg-yellow-400 px-2 py-2 mx-2 my-2 rounded-full" form="form1">Submit</button>
                    <button type="reset" class="bg-yellow-400 px-2 py-2 mx-2 my-2 rounded-full" form="form1">Reset</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </main>
    <footer class="flex justify-center">
        <div class="flex justify-evenly">
        <form  id="f2"  onSubmit={show} class="flex justify-center">
            <div class="flex justify-evenly">
                <button type="submit" form="f2" class="bg-yellow-400 px-2 py-2 mx-2 my-2 rounded-full">view submitted form</button>
            </div>
        </form>
        <form  id="f3"  onSubmit={edit} class="flex justify-center">
            <div class="flex justify-right">
                <button type="submit" form="f3" class="bg-yellow-400 px-2 py-2 mx-2 my-2 rounded-full">Edit/delete forms</button>
            </div>
        </form>
        </div>
    </footer>
</div>

</Show>
<Show when={aftersubmit()}>
<Submit />
</Show>
<Show when={showf() && !aftersubmit()}>
<Search />
</Show>
<Show when={editf() && !aftersubmit()}>
<EditForm data={editf()} /*name={document.getElementById("name").value} email={document.getElementById("email").value} contents={document.getElementById("contents").value}*/ />
</Show>
</div>
    );
}