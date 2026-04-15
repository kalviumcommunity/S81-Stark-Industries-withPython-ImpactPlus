export default function ProgramTable({ programs, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-800/90 bg-slate-900/90 shadow-glow">
      <table className="min-w-full divide-y divide-slate-800 text-left text-sm text-slate-200">
        <thead className="bg-slate-950/90">
          <tr>
            {[
              "Program",
              "Category",
              "Region",
              "Cost",
              "Beneficiaries",
              "Impact Score",
              "Cost per Beneficiary",
              "Actions",
            ].map((header) => (
              <th key={header} className="px-4 py-4 font-medium text-slate-400">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {programs.length === 0 ? (
            <tr>
              <td className="px-4 py-8 text-center text-slate-500" colSpan="8">
                No programs found.
              </td>
            </tr>
          ) : (
            programs.map((program) => (
              <tr
                key={program._id}
                className="odd:bg-slate-950/70 even:bg-slate-900/70"
              >
                <td className="px-4 py-4 font-semibold text-slate-100">
                  {program.name}
                </td>
                <td className="px-4 py-4">{program.category}</td>
                <td className="px-4 py-4">{program.region}</td>
                <td className="px-4 py-4">${program.cost.toLocaleString()}</td>
                <td className="px-4 py-4">{program.beneficiaries}</td>
                <td className="px-4 py-4 text-emerald-300">
                  {program.adjusted_impact_score ?? program.impact_score}
                </td>
                <td className="px-4 py-4 text-slate-300">
                  {program.cost_per_beneficiary}
                </td>
                <td className="px-4 py-4 space-x-2">
                  <button
                    type="button"
                    onClick={() => onEdit(program)}
                    className="rounded-2xl bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(program._id)}
                    className="rounded-2xl bg-rose-500 px-3 py-2 text-xs font-semibold text-slate-950 hover:bg-rose-400"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
