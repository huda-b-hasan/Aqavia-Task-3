export default function Form({ closeForm, handleSubmit, handleChange, commentAddEdit }) {
    return <>
        <form onSubmit={(e) => { e.preventDefault() }} >
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={commentAddEdit.name || ""} onChange={() => { handleChange(event) }} />
            <br />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={commentAddEdit.email || ""} onChange={() => { handleChange(event) }} />
            <br />
            <label htmlFor="body">body:</label>
            <input type="text" id="body" name="body" value={commentAddEdit.body || ""} onChange={() => { handleChange(event) }} />
            <br />
            <button id="ok" onClick={() => { handleSubmit() }}>ok</button>
            <button id="cancel" onClick={() => { closeForm() }} >cancel</button>
        </form>
    </>
}