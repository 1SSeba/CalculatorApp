export function IndicadoresSkeleton() {
  return (
    <div className="indicadores">
      <div className="indicadores-grid">
        <div className="card skeleton-card">
          <div className="indicador-card">
            <span className="skeleton" style={{ width: 30, height: 12 }} />
            <span className="skeleton" style={{ width: 90, height: 20 }} />
            <span className="skeleton" style={{ width: 60, height: 10 }} />
          </div>
        </div>
        <div className="card skeleton-card">
          <div className="indicador-card">
            <span className="skeleton" style={{ width: 30, height: 12 }} />
            <span className="skeleton" style={{ width: 90, height: 20 }} />
            <span className="skeleton" style={{ width: 60, height: 10 }} />
          </div>
        </div>
      </div>
    </div>
  );
}
