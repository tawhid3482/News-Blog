type Props = {
  name: string;
  label: React.ReactNode;
  onFileUpload: (file: File) => void;
  variant?: "icon" | "contained";
};

const AutoFileUploader = ({ name, label, onFileUpload, variant = "icon" }: Props) => {
  return (
    <>
      <input
        type="file"
        id={name}
        name={name}
        hidden
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            onFileUpload(file);
          }
        }}
      />
      <label
        htmlFor={name}
        className="cursor-pointer"
      >
        {label}
      </label>
    </>
  );
};

export default AutoFileUploader;
