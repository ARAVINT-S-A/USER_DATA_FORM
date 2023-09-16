import { createSignal } from "solid-js";
import Home from "./components/Home";
function App() {
  const[searchform,setSearchForm]=createSignal(false);
  const[editform,setEditForm]=createSignal(false);
  return (
    <div class="bg-gray-800 w-screen h-screen">
    <Show when={!editform()}>
    <Show when={!searchform()}>
    <Home />
    </Show>

    </Show>
    </div>
  );
}

export default App;
