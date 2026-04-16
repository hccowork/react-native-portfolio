"use client";

import { useEffect, useMemo, useState } from "react";

type FileInputPreviewProps = {
  accept: string;
  currentUrl?: string;
  label: string;
  name: string;
  kind: "image" | "file";
};

export function FileInputPreview({
  accept,
  currentUrl,
  label,
  name,
  kind,
}: FileInputPreviewProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const previewUrl = useMemo(() => {
    if (!selectedFile || kind !== "image") {
      return "";
    }

    return URL.createObjectURL(selectedFile);
  }, [kind, selectedFile]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <label className="file-input-field">
      {label}
      <input
        name={name}
        type="file"
        accept={accept}
        onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
      />
      <div className="file-preview-card">
        {selectedFile ? (
          <>
            <strong>{selectedFile.name}</strong>
            <p>{Math.max(1, Math.round(selectedFile.size / 1024))} KB selected</p>
            {kind === "image" && previewUrl ? (
              <img src={previewUrl} alt={selectedFile.name} className="file-preview-image" />
            ) : null}
          </>
        ) : currentUrl ? (
          <>
            <strong>Current asset</strong>
            <p>{kind === "image" ? "Previewing the uploaded image." : "Existing file is linked below."}</p>
            {kind === "image" ? (
              <img src={currentUrl} alt="Current asset" className="file-preview-image" />
            ) : (
              <a href={currentUrl} target="_blank" rel="noreferrer" className="text-link">
                Open current file
              </a>
            )}
          </>
        ) : (
          <>
            <strong>No file selected</strong>
            <p>Choose a file to upload from the admin panel.</p>
          </>
        )}
      </div>
    </label>
  );
}
