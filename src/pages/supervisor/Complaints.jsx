import { useState } from "react";
import { Plus, X, Camera, AlertTriangle } from "lucide-react";
import { toast } from "react-toastify";

const Complaints = () => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);

  const handleSubmit = () => {
    toast.success("Machinery defect reported successfully");
    setOpen(false);
  };

  return (
    <div className="space-y-6 relative">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-3xl p-6 text-white shadow">
        <h1 className="text-2xl font-bold">Machinery Defect Tracker</h1>
        <p className="text-sm opacity-90">
          Monitor, track and resolve equipment issues
        </p>
      </div>

      {/* EMPTY STATE */}
      <div className="bg-white rounded-2xl shadow p-14 text-center">
        <AlertTriangle size={60} className="mx-auto text-gray-300" />
        <h3 className="text-xl font-semibold mt-4">
          No Machinery Defects Found
        </h3>
        <p className="text-gray-500 mt-2">
          Click <b>Add Defect</b> to report a new issue
        </p>
      </div>

      {/* ADD BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2"
      >
        <Plus /> Add Defect
      </button>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden">

            {/* MODAL HEADER */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-500 px-6 py-4 text-white flex justify-between">
              <h3 className="font-semibold text-lg">
                Report Machinery Defect
              </h3>
              <button onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">

              <Input label="Supervisor Name" />
              <Input label="Contact Number" />
              
              <select className="w-full border rounded-xl px-4 py-3">
                <option>Select Machine</option>
                <option>Truck</option>
                <option>Compactor</option>
                <option>Loader</option>
              </select>

              {/* IMAGE */}
              <div className="border-2 border-dashed rounded-xl p-6 text-center">
                {image ? (
                  <img
                    src={image}
                    alt="preview"
                    className="rounded-xl mx-auto max-h-48"
                  />
                ) : (
                  <>
                    <Camera className="mx-auto text-green-600" />
                    <p className="text-sm mt-2 text-gray-500">
                      Capture machinery image
                    </p>
                  </>
                )}

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="upload"
                  onChange={(e) =>
                    setImage(URL.createObjectURL(e.target.files[0]))
                  }
                />
                <label
                  htmlFor="upload"
                  className="inline-block mt-3 bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer"
                >
                  Capture Image
                </label>
              </div>

              <textarea
                placeholder="Description"
                rows={4}
                className="w-full border rounded-xl px-4 py-3"
              />

              {/* AUTO INFO */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm">
                ✔ Date & Time auto recorded <br />
                ✔ Image geo-tagged (production)
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-4 p-4 border-t">
              <button
                onClick={() => setOpen(false)}
                className="px-5 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-5 py-2 bg-green-600 text-white rounded-lg"
              >
                Submit Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Input = ({ label }) => (
  <input
    placeholder={label}
    className="w-full border rounded-xl px-4 py-3"
  />
);

export default Complaints;
