export default function UnitToggle({ units, onChange }) {
  return (
    <div className="unit-toggle" role="group" aria-label="Units">
      <button
        className={units === 'metric' ? 'active' : ''}
        onClick={() => onChange('metric')}
      >
        °C
      </button>
      <button
        className={units === 'imperial' ? 'active' : ''}
        onClick={() => onChange('imperial')}
      >
        °F
      </button>
    </div>
  );
}


