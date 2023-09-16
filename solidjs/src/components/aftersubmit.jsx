export default function Submit(){
    return(
<div >
    <div class="flex justify-evenly">
        <div class="flex justify-center align-middle items-center h-screen">
        <span class="text-white items-center">Thank you {document.getElementById('name').value}</span>
        </div>
    <form  id="form10" class="flex justify-center h-screen items-center">
        <button type="submit" form="form10" class="bg-yellow-400 flex justify-center items-center rounded-md">go back</button>
    </form>
    </div>
</div>
    );
}