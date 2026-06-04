import { COLORS } from "./colors";


export const FormInput = ({ label, type, name, value, onChange, placeholder, error, icon, autoComplete }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2" style={{ color: COLORS.text }}>
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`w-full ${icon ? 'pl-10' : 'px-4'} pr-4 py-3 rounded-lg border-2 transition-all focus:outline-none ${
            error 
              ? 'border-red-500 focus:border-red-600' 
              : 'border-gray-300 focus:border-[#00C853]'
          }`}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};