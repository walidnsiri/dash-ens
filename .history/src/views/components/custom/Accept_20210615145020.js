import { useDropzone } from "react-dropzone";
import React, { useMemo, useState, useEffect, useCallback } from "react";

const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  };
  
  const activeStyle = {
    borderColor: "#2196f3",
  };
  
  const acceptStyle = {
    borderColor: "#00e676",
  };
  
  const rejectStyle = {
    borderColor: "#ff1744",
  };



function Accept(props) {
    const onDrop = useCallback((acceptedFiles) => {
      setFieldValue("files", acceptedFiles[0].path);
    }, []);
    const {
      acceptedFiles,
      fileRejections,
      getRootProps,
      getInputProps,
      isDragActive,
      isDragAccept,
      isDragReject,
    } = useDropzone({
      accept: "image/*",
      maxFiles: 1,
      onDrop,
    });
    const { setFieldValue } = props;

    const style = useMemo(
      () => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {}),
      }),
      [isDragActive, isDragReject, isDragAccept]
    );

    const acceptedFileItems = acceptedFiles.map((file) => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ));

    const fileRejectionItems = fileRejections.map(({ file, errors }) => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
        <ul>
          {errors.map((e) => (
            <li key={e.code}>{e.message}</li>
          ))}
        </ul>
      </li>
    ));

    return (
      <section className="container">
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <p>Faites glisser 'et' déposez l'image ici, ou cliquez pour le sélectionner.</p>
          <em>(Seulement les images *.jpeg et *.png seront acceptées)</em>
        </div>
        <aside className="mt-4">
          <h5>Image Accepté</h5>
          <ul>{acceptedFileItems}</ul>
        </aside>
      </section>
    );
  }

  export default Accept;