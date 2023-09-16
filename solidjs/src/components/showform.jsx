export default function ShowForm(props) {
    return (
      <div>
        <div className="flex justify-center items-center h-screen">
          <div className="grid grid-cols-2 text-white bg-black wx-auto h-auto p-2 m-2">
            <div className="flex justify-center content-center">Name</div>
            <div className="flex justify-center content-center">Email</div>
            {props.querydata.map((m) => (
              <div key={m.id}>
                <div className="flex justify-center content-center">{m.name}</div>
                <div className="flex justify-center content-center">{m.Email}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

