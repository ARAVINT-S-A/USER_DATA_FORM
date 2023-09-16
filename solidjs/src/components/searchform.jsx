import {Show,createSignal } from "solid-js";
import ShowForm from "./showform";

export default function Search(props){
    const[showsf,setShowSf]=createSignal(false);
    const showff=(event)=>{
        showFormm(event);
    }
    async function showFormm(event){
        const val=JSON.stringify({name:document.getElementById("in").value});
        const response=await fetch("/showform",{headers:{'Content-Type': 'application/json'}, method:'POST',body:val});
        if(response.ok){
            const jsondata=await response.json();
            setShowSf(jsondata)
        }
        else{
            alert("error");
        }
    }
    return(
        <>
        <Show when={!showsf()}>
        <div>
        <div class="flex justify-center items-center h-screen w-screen">
        <form id="form4">
        <input class="rounded-md m-2" id="in" name="name" type="text" placeholder="enter you name to fetch form"></input>
        <button type="button" onClick={showff} form="form4" class="bg-yellow-400 w-12 h-8 rounded-md">submit</button>
        </form>
        </div>
        </div>
        </Show>
        <Show when={showsf()}>
        <ShowForm querydata={showsf()}/>
        </Show>
        </>
    );
}