export default function EditForm(props) {
    async function modifydb(event){
      console.log("2")
      const data=new FormData(event.target);
      const value=Object.fromEntries(data.entries());
      const val=JSON.stringify(value);
      fetch('/modifydb',{headers:{'Content-Type': 'application/json'},method:"POST",body:val})
      .then(console.log("success"))
      .catch(function(response){alert(response);})
    }
    return (
      <div class="bg-black w-screen h-screen">
        <div className="flex justify-center">
          <h1 className="flex justify-center rounded-full px-2 py-2 w-40 h-10 bg-yellow-400 border-spacing-10">
            Post your Query
          </h1>
        </div>
        <main className="flex justify-center">
          <div className="flex justify-center px-2 py-4 bg-black w-96 h-96 rounded-md">
            <div>
              <div className="bg-white rounded-md w-full p-2">
                <form onSubmit={modifydb} id="form1">
                  <label htmlFor="name">Name:</label>
                  <input
                    className="border-black border-spacing-2 shadow-lg shadow-black"
                    type="text"
                    name="name"
                    placeholder="enter name"
                    size="30"
                    value={props.data.name}
                  /><br />
                  <input className="hidden" type="text" name="id" value={props.data.id} />
                  <label htmlFor="email">Email:</label>
                  <input
                    className="mx-2 my-2 border-black border-spacing-2 shadow-lg shadow-black"
                    type="text"
                    name="Email"
                    placeholder="abcxyz@gmail.com"
                    size="30"
                    value={props.data.Email}
                    required
                  /><br />
                  <label htmlFor="Gender">Gender:</label>
                  <input type="radio" name="Gender" value="Male" />
                  <label htmlFor="Male">Male</label>
                  <input type="radio" name="Gender" value="Female" />
                  <label htmlFor="Female">Female</label>
                  <input type="radio" name="Gender" value="Other" />
                  <label htmlFor="Other">Other</label><br />
                  <label htmlFor="query">Query</label>
                  <textarea
                    className="mx-2 my-2 border-black border-spacing-2 shadow-lg shadow-black"
                    type="text"
                    name="contents"
                    value={props.data.contents}
                    placeholder="enter query under 50 words"
                    rows="5"
                    cols="40"
                  /><br />
                  <input type="checkbox" name="tnc" required />
                  <div className="flex justify-evenly">
                    <button
                      type="submit"
                      className="bg-yellow-400 px-2 py-2 mx-2 my-2 rounded-full"
                      form="form1"
                    >
                      Submit
                    </button>
                    <button
                      type="reset"
                      className="bg-yellow-400 px-2 py-2 mx-2 my-2 rounded-full"
                      form="form1"
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
  