export default function ProgramForm({
  initialData = {},
  onSubmit,
  submitLabel,
}) {
  const fields = [
    { name: "name", label: "Program Name", type: "text" },
    { name: "category", label: "Category", type: "text" },
    { name: "region", label: "Region", type: "text" },
    { name: "cost", label: "Cost", type: "number" },
    { name: "beneficiaries", label: "Beneficiaries", type: "number" },
    { name: "before_metric", label: "Before Metric", type: "number" },
    { name: "after_metric", label: "After Metric", type: "number" },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
      {fields.map((field) => (
        <label key={field.name} className="space-y-2 text-sm text-slate-300">
          <span className="font-medium text-slate-200">{field.label}</span>
          <input
            name={field.name}
            defaultValue={initialData[field.name] ?? ""}
            type={field.type}
            step={field.type === "number" ? "any" : undefined}
            required
            className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400"
          />
        </label>
      ))}
      <div className="md:col-span-2 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          className="rounded-3xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
