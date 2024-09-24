import Form from "../components/Form.jsx";

export default function OnCreateForm({setIsCreate, data, setFormRow}) {
    return (
      <div
        className={`w-full z-40 h-screen items-center justify-center p-10 backdrop-blur-lg shadow rounded-md bg-inherit flex flex-col  fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
      >
        <Form setIsCreate={setIsCreate} data={data} setFormRow={setFormRow} />
      </div>
    );
}