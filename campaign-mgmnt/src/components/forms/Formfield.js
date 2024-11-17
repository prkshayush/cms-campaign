export default function FormField({ field, value, onChange, errors, options }) {
  const { type, label, required, placeholder } = field;

  const handleJsonChange = (e) => {
    try {
      const parsedValue = JSON.parse(e.target.value);
      onChange({ target: { name: e.target.name, value: parsedValue } });
    } catch (error) {
      onChange({ target: { name: e.target.name, value: e.target.value } });
    }
  };

  return (
    <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {type === 'textarea' ? (
      <textarea
        name={label.toLowerCase().replace(/ /g, '')}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
      />
    ) : type === 'select' ? (
      <select
        name={label.toLowerCase().replace(/ /g, '')}
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : type === 'json' ? (
      <textarea
        name={label.toLowerCase().replace(/ /g, '')}
        value={JSON.stringify(value, null, 2)}
        onChange={handleJsonChange}
        placeholder={placeholder}
        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
      />
    ) : (
      <input
        type={type}
        name={label.toLowerCase().replace(/ /g, '')}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
      />
    )}
    {errors && (
      <p className="text-sm text-red-500 mt-1">{errors}</p>
    )}
  </div>
  );
}