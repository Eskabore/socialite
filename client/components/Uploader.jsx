import { useState } from "react";
import { Button, TextField, Box } from "@mui/material";

export default function Uploader(props) {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(false);

    const pictureUpload = (e) => {
        e.preventDefault();

        // Using FormData API to simplify 'POST of file
        const formData = new FormData();

        // Input name is the first argument of `append` function !
        formData.append("file", file);

        console.log("This.state.file: ", file);

        fetch("/picture.json", {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                console.log("response.ok: ", response.ok);

                return response.json();
            })
            .then((data) => {
                if (data.picture === "") {
                    setError(true);
                } else {
                    console.log(
                        "fetch '/picture' <Uploader />. file is: ",
                        file,
                        "data.picture is: ",
                        data.picture
                    );
                    props.uploadImage(data.picture);
                }
            })
            .catch((error) => {
                console.log("Error uploading picture: ", error);
                setError(true);
            });
    };

    const handleChange = (e) => {
        setFile(e.target.files[0]); // event is linked to files index 0
    };

    return (
        <Box>
            {error && (
                <p>Something went wrong while uploading picture!</p>
            )}



            <div>
                <p>Select a picture to upload</p>
                <form onSubmit={pictureUpload}>
                    <input
                        onChange={handleChange}
                        type="file"
                        name="file"
                        id="file"
                        accept="image/*"
                        placeholder="Upload"
                    />
                    <Button variant="contained" component="label" type="submit">
                        Upload
                    </Button>
                </form>
            </div>
        </Box>
    );
}
