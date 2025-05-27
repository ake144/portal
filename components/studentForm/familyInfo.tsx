import { useStudentFormStore } from "@/store/studentFormStore";

const ParentForm = () => {
   const {familyInfo, setFamilyInfo} =  useStudentFormStore()
    


    return(
        <div className="w-full max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Family Information</h2>
            <form>
                {familyInfo.map((parent, index) => (
                    <div key={index} className="mb-4">
                        <label className="block text-sm font-medium mb-1">Parent {index + 1} Name</label>
                        <input
                            type="text"
                            value={parent.full_name || ''}
                            onChange={(e) => {
                                const updatedFamily = [...familyInfo];
                                updatedFamily[index].full_name = e.target.value;
                                setFamilyInfo(updatedFamily);
                            }}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => setFamilyInfo([...familyInfo, { name: '' }])}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Add Parent
                </button>
            </form>
        </div>
    )
}

export default ParentForm; 
