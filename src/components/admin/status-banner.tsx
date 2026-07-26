export function StatusBanner({ status }: { status?: string }) {
  if (status !== "saved" && status !== "deleted") return null;

  return (
    <div className="mb-4 rounded-lg bg-state-success/10 px-4 py-2.5 text-sm font-medium text-state-success">
      {status === "saved" ? "Salvo com sucesso." : "Excluído com sucesso."}
    </div>
  );
}
