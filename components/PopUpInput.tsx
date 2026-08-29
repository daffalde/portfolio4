interface popUpFunc {
  close: any;
}

export default function PopUpInput({ close }: popUpFunc) {
  return (
    <>
      <div className="popUpInput-bg">
        <div className="popUpInput-body">
          <div className="popUpInput-header">
            <h5>Add Project</h5>
            <button>
              <img
                onClick={close}
                width={"100%"}
                src="/close.png"
                alt="close icon"
              />
            </button>
          </div>
          {/* ______________________________________________ */}
          <div className="popUpInput-add">
            <input type="file" />
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Link" />
            <textarea placeholder="desc"></textarea>
          </div>
          {/* ______________________________________________ */}
          <div className="popUpInput-action">
            <button onClick={close} className="btn-second">
              Cancel
            </button>
            <button className="btn-main">Add</button>
          </div>
        </div>
      </div>
    </>
  );
}
