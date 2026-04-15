import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../AuthContext.jsx";
import Sidebar from "../components/Sidebar.jsx";
import FilterBar from "../components/FilterBar.jsx";
import ProgramForm from "../components/ProgramForm.jsx";
import ProgramTable from "../components/ProgramTable.jsx";
import {
  fetchPrograms,
  createProgram,
  updateProgram,
  deleteProgram,
} from "../services/programService.js";

const defaultCategories = [
  "Health",
  "Education",
  "Food",
  "Shelter",
  "Environment",
  "Livelihood",
];
const defaultRegions = ["North", "South", "East", "West", "Central"];

export default function ProgramsPage() {
  const { user, logout } = useContext(AuthContext);
  const [programs, setPrograms] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    region: "",
    search: "",
  });
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [status, setStatus] = useState("Loading programs...");

  const loadPrograms = async () => {
    try {
      const loaded = await fetchPrograms({
        category: filters.category,
        region: filters.region,
      });
      setPrograms(loaded);
      setStatus("");
    } catch (error) {
      setStatus("Unable to load programs. Check backend connection.");
    }
  };

  useEffect(() => {
    loadPrograms();
  }, [filters.category, filters.region]);

  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      const searchValue = filters.search.toLowerCase();
      return (
        !searchValue ||
        program.name.toLowerCase().includes(searchValue) ||
        program.category.toLowerCase().includes(searchValue) ||
        program.region.toLowerCase().includes(searchValue)
      );
    });
  }, [filters.search, programs]);

  const handleSubmit = async (data) => {
    try {
      if (selectedProgram) {
        await updateProgram(selectedProgram._id, data);
        setSelectedProgram(null);
      } else {
        await createProgram(data);
      }
      await loadPrograms();
      setStatus("Saved successfully.");
    } catch (error) {
      setStatus(error.response?.data?.error || "Unable to save program.");
    }
  };

  const handleEdit = (program) => {
    setSelectedProgram(program);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (programId) => {
    if (!window.confirm("Delete this program?")) {
      return;
    }
    try {
      await deleteProgram(programId);
      await loadPrograms();
      setStatus("Program deleted.");
    } catch (error) {
      setStatus(error.response?.data?.error || "Unable to delete program.");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 gap-6 px-4 py-6 md:grid-cols-[280px_1fr]">
        <Sidebar user={user} onLogout={logout} />
        <main className="space-y-6">
          <section className="rounded-3xl border border-slate-800/90 bg-slate-900/90 p-6 shadow-glow">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">
                  Programs
                </p>
                <h1 className="mt-3 text-3xl font-semibold text-white">
                  Manage NGO interventions
                </h1>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProgram(null)}
                className="rounded-3xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                Add new program
              </button>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-800/90 bg-slate-900/90 p-6 shadow-glow">
            <h2 className="text-xl font-semibold text-white">
              {selectedProgram ? "Edit Program" : "New Program"}
            </h2>
            <p className="mt-2 text-slate-400">
              Enter the program details and impact metrics to compute
              recommendations.
            </p>
            <div className="mt-6">
              <ProgramForm
                initialData={selectedProgram || {}}
                onSubmit={handleSubmit}
                submitLabel={
                  selectedProgram ? "Save Changes" : "Create Program"
                }
              />
            </div>
          </section>

          <section className="space-y-4">
            <FilterBar
              filters={filters}
              setFilters={setFilters}
              categories={defaultCategories}
              regions={defaultRegions}
            />
            {status && (
              <div className="rounded-3xl border border-slate-800/90 bg-slate-900/90 p-4 text-sm text-slate-200">
                {status}
              </div>
            )}
            <ProgramTable
              programs={filteredPrograms}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </section>
        </main>
      </div>
    </div>
  );
}
