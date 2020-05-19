import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

export function MyDropzone(props: { withBinaryDo: Function }) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
        props.withBinaryDo(binaryStr)
      };
      reader.readAsArrayBuffer(file);
    })

  }, []);
  const {getRootProps, getInputProps} = useDropzone({onDrop});

  return (
  <div {...getRootProps()} style={{border: "1px solid black", backgroundColor: "silver", margin: 12}}>
    <input {...getInputProps()} />
    <p>Drag 'n' drop some files here, or click to select files</p>
  </div>
  );
}